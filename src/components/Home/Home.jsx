import React from "react";
import { useSelector } from "react-redux";

import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";

const Home = () => {
  const { products, categories } = useSelector((state) => state);

  return (
    <>
      <Poster />
      <Products products={products.list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
    </>
  );
};

export default Home;
