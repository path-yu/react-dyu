import { useRef, useState } from "react";

// 上拉加载更多钩子
export default function usePullUp(bscroll, requestData) {
    const [isPullUpLoad, setIsPullUpLoad] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(true);
    const preventPullUpLoad = useRef(false);
    async function pullingUpHandler(){
        if (isLoadingMore === false) {
            bscroll.current.off("pullingUp", pullingUpHandler);
            return;
        }

        if (preventPullUpLoad.current){
            bscroll.current.finishPullUp();
            return
        }
        preventPullUpLoad.current = true;
        const res = await requestData();
        preventPullUpLoad.current = false;
        // 如果返回true 说明加载数据为空, 
        if(res === true){
            preventPullUpLoad.current = false;
            setIsLoadingMore(false);
        }
        bscroll.current.finishPullUp();
        bscroll.current.refresh();
        setIsPullUpLoad(false);
    }
    return {
        pullingUpHandler,
        isPullUpLoad,
        isLoadingMore
    }
}