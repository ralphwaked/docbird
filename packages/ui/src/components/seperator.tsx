"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@docbird/ui"

const Separator: React.FC<
  React.ComponentProps<typeof SeparatorPrimitive.Root>
> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "bg-border shrink-0",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const SeparatorWithText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center my-3 stack-scope">
      <div className="flex-1">
        <Separator />
      </div>
      <div className="mx-2 text-sm text-muted-foreground">{text}</div>
      <div className="flex-1">
        <Separator />
      </div>
    </div>
  )
}

export { Separator, SeparatorWithText }
