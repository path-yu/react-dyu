import { useState } from "react";

// 上拉加载更多钩子
export default function usePullUp(bscroll, requestData) {
    const [isPullUpLoad, setIsPullUpLoad] = useState(false);

    async function pullingUpHandler(){
        setIsPullUpLoad(true);

        await requestData();
        bscroll.current.finishPullUp();
        bscroll.current.refresh();
        setIsPullUpLoad(false);
    }
    return {
        pullingUpHandler,
        isPullUpLoad
    }
}