import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDOMSize, getWindowSize } from "../../../utils";
 BScroll.use(ObserveDOM);
export default function Scroll(props) {

    const rootRef = useRef(null);
    const [rootHeight,setRootHeight] = useState('100vh')
    let scroll = null;

    useEffect(() => {
         const scrollVal = scroll = new BScroll(rootRef.current, {
           observeDOM: true,
           ...props,
         });
        return () => {
            scrollVal.destroy();
        }
    });
    useLayoutEffect(() => {
        computedHeight();
        console.log('434');
    });

    
    function computedHeight(){
      const HeaderTopHeight  = getDOMSize(".HeaderTop")[1];
      const tabsHeight = getDOMSize(".HeaderTabsWrapper .am-tabs-tab-bar-wrap")[1]
      const res = getWindowSize()[1] - HeaderTopHeight - tabsHeight - 20;
      setRootHeight(res+'px')  
    }

    return (
      <div className="rootRef" style={{ height: rootHeight }} ref={rootRef}>
        {props.children}
      </div>
    );
}
