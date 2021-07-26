import { useState } from 'react';
export default function useLongPress(handLongPress, time = 1500) {
    const [longClick, setLongClick] = useState(0) // 长按标注
    const [timeOutEvent, setTimeOutEvent] = useState(0) // 计时器

    function start() {
        setTimeOutEvent(setTimeout(() => {
            console.log(timeOutEvent, longClick);
            setLongClick(1);
            // 此处为长按事件
            handLongPress && handLongPress();
            console.log('长按事件');
        }, time))
    }

    function move(ev) {
        ev && ev.preventDefault();
        clearTimeout(timeOutEvent);
        setLongClick(0) // 清除标志位
    }

    function end() {
        console.log(timeOutEvent);
        clearTimeout(timeOutEvent);
        setLongClick(0) // 清除标志位
    }
    return {
        start,
        move,
        end
    }
}