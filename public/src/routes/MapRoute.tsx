import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import AlertPage from "../pages/AlertPage";
import AddAlertPage from "../pages/AddAlertPage";

const MapRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/alerts/:id" element={<AlertPage />}></Route>
          <Route path="/alerts/new" element={<AddAlertPage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MapRoute;
