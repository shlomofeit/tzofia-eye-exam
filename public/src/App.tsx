import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MapRoute from "./routes/MapRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <MapRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
