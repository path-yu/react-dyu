// AnimatedSwitch.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./animateSwitch.css";

const AnimatedSwitch = (props) => {
  const { children } = props;
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames={props.type || "slide"}
            timeout={props.duration || 2000}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default AnimatedSwitch;
