import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@docbird/ui"

const alertVariants = cva(
  "[&>svg]:text-foreground relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Alert: React.FC<
  React.ComponentProps<"div"> & VariantProps<typeof alertVariants>
> = ({ className, variant, ...props }) => (
  <div
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)
Alert.displayName = "Alert"

const AlertTitle: React.FC<React.ComponentProps<"h5">> = ({
  className,
  ...props
}) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => (
  <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
