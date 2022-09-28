import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import appStore from "./stores/appStore/appStore";
import GlobalPopup from "./components/layout/GlobalPopup";
import Confirmation from "./components/layout/Confirmation";
import Form from "./components/layout/Form";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Provider store={appStore}>
      <Header />
      <GlobalPopup />
      <Confirmation />
      <Form />
      <main className="min-h-[95vh] relative px-[5rem]">
        <Outlet />
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
