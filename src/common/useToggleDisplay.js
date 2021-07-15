import {
    useMemo, useState
} from "react";
// 根据初始值来决定元素的display值
export default function useToggleDisplay(initialVal){
    const [bindingVal, setBindingVal] = useState(initialVal);
    const  disPlayStyle = useMemo(() => {
        return {
            display:bindingVal ? 'block' : 'none'
        }
    }, [bindingVal]);
    return {
        disPlayStyle,
        setBindingVal
    }
}

let a = () => (434);
