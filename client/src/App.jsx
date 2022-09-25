import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AppSkeleton from "./components/skeletons/AppSkeleton";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Suspense fallback={<AppSkeleton />}>
      <Header />
      <main className="min-h-[95vh] relative px-[5rem]">
        <Outlet />
      </main>
      <Footer />
    </React.Suspense>
  );
}

export default App;
