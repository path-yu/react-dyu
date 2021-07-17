// 根据初始值来决定元素的display值
export default function useToggleDisplay(bindingVal) {
    return {
        display: bindingVal ? 'block' : 'none',
    }
}

let a = () => (434);
