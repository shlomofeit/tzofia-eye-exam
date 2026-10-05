import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";

const MapRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MapRoute;
