import React from "react";

import Loader from "@/components/loading/Loading";
import Router from "@/routers/index";
import useStyles from "@/assets/css/styles.css";

function Container({ loading }) {
  if (loading) {
    return (
      <div className={useStyles.h1}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Router />
    </>
  );
}

export default Container;
