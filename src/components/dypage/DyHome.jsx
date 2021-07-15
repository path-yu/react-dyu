import React from 'react';
import DyBanner from './DyBanner/DyBanner';
import DyCategory from './DyCategory';
import LiveRoomList from './LiveRoomList';


export default function DyHome(){
    return (
            <div>
                {/* 轮播图 */}
                <DyBanner></DyBanner>
                {/*  分类列表 */}
                <DyCategory></DyCategory>
                {/* 推荐直播列表 */}
                <LiveRoomList api='subLiveList'></LiveRoomList>
            </div>
        ) 
}
