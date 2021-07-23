import CustomizedButtons from "@/components/base/Button/Button";
import ReadMore from "@/components/base/readMore/ReadMore";
import ButtonAppBar from "@/components/bookPage/ButtonAppBar";
import { ChevronRight } from '@material-ui/icons';
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
export default function BookDetail(props) {
  const { id } = useRouteMatch().params;
  const { state } = useHistory().location;
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <div className="BookDetail bg-white h-100">
      <ButtonAppBar title={state?.bookName}></ButtonAppBar>
      <div className=" p-2 overflow-scroll" style={{ height: "82vh" }}>
        <div className="flex">
          <img className="w-14 h-20 rounded" src={state?.picUrl}></img>
          <div className="flex flex-col ml-2 justify-between">
            <p className="font-bold">作者: {state?.authorName}</p>
            <p>类别: {state?.catName}</p>
            <p>状态: {state?.bookStatus === 0 ? "连载" : "完结"}</p>
            <p>更新: {state?.lastIndexUpdateTime}</p>
            <p>评分: {state?.score}</p>
            <p>点击: 623</p>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <CustomizedButtons text="立即阅读"></CustomizedButtons>
            <CustomizedButtons
              backgroundColor="#FCD34D"
              text="加入书架"
            ></CustomizedButtons>
            <CustomizedButtons text="我的书架"></CustomizedButtons>
          </div>

          <p className="text-md mt-2 mb-1">内容简介</p>
          <ReadMore richText={state?.bookDesc}></ReadMore>
        </div>
        <div className="mt-2">
          <div className="p-1 flex justify-between border-solid border-b border-gray-100">
            <div className="font-semibold text-cmd">最新</div>
            <div className="text-gray-400 truncate w-15">
              第5454张44444444444
              <ChevronRight></ChevronRight>
            </div>
          </div>

          <div className="p-1 flex justify-between dir border-solid border-b border-gray-100">
            <div className="font-semibold text-cmd">目录</div>
            <div className="text-gray-400">
              共1756张
              <ChevronRight></ChevronRight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
