import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ck = async () => {
      setReady(true);
    };
    ck();
  }, []);

  return (
    <>
      <Navbar />
      {ready && <div className="containerNinish mx-auto px-2">{children}</div>}
      <Footer />
    </>
  );
}
