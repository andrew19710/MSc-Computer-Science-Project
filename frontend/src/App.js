import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import * as OUR_ROUTES from "./constants/routes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const ShowJourney = lazy(() => import("./pages/ShowJourney"));
const PrintItinerary = lazy(() => import("./pages/PrintItinerary"));
const About = lazy(() => import("./pages/About"));
const Notfound = lazy(() => import("./pages/Notfound"));

axios.defaults.baseURL = "http://localhost:5002";

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <section>
            <div className="flex h-screen">
              <div className="m-auto">
                <img
                  width="128px"
                  height="128px"
                  src="/images/moving_train.gif"
                  alt="loader"
                />
              </div>
            </div>
          </section>
        }
      >
        <Navbar />
        <Routes>
          <Route path={OUR_ROUTES.HOME} index element={<Home />} />
          <Route
            path={OUR_ROUTES.SHOW_JOURNEY}
            index
            element={<ShowJourney />}
          />
          <Route
            path={OUR_ROUTES.PRINT_ITINERARY}
            index
            element={<PrintItinerary />}
          />
          <Route path={OUR_ROUTES.ABOUT} index element={<About />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
