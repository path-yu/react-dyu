import SimpleBottomNavigation from "@/components/bottomNavigation/SimpleBottomNavigation";
import {
  AccountBoxRounded,
  HomeSharp,
  MenuBookSharp
} from "@material-ui/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const current = useRef(0);
  const [hidden, setHidden] = useState(true);

  const currentUrl = useMemo(
    () => tabBarDataList[current.current].url,
    [current]
  );

  useEffect(() => {
    history.listen((location, action) => {
     if (location.isOpenNewPage){
       setHidden(false);
     }else{
       setHidden(true)
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
  },[]);

  function handleOnPress(index) {
    history.push(tabBarDataList[index].url);
  }
  
  return (
    <Layout className="App">
      <Switch>
        <Routes></Routes>
      </Switch>
      <SimpleBottomNavigation
        tabBarList={tabBarDataList}
        onPress={handleOnPress}
        current={current.current}
        hidden={hidden}
      ></SimpleBottomNavigation>
    </Layout>
  );
}

export default App;
