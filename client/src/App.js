import React, { useEffect, useState } from "react";

import Container from "./Container";
import "./App.scss";

// import getAppoloClient from "@/apollo/apolloClient";

function App() {
  // const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return <Container loading={loading} />;
}

export default App;
