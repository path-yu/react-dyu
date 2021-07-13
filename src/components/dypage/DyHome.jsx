import React, { Component } from 'react'
import DyBanner from './DyBanner'
import DyCategory from './DyCategory'
import LiveRoomList from './LiveRoomList'


export default class DyHome extends Component {
     
    render() {
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
}
