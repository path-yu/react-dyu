import BookDetail from "@/page/BookPage/BookDetail";
import React from "react";
import { KeepAlive } from "react-keep-alive";
import { Route } from "react-router-dom";
import AnimatedSwitch from "./common/AnimatedSwitch";
import BookPage from "./page/BookPage/BookPage";
import BookSearchPage from "./page/BookPage/BookSearchPage";
import DyPage from "./page/DyPage/DyPage";
import LiveRoomListPage from "./page/DyPage/LiveRoomListPage";
import UserPage from "./page/UserPage/UserPage";
import appState from "./store/index";
export default function Routes() {
  return (
    <>
      <Route path="/" exact>
        <KeepAlive name="/">
          <DyPage />
        </KeepAlive>
      </Route>
      <Route path="/book" exact>
        <KeepAlive name="/book">
          <BookPage></BookPage>
        </KeepAlive>
      </Route>
      <AnimatedSwitch>
        <Route path="/bookDetail/:id" exact component={BookDetail}></Route>
      </AnimatedSwitch>
      <AnimatedSwitch>
        <Route
          path="/bookSearch"
          exact
          render={() => <BookSearchPage appState={appState} />}
        ></Route>
      </AnimatedSwitch>
      <Route path="/user" exact>
        <KeepAlive name="/user">
          <UserPage></UserPage>
        </KeepAlive>
      </Route>
      <Route path="/liveRoomList">
        <LiveRoomListPage></LiveRoomListPage>
      </Route>
    </>
  );
}
