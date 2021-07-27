import { appBarIconStyle } from "@/common/material-icon-style";
import CustomizedButtons from "@/components/base/Button/Button";
import ButtonAppBar from "@/components/base/ButtonAppBar/ButtonAppBar";
import ReadMore from "@/components/base/readMore/ReadMore";
import http from '@/http';
import { ChevronRight } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
export default function BookDetail(props) {
  const { id } = useRouteMatch().params;
  const IconStyle = appBarIconStyle();
  const { state } = useHistory().location;
  const [bookIndexList, setBookIndexList] = useState([]);
  useEffect(() => {
    // console.log(state);
    queryBookIndexList()
  }, []);
  function queryBookIndexList(){
      http.get("/queryNewIndexList",{
        params:{bookId:id}
      }).then(res => {
        setBookIndexList(res.data.data)
      })
  }
  return (
    <div className="BookDetail bg-white" style={{ height: "100vh" }}>
      <ButtonAppBar title={state?.bookName}></ButtonAppBar>
      <div className=" p-2 overflow-scroll" style={{ height: "92vh" }}>
        <div className="flex">
          <img className="w-14 h-20 rounded" src={state?.picUrl}></img>
          <div className="flex flex-col ml-2 justify-between">
            <p className="font-bold">作者: {state?.authorName}</p>
            <p>类别: {state?.catName}</p>
            <p>状态: {state?.bookStatus === 0 ? "连载" : "完结"}</p>
            <p>更新: {state?.lastIndexUpdateTime}</p>
            <p>
              评分: <span className="text-red-500">{state?.score}</span>
            </p>
            <p>总字数: {parseInt(state?.wordCount / 1000) + "千字"}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-center mt-2">
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
            <div className="text-gray-400 truncate w-14 text-right">
              {state?.lastIndexName}
              <ChevronRight className={IconStyle.root}></ChevronRight>
            </div>
          </div>

          <div className="p-1 flex justify-between dir border-solid border-b border-gray-100">
            <div className="font-semibold text-cmd">目录</div>
            <div className="text-gray-400">
              共{bookIndexList.length}张章
              <ChevronRight className={IconStyle.root}></ChevronRight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
