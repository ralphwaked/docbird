import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@docbird/ui"
import { useMemo } from "react"

const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean
  asChild?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  loading = true,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "span"

  const [bgColorClass, filteredClassName] = useMemo(() => {
    const bgClass = className?.match(/(?:dark:bg-|bg-)S+/g) || []
    const filteredClasses = className?.replace(/(?:dark:bg-|bg-)S+/g, "").trim()
    return [bgClass, filteredClasses]
  }, [className])

  if (!loading) {
    return null
  }

  return (
    <Comp
      className={cn(spinnerVariants({ size, className: filteredClassName }))}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${-(7 - i) * 100}ms`,
          }}
        >
          <span
            className={cn("block w-full h-[30%] rounded-full", bgColorClass)}
          />
        </span>
      ))}
    </Comp>
  )
}
Spinner.displayName = "Spinner"

export { Spinner }
