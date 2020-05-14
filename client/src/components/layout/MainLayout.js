import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { _historyHandler } from "@/utils";
// import styles from "./MainLayout.scss";

// import TestLayout from "./TestLayout.module.css";

const MainLayout = props => {
  const { children } = props;
  const history = useHistory();
  const [showPre, toggleShowPre] = useState(false);

  useEffect(() => {
    if (history.location.pathname === "/") {
      toggleShowPre(true);
    } else {
      toggleShowPre(false);
    }

    history.listen(() => {
      if (history.location.pathname === "/") {
        toggleShowPre(true);
      } else {
        toggleShowPre(false);
      }
    });
  }, [history]);

  return (
    <>
      {showPre ? null : (
        <div
          className="top-back"
          onClick={() =>
            _historyHandler({
              step: "back",
              history,
            })
          }
        >
          {"<<<<"}
        </div>
      )}

      {children}
    </>
  );
};

export default MainLayout;
