import { addUnit } from "@/utils";
import { isDef } from "@/utils/validate";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import "./index.scss";
const ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export default function Image(props) {
  const {
    src,
    fit,
    alt,
    width,
    height,
    radius,
    round,
    showError,
    showLoading,
    errorIcon,
    loadingIcon,
  } = props;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  const style = {};
  if (isDef(width)) {
    style.width = addUnit(width);
  }
  if (isDef(height)) {
    style.height = addUnit(props.height);
  }

  if (isDef(radius)) {
    style.overflow = "hidden";
    style.borderRadius = addUnit(props.radius);
  }

  const onLoad = (event) => {
    setLoading(false);
  };

  const onError = (event) => {
    setLoading(false);
    setError(true);
  };
  const renderLoadingIcon = () => {
    return <div>加载中</div>;
  };
  const renderErrorIcon = () => {
    return <div>加载失败</div>;
  };
  const renderPlaceholder = () => {
    if (loading && showLoading) {
      return <div className="loading">{renderLoadingIcon()}</div>;
    }
    if (error && showError) {
      return <div className="error">{renderErrorIcon()}</div>;
    }
  };
  const renderImage = () => {
    if (error || !src) {
      return;
    }

    const attrs = {
      alt: props.alt,
      className: "img",
      style: {
        objectFit: fit,
      },
    };
    return <img src={src} onLoad={onLoad} onError={onError} {...attrs} />;
  };
  return (
    <div className="image" style={style}>
      {renderImage()}
      {renderPlaceholder()}
    </div>
  );
}
const types = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
Image.propTypes = {
  src: PropTypes.string.isRequired,
  fit: PropTypes.string,
  alt: PropTypes.string,
  width: types,
  height: types,
  radius: types,
  round: PropTypes.bool,
  showError: PropTypes.bool,
  showLoading: PropTypes.bool,
  errorIcon: PropTypes.string,
  loadingIcon: PropTypes.string,
};
Image.defaultProps = {
  fit: "fill",
  radius: 0,
  round: false,
};
