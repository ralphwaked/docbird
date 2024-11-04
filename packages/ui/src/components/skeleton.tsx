import { cn } from "@docbird/ui"

const Skeleton: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={cn("bg-primary/10 animate-pulse rounded-md", className)}
    {...props}
  />
)

export { Skeleton }
