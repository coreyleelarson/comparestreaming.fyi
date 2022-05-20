import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Home } from "../views/Home";

export const App = () => (
  <>
    <Header />
    <main>
      <Routes>
        <Route element={<Home />} index />
      </Routes>
    </main>
    <Footer />
  </>
);
