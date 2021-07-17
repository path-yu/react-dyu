import useLoading from "@/common/useLoading";
import Loading from "@/components/base/loading/loading";
import Slider from "@/components/base/slider/Slider";
import React, { useEffect, useState } from "react";
import http from "../../../http";
function DyBanner() {
  const [bannerList, setBannerList] = useState([]);
  const res = useLoading()
  function getDyBannerData() {
    http("/banner").then((res) => {
      setBannerList(res.data.imgPreView);
    });
  }
  useEffect(() => {
    if (bannerList.length === 0) {
      getDyBannerData();
    }
  },[]);
  if (bannerList.length !== 0) {
    return (
      <div className="bannerWrap">
        <div className="banner-content ">
          <Slider sliders={bannerList}></Slider>
        </div>
      </div>
    );
  } else {
    return <Loading></Loading>;
  }
}

export default DyBanner;
