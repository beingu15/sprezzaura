"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateSeoDescription, GenerateSeoDescriptionInput, GenerateSeoDescriptionOutput } from "@/ai/flows/generate-seo-descriptions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters."),
  keywords: z.string().min(3, "Please provide at least one keyword."),
});

export default function SeoGeneratorPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerateSeoDescriptionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "", keywords: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setResult(null);
    try {
      const input: GenerateSeoDescriptionInput = {
        content: values.content,
        keywords: values.keywords,
        tone: "professional",
        maxLength: 160,
      };
      const response = await generateSeoDescription(input);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while generating the SEO description.",
      });
    } finally {
      setIsGenerating(false);
    }
  }
  
  const copyToClipboard = () => {
    if (result?.description) {
      navigator.clipboard.writeText(result.description);
      toast({ title: "Copied!", description: "Description copied to clipboard." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 font-headline">SEO Description Generator</h1>
      <p className="text-muted-foreground mb-6">Create compelling, SEO-optimized meta descriptions for your content.</p>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page/Post Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the main content of your page or blog post here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., eco-friendly cleaning, modern home decor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isGenerating ? "Generating..." : "Generate Description"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {(isGenerating || result) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
              </div>
            )}
            {result && (
              <div className="relative">
                <p className="text-muted-foreground pr-10">{result.description}</p>
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-8 w-8" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
