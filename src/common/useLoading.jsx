import Empty from '@/components/base/empty/empty';
import React, { useState } from 'react';
import Loading from '../components/base/loading/loading';
export default function useLoading(initialValue = true, comp, loadingProps) {
  // 是否正在加载中
  const [loading, setLoading] = useState(initialValue);
  // 是否加载错误
  const [isError, setIsError] = useState(false);
  // 加载数据是否是否为空
  const [isEmpty, setEmpty] = useState(false);
  // 判断comp类型是否为函数
  if (typeof comp !== 'function' && typeof action !== 'function') {
    return;
  }
  // 渲染函数render
  function RenderElement() {
    if (isEmpty && !loading) {
      return <Empty image='error'></Empty>;
    }
    if (isError) {
      return <div className='errorMessage'>加载失败,下拉刷新试试</div>;
    }
    if (loading) {
      return <Loading {...loadingProps}></Loading>;
    } else {
      return comp();
    }
  }

  return {
    setLoading,
    RenderElement,
    loading,
    isError,
    setIsError,
    isEmpty,
    setEmpty,
  };
}
