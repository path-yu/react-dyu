import React from "react";
import "./empty.scss";
import Network from "./Network";
const PRESET_IMAGES = ["error", "search", "default"];
export default function Empty(props) {
  let { imageSize = 120, description = "数据为空", image } = props;
  const renderImage = () => {
    let image = props.image;
    const imageChild = renderChild("image");
    if (imageChild) {
      return imageChild;
    }
    if (image === "network") {
      return Network();
    }

    if (PRESET_IMAGES.includes(image)) {
      image = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
    }

    return <img src={image} />;
  };
  const renderDescription = () => {
    const descriptionChild = renderChild("description");
    const descriptionEl = descriptionChild
        ? descriptionChild
        : description;
    if (description) {
      return <p className="description">{description}</p>;
    }
  };

  const renderBottom = () => {
    const bottomChild = renderChild("bottom");
    if (bottomChild) {
      return <div className="bottom">{bottomChild}</div>;
    }
  };
  // 通过 jsx标签上的name属性来进行标记并找到对应的虚拟DOM对象并渲染
  
  const renderChild = (tag) => {
    const children = props.children;
    if (!children) return null;
    if (children && !Array.isArray(children)) {
      return props.children;
    }
    return children.find((v) => v.props.name === tag);
  };
  return (
    <div className="empty">
      <div
        className="image"
        style={{ width: imageSize + "px", height: imageSize + "px" }}
      >
        {renderImage()}
      </div>
      {renderDescription()}
      {renderBottom()}
    </div>
  );
}
