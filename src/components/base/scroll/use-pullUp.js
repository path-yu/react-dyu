import { useState } from "react";

// 上拉加载更多钩子
export default function usePullUp(bscroll, requestData) {
    const [isPullUpLoad, setIsPullUpLoad] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(true);
    async function pullingUpHandler(){
        if (isLoadingMore === false) {
            bscroll.current.off("pullingUp", pullingUpHandler);
            return;
        }
        setIsPullUpLoad(true);

        const res =  await requestData();
        console.log(res);
        // 如果返回true 说明加载数据为空, 
        if(res === true){
            setIsLoadingMore(false)
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