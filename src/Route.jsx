import BookDetail from '@/page/BookPage/BookDetail';
import React from 'react';
import { KeepAlive } from 'react-keep-alive';
import { Route } from 'react-router-dom';
import AnimatedSwitch from './common/AnimatedSwitch';
import BookPage from './page/BookPage/BookPage';
import BookSearchPage from './page/BookPage/BookSearchPage';
import DyPage from './page/DyPage/DyPage';
import LiveRoom from './page/DyPage/LiveRoom';
import LiveRoomListPage from './page/DyPage/LiveRoomListPage';
import UserPage from './page/UserPage/UserPage';
import appState from './store/index';
export default function Routes() {
  return (
    <>
      <Route path='/' exact>
        <KeepAlive name='/'>
          <DyPage />
        </KeepAlive>
      </Route>
      <Route path='/book' exact>
        <KeepAlive name='/book'>
          <BookPage />
        </KeepAlive>
      </Route>
      <AnimatedSwitch>
        <Route path='/bookDetail/:id' exact component={BookDetail} />
      </AnimatedSwitch>
      <AnimatedSwitch>
        <Route
          path='/bookSearch'
          exact
          render={() => <BookSearchPage appState={appState} />}
        />
      </AnimatedSwitch>
      <Route path='/user' exact>
        <KeepAlive name='/user'>
          <UserPage />
        </KeepAlive>
      </Route>
      <Route path='/liveRoomList' exact>
        <LiveRoomListPage />
      </Route>
      <Route path='/liveRoom' exact>
        <LiveRoom />
      </Route>
    </>
  );
}
