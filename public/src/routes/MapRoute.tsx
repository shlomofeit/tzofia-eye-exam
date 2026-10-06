import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import AlertPage from "../pages/AlertPage";
import AddAlertPage from "../pages/AddAlertPage";
import EditAlertPage from "../pages/EditAlertPage";

const MapRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/alerts/:id" element={<AlertPage />}></Route>
          <Route path="/alerts/new" element={<AddAlertPage />}></Route>
          <Route path="/alerts/:id/edit" element={<EditAlertPage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default MapRoute;
