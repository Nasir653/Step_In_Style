import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Context/Store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IconContext } from "react-icons";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ToastContainer position="top-center" />

    <Store />
  </BrowserRouter>
);
