import { useRef } from 'react';

export default function useListRefMethod(initialTag) {
    const tag = useRef(initialTag);
    const childRef = useRef();
    function onChange(index){

    }
    return {
        tag,
        onChange
    }
}
