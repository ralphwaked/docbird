import * as React from "react"

export function useMediaQuery() {
  const [device, setDevice] = React.useState<
    "mobile" | "tablet" | "desktop" | null
  >(null)
  const [dimensions, setDimensions] = React.useState<{
    width: number
    height: number
  } | null>(null)

  React.useEffect(() => {
    function checkDevice() {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile")
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet")
      } else {
        setDevice("desktop")
      }

      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    // Initial detection
    checkDevice()

    // Listener for windows resize
    window.addEventListener("resize", checkDevice)

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  }
}
