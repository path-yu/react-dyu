import React, { useState } from "react";
import Loading from "../components/base/loading/loading";
export default function useLoading(initialValue=true,comp, loadingProps) {
  const [loading, setLoading] = useState(initialValue);
  // 判断comp类型是否为函数
  if(typeof comp !== 'function' && typeof action !== 'function'){
    return 
  }
  // 渲染函数render
  function RenderElement() {
    if (loading) {
      return <Loading {...loadingProps}></Loading>;
    } else {
      return comp();
    }
  }
  

  return {
    setLoading,
    RenderElement,
    loading
  };
}
