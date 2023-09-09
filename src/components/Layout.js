import React, { useContext, useEffect, useState } from "react";
import MainContext from "../contextApi/MainContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const mainContext = useContext(MainContext);
  const { initialize } = mainContext;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ck = async () => {
      await initialize();
      setReady(true);
    };
    ck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {ready && <div className="containerNinish mx-auto px-2">{children}</div>}
      <Footer />
    </>
  );
}
