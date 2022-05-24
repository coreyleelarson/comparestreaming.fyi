import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { UtilityHeader } from "../components/UtilityHeader";
import { Home } from "../views/Home";

export const App = () => (
  <>
    <UtilityHeader />
    <Header />
    <main>
      <Routes>
        <Route element={<Home />} index />
      </Routes>
    </main>
    <Footer />
  </>
);
