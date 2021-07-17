import propTypes from "prop-types";
import React from "react";
import "./loading.scss";
const CircularIcon = (color) => {
  return (
    <div className="loading loading--circular">
      <span
        className="loading__spinner loading__spinner--circular"
        style={{ color: color }}
      >
        <svg viewBox="25 25 50 50" className="loading__circular">
          <circle
            style={{ stroke: color }}
            cx="50"
            cy="50"
            r="20"
            fill="none"
          ></circle>
        </svg>
      </span>
    </div>
  );
};

function Loading(props) {
  const { color, message, textColor,isCenter } = props;
  let styleHeight = isCenter ? { height: "556px" } : { height: "100%" };
  
  return (
    <div style={styleHeight} className="loadingContainer">
      <CircularIcon color={color} />
      <span style={{ color: textColor,fontSize:'14px' }}>{message}</span>
    </div>
  );
}
Loading.propTypes = {
  color: propTypes.string, //滚动条颜色
  message: propTypes.string, // loading加载提示文件
  textColor: propTypes.string,
  isCenter:propTypes.bool
};
Loading.defaultProps = {
  color: "#c9c9c9",
  message: "加载中...",
  textColor: "#c9c9c9",
  isCenter:false
};
export default Loading;
