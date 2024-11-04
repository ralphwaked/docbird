import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@docbird/ui"

const typographyVariants = cva("text-md", {
  variants: {
    type: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-xl font-medium",
      h4: "text-lg font-medium",
      p: "text-md",
      label: "text-sm",
      footnote: "text-xs",
    },
    variant: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    type: "p",
    variant: "primary",
  },
})

interface TypographyProps
  extends React.ComponentProps<"p">,
    VariantProps<typeof typographyVariants> {}

const Typography: React.FC<TypographyProps> = ({
  className,
  type,
  variant,
  ...props
}) => {
  const Comp = (type === "footnote" || type === "label" ? "p" : type) || "p"
  return (
    <Comp
      className={cn(typographyVariants({ type, variant, className }))}
      {...props}
    />
  )
}

export { Typography }
