"use client"
import { createContext, useState } from "react";

export const TouchContext = createContext();

export default function TouchContextProvider({children}) {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleTouchStart = (event) => {
        setTouchStart({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
      };
    
      const handleTouchEnd = (event) => {
        setTouchEnd({
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        });
        
      };
  
      const handleSwipe = (func1, func2) => {
        if (touchStart && touchEnd) {
          const deltaX = touchEnd.x - touchStart.x;
          const deltaY = touchEnd.y - touchStart.y;
    
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Handle swipe right event
               func1()
              } else {
                // Handle swipe left event
               func2()
              }
          
          }
    
          setTouchStart(null);
          setTouchEnd(null);
        }
      };
    return (
        <TouchContext.Provider value={{
            touchStart,
            touchEnd,
            handleTouchStart,
            handleTouchEnd,
            handleSwipe
        }}>
            {children}
        </TouchContext.Provider>
    )
}