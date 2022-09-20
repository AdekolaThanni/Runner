import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Route, Routes } from "react-router-dom";
import StoreProducts from "./pages/StoreProducts";

function App() {
  return (
    <div className="">
      {/* Header */}
      <Header />
      <main className="min-h-[98vh]">
        <Routes>
          <Route path="/" element={<StoreProducts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
