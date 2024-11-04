"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@docbird/ui"
import { Icons } from "@docbird/ui/icons"

const RadioGroup: React.FC<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>
> = ({ className, ...props }) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2", className)}
    {...props}
  />
)
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem: React.FC<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>
> = ({ className, ...props }) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Icons.Check className="fill-primary h-3.5 w-3.5" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
