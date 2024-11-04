import * as React from "react"

/**
 * Use a ResizeObserver to react to changes in an element's size
 *
 * More about ResizeObserver: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
export function useResizeObserver(
  elementRef: React.RefObject<Element | null>,
): ResizeObserverEntry | undefined {
  const [entry, setEntry] = React.useState<ResizeObserverEntry>()

  function updateEntry([entry]: ResizeObserverEntry[]): void {
    setEntry(entry)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const node = elementRef?.current

    if (!node) {
      return
    }

    const observer = new ResizeObserver(updateEntry)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef])

  return entry
}
