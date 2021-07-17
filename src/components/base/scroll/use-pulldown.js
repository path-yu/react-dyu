import {
    useState
} from "react";
let timer = null;
export default function usePullDown(bscroll, requestData) {
    const THRESHOLD = 70; // 触发下拉刷新距离阈值
    const STOP = 56; // 回弹悬停的距离
    const TIME_BOUNCE = 800; //回弹动画持续时长
    const [beforePullDown, setBeforePullDown] = useState(true);
    const [isPullingDown, setIsPullingDown] = useState(false);
    // 下拉开始触发
    async function pullingDownHandler() {
        setBeforePullDown(false);
        setIsPullingDown(true);

        // await requestData
        await requestData();
        setIsPullingDown(false);
        finishPullDown();
    }
    // 结束下拉刷新动作
    async function finishPullDown() {
        bscroll.current.finishPullDown();
        timer = setTimeout(() => {
            setBeforePullDown(true);
             bscroll.current.refresh()
        }, TIME_BOUNCE + 100)
    };

    return {
        THRESHOLD,
        stop,
        pullingDownHandler,
        finishPullDown,
        beforePullDown,
        isPullingDown,
        setBeforePullDown,
        setIsPullingDown,
    }
}