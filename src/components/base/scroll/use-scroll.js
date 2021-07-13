
import BScroll from "@better-scroll/core";
import ObserveDOM from '@better-scroll/observe-dom';
import { useEffect } from "react";
BScroll.use(ObserveDOM);
export default function useScroll(wrapperRef, props) {
     let scroll = null;
     useEffect(() => {
          const scrollVal = scroll = new BScroll(wrapperRef.current, {
              observeDOM: true,
              ...props
          });
         
          if(props.probeType > 0){ 
              scrollVal.on('scroll', (pos) => {
                  // 派发scroll事件
                  props.scroll(pos)
              })

          }
         return () => {
             scroll.destroy()
         }
     });

     return scroll;
}