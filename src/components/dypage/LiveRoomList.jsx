import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
 class LiveRoomList extends Component {
    state = {
        LiveRoomList: [],
        msg:'正在加载数据...',
    }

    async getLiveListData() {
        try {
            // console.log(props.tagId)
            const tagId = this.props.tagId || 0
            const cateId = this.props.cateId || 0
            const api = this.props.api
            const response = await fetch('http://h5sm.com/flutter/api/' + api + '?tag_id=' + tagId + '&cate_id=' + cateId)
            const { data } = await response.json()
            this.setState({
                LiveRoomList: data,
            })
            if(data.length === 0) {
                this.setState({
                    msg:'暂时没有数据...'
                })
            }
        } catch (e) {
            this.setState({
                msg:'数据加载失败'
            })
        }
    }
    componentDidMount() {
        this.getLiveListData()
    }
    toLiveRoom = () =>{
        let {history} = this.props;
        history.push('/liveroom')
    }
    render() {
        let { LiveRoomList } = this.state
        if(LiveRoomList.length === 0 ){
            return (
                <p className="message">
                   {this.state.msg}
                </p>
            )
        }
        return (
            <div className="LiveRoomList">
                {
                    LiveRoomList.map((item, index) => {
                        return (
                            <div key={index} onClick={this.toLiveRoom}>
                                <img src={item.room_src} alt="" />
                                    <span className="onlineCount"> 
                                        {
                                            item.online >= 10000 ?  (item.online / 10000).toFixed(1) + '万' :
                                            item.online
                                        }
                                    </span>
                                <div>
                                    <p> {item.room_name} </p>
                                    <p className="tag"> {item.game_name} </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default withRouter(LiveRoomList)

