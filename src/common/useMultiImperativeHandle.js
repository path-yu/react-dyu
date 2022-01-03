import { useImperativeHandle } from 'react';

const useMultiImperativeHandle = (originRef, convertRefObj, deps) => {
  return useImperativeHandle(
    originRef,
    () => {
      return {
        ...originRef.current,
        ...convertRefObj,
      };
    },
    deps
  );
};

export default useMultiImperativeHandle;
