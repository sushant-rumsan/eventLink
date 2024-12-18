import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  className?: string;
  children: React.ReactNode;
}

export function Stepper({ currentStep, className, children }: StepperProps) {
  const steps = React.Children.toArray(children);

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {step}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1 bg-gray-200 transition-all duration-300 ease-in-out",
                index < currentStep && "bg-primary"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

interface StepProps {
  title: string;
  completed?: boolean;
}

export function Step({ title, completed }: StepProps) {
  return (
    <div className='flex flex-col items-center'>
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out",
          completed
            ? "bg-primary text-primary-foreground"
            : "bg-gray-200 text-gray-600"
        )}>
        {completed ? "✓" : ""}
      </div>
      <div className='mt-2 text-sm font-medium text-gray-600'>{title}</div>
    </div>
  );
}
