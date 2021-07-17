import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { useEffect, useState } from 'react';
BScroll.use(Slide)
// 抽象slider轮播图滑动函数钩子函数
export default function useSlider(wrapperRef) {
    let [slider,setSlider] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    function computedClassName(index){
        return currentPageIndex === index ? "active dot" : "dot"
    }
    useEffect(() => {
        const sliderVal =  new BScroll(wrapperRef.current, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 3,
            slide: true,
            
        });
        slider = sliderVal;
        //监听slider对象发生滑动事件
        sliderVal.on('slideWillChange', (page) => {
            setCurrentPageIndex(page.pageX);
        });
        return () => {
            sliderVal.destroy();
        }
    },[]);

   
    return {
        slider,
        currentPageIndex,
        computedClassName
    }
}