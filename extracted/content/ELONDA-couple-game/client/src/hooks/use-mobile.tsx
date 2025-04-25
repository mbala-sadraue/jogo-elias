
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isTablet, setIsTablet] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      const tablet = window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT
      setIsMobile(mobile)
      setIsTablet(tablet)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    window.addEventListener('orientationchange', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('orientationchange', checkDevice)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isTouch: isMobile || isTablet
  }
}
