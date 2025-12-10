"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { suggestBlogTopics, SuggestBlogTopicsInput, SuggestBlogTopicsOutput } from "@/ai/flows/suggest-blog-topics";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  trend: z.string({ required_error: "Please select an area." }),
});

const areas = ["interior design", "event planning", "cleaning trends"];

export default function TopicSuggesterPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SuggestBlogTopicsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setResult(null);
    try {
      const input: SuggestBlogTopicsInput = { trend: values.trend };
      const response = await suggestBlogTopics(input);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: "An error occurred while suggesting blog topics.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 font-headline">Blog Topic Suggester</h1>
      <p className="text-muted-foreground mb-6">Get fresh ideas for your next blog post based on current trends.</p>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="trend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select an Area of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an area..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas.map(area => (
                           <SelectItem key={area} value={area} className="capitalize">{area.charAt(0).toUpperCase() + area.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isGenerating ? "Suggesting..." : "Suggest Topics"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {(isGenerating || result) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Suggested Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-muted rounded animate-pulse w-full"></div>)}
              </div>
            )}
            {result && (
              <ul className="space-y-3">
                {result.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
