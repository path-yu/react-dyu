import { Button } from 'antd-mobile';
import React from 'react';
export default function HeaderTop(props) {
    return (
        <div className="HeaderTop">
            <div className="logo">  </div>
            <div className="search">
               <i className="iconfont icon-sousuo "></i>
               <span>搜索</span>
            </div>
            <div className="dowmloadApp">
                 <Button size="small"> 打开APP</Button>
            </div>
        </div>
    )
};
