import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AppRoutes from "../Routes/Routes.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import { getCategories } from "../../redux/categories/categoriesSlice.js";
import { getProducts } from "../../redux/products/productsSlice.js";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
