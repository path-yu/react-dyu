import SimpleBottomNavigation from "@/components/bottomNavigation/SimpleBottomNavigation";
import {
  AccountBoxRounded,
  HomeSharp,
  MenuBookSharp
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./Route";
function App() {
  const tabBarDataList = [
    {
      title: "斗鱼直播",
      key: "live",
      icon: HomeSharp,
      url: "/",
    },
    {
      title: "图书馆",
      key: "book",
      icon: MenuBookSharp,
      url: "/book",
    },
    {
      title: "个人中心",
      key: "user",
      icon: AccountBoxRounded,
      url: "/user",
    },
  ];
  const history = useHistory();
  const ref = useRef(null);
  const [hidden, setHidden] = useState(true);


  function computedLocationIndex(location) {
    return tabBarDataList.findIndex((item) => item.url === location.pathname);
  }
  useEffect(() => {
    let index = computedLocationIndex(location);
    // 初始化设置底部导航栏的索引
    if (index !== -1) {
      ref.current && ref.current.changeValue(index);
    }
   const unListen =  history.listen((location, action) => {
      if (location.isOpenNewPage || location.state?.isOpenNewPage) {
        setHidden(false);
      } else {
        setHidden(true);
      }
      switch (location.pathname) {
        case "/":
          document.title = "首页";
          break;
        case "/book":
          document.title = "图书馆";
          break;
        case "/user":
          document.title = "个人中心";
          break;
        default:
          document.title = "欢迎来到react项目";
      }
    });
    return () => {
      unListen();
    }
  }, []);

  function handleOnPress(index) {
    history.push(tabBarDataList[index].url);
  }

  return (
    <Layout className="App">
      <Switch>
        <Routes/>
      </Switch>
      <SimpleBottomNavigation
        tabBarList={tabBarDataList}
        onPress={handleOnPress}
        hidden={hidden}
        ref={ref}
      />
    </Layout>
  );
}

export default App;
