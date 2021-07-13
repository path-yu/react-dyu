import { Carousel, WingBlank } from "antd-mobile";
import React, { useEffect, useState } from "react";
import http from "../../http";
import Loading from "../base/loading/loading";
function DyBanner() {
  const [bannerList, setBannerList] = useState([]);

  function getDyBannerData() {
    http('/banner').then(res => {
      setBannerList(res.data.imgPreView);
    })
  }
  
  useEffect(() => {
    if (bannerList.length === 0) {
      getDyBannerData();
    }
  });
  if (bannerList.length !== 0) {
    return (
      <div className="bannerWrap">
        <WingBlank>
          <Carousel
            infinite
            autoplay={true}
            autoplayInterval={1500}
            dotActiveStyle={{ background: "#ff5d23" }}
          >
            {bannerList.map((item, index) => (
              <a
                key={index}
                href="#"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={item}
                  key={index}
                  style={{ width: "100%", verticalAlign: "top" }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
      </div>
    );
  } else {
    return <Loading></Loading>
  }
}

export default DyBanner;
