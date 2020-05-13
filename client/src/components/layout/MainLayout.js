import React from "react";
// import styles from "./MainLayout.scss";

import TestLayout from "./TestLayout.module.css";

const MainLayout = props => {
  const { children } = props;

  return (
    <div>
      <h1 className="blueTheme">
        123ttt
        <span className={TestLayout.error}>我是全局Layout</span>
      </h1>
      {children}
    </div>
  );
};

export default MainLayout;
