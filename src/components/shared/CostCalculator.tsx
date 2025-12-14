
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  sqft: z.number().min(100).max(10000),
  rooms: z.number().min(1).max(10),
  bathrooms: z.number().min(1).max(10),
  kitchens: z.number().min(1).max(5),
  halls: z.number().min(1).max(5),
});

const PRICING = {
  baseSqft: 0.15,
  perRoom: 25,
  perBathroom: 35,
  perKitchen: 40,
  perHall: 20,
};

export function CostCalculator() {
  const [estimatedCost, setEstimatedCost] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sqft: 1500,
      rooms: 3,
      bathrooms: 2,
      kitchens: 1,
      halls: 1,
    },
  });

  const { watch, control, getValues } = form;

  const calculateCost = (values: z.infer<typeof formSchema>) => {
    const { sqft = 0, rooms = 0, bathrooms = 0, kitchens = 0, halls = 0 } = values;
    return (
      sqft * PRICING.baseSqft +
      rooms * PRICING.perRoom +
      bathrooms * PRICING.perBathroom +
      kitchens * PRICING.perKitchen +
      halls * PRICING.perHall
    );
  };
  
  useEffect(() => {
    const subscription = watch((values) => {
      setEstimatedCost(calculateCost(values as z.infer<typeof formSchema>));
    });
    
    // Set initial cost
    setEstimatedCost(calculateCost(getValues()));
    
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  return (
    <Card className="bg-primary/5 border-primary/20 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <DollarSign size={24} />
          Estimate Your Cleaning Cost
        </CardTitle>
        <CardDescription>
          Adjust the sliders to get an instant estimate for our cleaning services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
             <FormField
              control={control}
              name="sqft"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Square Footage</FormLabel>
                    <Input
                        type="number"
                        className="w-24 h-8"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <FormControl>
                    <Slider
                      min={100}
                      max={10000}
                      step={50}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                   <div className="flex justify-between items-center mb-2">
                    <FormLabel>Bedrooms</FormLabel>
                    <Input
                        type="number"
                        className="w-24 h-8"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Bathrooms</FormLabel>
                     <Input
                        type="number"
                        className="w-24 h-8"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="kitchens"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Kitchens</FormLabel>
                     <Input
                        type="number"
                        className="w-24 h-8"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="halls"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Halls / Living Areas</FormLabel>
                     <Input
                        type="number"
                        className="w-24 h-8"
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-4 text-center">
                <p className="text-muted-foreground">Estimated Cost</p>
                <p className="text-4xl font-bold text-primary">
                    ${estimatedCost.toFixed(2)}
                </p>
                 <p className="text-xs text-muted-foreground mt-2">
                    This is an estimate. Final price may vary.
                </p>
                <p className="text-sm text-muted-foreground mt-4 px-6">
                    For more offer price and final quote contact our team or submit your details.
                </p>
            </div>
             <Button type="button" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4" asChild>
                <Link href="/contact?subject=Cleaning Service Quote">Request a Final Quote</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
