"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { CostCalculator } from "./CostCalculator";

type CostCalculatorModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CostCalculatorModal({ isOpen, onOpenChange }: CostCalculatorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm md:max-w-xl max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Cost Estimator</DialogTitle>
            <DialogDescription>
              An interactive calculator to estimate the cost of cleaning services based on your home's specifications.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
         <CostCalculator />
      </DialogContent>
    </Dialog>
  );
}
