
"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CostCalculator } from "./CostCalculator";

type CostCalculatorModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CostCalculatorModal({ isOpen, onOpenChange }: CostCalculatorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-xl p-0 border-0">
         <CostCalculator />
      </DialogContent>
    </Dialog>
  );
}
