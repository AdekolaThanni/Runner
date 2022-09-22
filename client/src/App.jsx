import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet } from "react-router-dom";
import React from "react";
import AppSkeleton from "./components/skeletons/AppSkeleton";

function App() {
  return (
    <React.Suspense fallback={<AppSkeleton />}>
      <div className="">
        <Header />
        <main className="min-h-[98vh] relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </React.Suspense>
  );
}

export default App;
