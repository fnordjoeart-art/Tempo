import { useState, useEffect } from 'react';

export type DeviceType = 'watch' | 'phone' | 'tablet' | 'desktop';

export function useDevice() {
  const [deviceType, setDeviceType] = useState<DeviceType>('phone');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 390);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Apple Watch: max 396px width
      if (width <= 396) {
        setDeviceType('watch');
      }
      // iPhone: 397px - 767px
      else if (width <= 767) {
        setDeviceType('phone');
      }
      // iPad: 768px - 1023px
      else if (width <= 1023) {
        setDeviceType('tablet');
      }
      // Mac: 1024px+
      else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    deviceType,
    windowWidth,
    isWatch: deviceType === 'watch',
    isPhone: deviceType === 'phone',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isMobile: deviceType === 'watch' || deviceType === 'phone',
    isLargeScreen: deviceType === 'tablet' || deviceType === 'desktop',
  };
}
