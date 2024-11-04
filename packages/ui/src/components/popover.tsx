"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@docbird/ui"
import { useMediaQuery } from "@docbird/ui/hooks"

export type PopoverProps = React.PropsWithChildren<{
  content: React.ReactNode | string
  align?: "center" | "start" | "end"
  side?: "bottom" | "top" | "left" | "right"
  openPopover: boolean
  setOpenPopover: (open: boolean) => void
  mobileOnly?: boolean
  popoverContentClassName?: string
  collisionBoundary?: Element | Element[]
  sticky?: "partial" | "always"
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onWheel?: React.WheelEventHandler
}>

export function Popover({
  children,
  content,
  align = "center",
  side = "bottom",
  openPopover,
  setOpenPopover,
  mobileOnly,
  popoverContentClassName,
  collisionBoundary,
  sticky,
  onEscapeKeyDown,
  onWheel,
}: PopoverProps) {
  const { isMobile } = useMediaQuery()

  if (mobileOnly || isMobile) {
    return (
      <DrawerPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
        <DrawerPrimitive.Trigger className="sm:hidden" asChild>
          {children}
        </DrawerPrimitive.Trigger>
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <DrawerPrimitive.Content
            className="bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border"
            onEscapeKeyDown={onEscapeKeyDown}
          >
            <VisuallyHidden.Root>
              <DrawerPrimitive.Title>Popover</DrawerPrimitive.Title>
              <DrawerPrimitive.Description>
                This is a popover
              </DrawerPrimitive.Description>
            </VisuallyHidden.Root>

            <div className="sticky top-0 z-20 flex items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
            </div>

            <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden pb-8 align-middle shadow-xl">
              {content}
            </div>
          </DrawerPrimitive.Content>
          <DrawerPrimitive.Overlay />
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    )
  }

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger className="sm:inline-flex" asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          align={align}
          side={side}
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none",
            popoverContentClassName,
          )}
          sticky={sticky}
          collisionBoundary={collisionBoundary}
          onEscapeKeyDown={onEscapeKeyDown}
          onWheel={onWheel}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
