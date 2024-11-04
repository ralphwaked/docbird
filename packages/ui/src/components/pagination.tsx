import { cn } from "@docbird/ui"
import { Icons } from "@docbird/ui/icons"

import { type ButtonProps, buttonVariants } from "./button"

const Pagination: React.FC<React.ComponentProps<"nav">> = ({
  className,
  ...props
}) => (
  <nav
    // biome-ignore lint/a11y/noRedundantRoles: <explanation>
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent: React.FC<React.ComponentProps<"ul">> = ({
  className,
  ...props
}) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem: React.FC<React.ComponentProps<"li">> = ({
  className,
  ...props
}) => <li className={cn("", className)} {...props} />
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink: React.FC<PaginationLinkProps> = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious: React.FC<PaginationLinkProps> = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <Icons.ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext: React.FC<PaginationLinkProps> = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <Icons.ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis: React.FC<React.ComponentProps<"span">> = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Icons.Circle className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
