import danmu from '@/data/danmu.json';
import { isDef, isNumeric } from "./validate";
export function getDOMSize(selector) {
    const ele = document.querySelector(selector);
    if (ele != null) {
        return [ele.offsetWidth, ele.offsetHeight];
    }
    return {}
}

export function getWindowSize() {
    return [window.screen.width, window.screen.height]
}

export function mapRender(list, render) {
     return list.map((item, index) => render(item, index));
 }

// 洗牌算法 打乱数组顺序
export function shuffle(source) {
    const arr = source.slice()
    for (let i = 0; i < arr.length; i++) {
        const j = getRandomInt(i)
        swap(arr, i, j)
    }
    return arr
}
// 随机生成一个对应下标
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}
// 两两交换元素位置
function swap(arr, i, j) {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}


export function addUnit(value){
    if(!isDef(value)){
        return undefined;
    }
    return isNumeric(value) ? `${value}px` : String(value);
}

export function remToPx(rem){
    const htmlSize = parseFloat(document.documentElement.style.fontSize);
    rem = typeof rem === 'string' ? parseFloat(rem) : rem;
    return htmlSize * rem;
}
export function urlSearchParse(url){
    let res = [];
    const searchParams = new URLSearchParams(url);
    for(let [key,val] of searchParams){
        res[key] = val;
    }
    return res;
}
// 生成指定范围随机数
export function randomIndex(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min );
}
// 根据count来随机生成弹幕
export function randomBarrage(count){
    let index = 0;
    let indexList = [];
    const maxLen = danmu.length;
    while(index < count){
        index++;
        indexList.push(randomIndex(0,maxLen));
    }
    if(count === 1) return danmu[indexList[0]];
    return indexList.reduce((t,v) => {
        t.push(danmu[v]);
        return t;
    }, []).filter(item => item?.lv && item?.content && item?.nickName)
    
}