import iconStyle from "@/common/material-icon-style";
import useModal from "@/common/useModal";
import { clearSearchHistory } from "@/store";
import { getDOMSize, remToPx } from "@/utils";
import { Delete } from "@material-ui/icons";
import { observer } from "mobx-react";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import useLongPress from "./useLongPress";

function SearchHistoryList({
  appState,
  handleSearch,
  isShowSearchHistory = true,
}) {
  const IconStyle = iconStyle();
  const list = appState.searchHistoryList;
  const listRef = useRef(null);
  const spreadToggleRef = useRef(null);
  const spreadDistance = useRef(null);
  const listRawHeight = useRef("100%");
  const { start, move, end } = useLongPress(handleLongPress, 1000);
  const { showAlert, close } = useModal("删除", "确定删除全部浏览记录吗?");
  const getSpreadText = useCallback(() => {
    return spreadToggleRef.current.textContent
  }, [spreadToggleRef]);
  useLayoutEffect(() => {
    if (!list.length || !listRef.current || !spreadToggleRef.current) return;
    const itemHeight = getDOMSize(".searchHistoryItem")[1];
    const listHeight = (listRawHeight.current = listRef.current.clientHeight);
    //可能会有3px的误差
    spreadDistance.current = (itemHeight  + remToPx(0.25) ) * 2 + 3;
    console.log(listHeight, spreadDistance);
    if (listHeight > spreadDistance.current) {
      console.log(2);
      listRef.current.style.cssText = `height:${spreadDistance.current}px;overflow:hidden`;
      spreadToggleRef.current.style.display = "block";
      spreadToggleRef.current.textContent = "展开";
    } else {
      spreadToggleRef.current.style.display = "none";
    }
  });

  function handleClickSpread() {
    if (listRawHeight.current <= spreadDistance.current) return;
    if (getSpreadText() === "展开") {
      listRef.current.style.cssText = `height:${listRawHeight.current}px;overflow:none`;
      spreadToggleRef.current.textContent = "收起";
    } else {
      listRef.current.style.cssText = `height:${spreadDistance.current}px;overflow:hidden`;
      spreadToggleRef.current.textContent = "展开";
    }
  }
  function handleItemClick(value) {
    // 调用父组件传递的方法并传入数据
    handleSearch && handleSearch(value);
   
  }

  function handleLongPress() {}
  async function handleDeleteClick() {
    // 等待用户点击拿到返回值
    const res = await showAlert();
    //点击了确定
    if (res) {
      clearSearchHistory();
    }
  }
  if (!list.length || !isShowSearchHistory) return <></>;
  return (
    <div className="p-1">
      <div className="flex justify-between w-100">
        <p className="font-bold">搜索历史</p>
        <p
          ref={spreadToggleRef}
          onClick={handleClickSpread}
          className="text-gray-400 text-ssm"
        >
          展开
        </p>
      </div>
      <div className="mt-1 flex flex-wrap" ref={listRef}>
        {list.map((v, i) => {
          return (
            <div
              key={i}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
              onClick={() => handleItemClick(v, i)}
              className="searchHistoryItem bg-gray-100 mt-1 ml-1 p-1 text-center"
            >
              {v}
            </div>
          );
        })}
      </div>
      <div
        onClick={handleDeleteClick}
        className="text-center flex justify-center p-2 text-gray-400 text-ssm items-center"
      >
        <p>清空全部搜索历史</p>
        <Delete className={IconStyle.root}></Delete>
      </div>
    </div>
  );
}
export default observer(SearchHistoryList);
