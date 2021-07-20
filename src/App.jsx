import SimpleBottomNavigation from "@/components/bottomNavigation/SimpleBottomNavigation";
import {
  AccountBoxRounded,
  HomeSharp,
  MenuBookSharp
} from "@material-ui/icons";
import React, { useEffect, useLayoutEffect } from "react";
import { KeepAlive } from "react-keep-alive";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import routes from "./Route";

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
  // const tabCurrent = useRef(tabBarDataList[0]);
  const style = {
    position: "fixed",
    width: "100vw",
    bottom: 0,
  };

  useEffect(() => {
    history.listen((location, action) => {
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
  }, []);
  useLayoutEffect(() => {
    
  })
  function handleOnPress(index) {
    history.push(tabBarDataList[index].url);
  }

  function RenderRoute(routes) {
    return (
      <>
        <Redirect to="/"></Redirect>
        <Switch>
          {routes.map((item, index) => {
            let Component = item.component;

            if (item.isNeedKeepAlive) {
              return (
                <Route
                  render={() => (
                    <KeepAlive name={item.path}>
                      <Component></Component>
                    </KeepAlive>
                  )}
                  exact={item.exact}
                  path={item.path}
                  key={index}
                ></Route>
              );
            } else {
              return (
                <Route exact={item.exact} path={item.path} key={index}>
                  <Component></Component>
                </Route>
              );
            }
          })}
        </Switch>
      </>
    );
  }
  return (
    <Layout className="App">
      {RenderRoute(routes)}
      {/* <DyPage></DyPage> */}
      <SimpleBottomNavigation
        style={style}
        tabBarList={tabBarDataList}
        onPress={handleOnPress}
      ></SimpleBottomNavigation>
    </Layout>
  );
}

export default App;
