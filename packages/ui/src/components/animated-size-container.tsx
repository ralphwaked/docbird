"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

import { cn } from "@docbird/ui"
import { useResizeObserver } from "@docbird/ui/hooks"

type AnimatedSizeContainerProps = React.PropsWithChildren<{
  width?: boolean
  height?: boolean
}> &
  Omit<
    React.ComponentPropsWithoutRef<typeof motion.div>,
    "animate" | "children"
  >

/**
 * A container with animated width and height (each optional) based on children dimensions
 */
const AnimatedSizeContainer: React.FC<AnimatedSizeContainerProps> = ({
  width = false,
  height = false,
  className,
  transition,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const resizeObserverEntry = useResizeObserver(containerRef)

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      animate={{
        width: width
          ? (resizeObserverEntry?.contentRect?.width ?? "auto")
          : "auto",
        height: height
          ? (resizeObserverEntry?.contentRect?.height ?? "auto")
          : "auto",
      }}
      transition={transition ?? { type: "spring", duration: 0.3 }}
      {...props}
    >
      <div
        ref={containerRef}
        className={cn(height && "h-max", width && "w-max")}
      >
        {children}
      </div>
    </motion.div>
  )
}

export { AnimatedSizeContainer }
