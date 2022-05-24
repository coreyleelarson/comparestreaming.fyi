import ReactGA from "react-ga4";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { UtilityHeader } from "../components/UtilityHeader";
import { Home } from "../views/Home";

ReactGA.initialize("G-EDMWRBCS5Z", {
  gtagOptions: { debug_mode: process.env.NODE_ENV === "development" },
});

export const App = () => (
  <>
    <UtilityHeader />
    <main>
      <Routes>
        <Route element={<Home />} index />
      </Routes>
    </main>
    <Footer />
  </>
);
