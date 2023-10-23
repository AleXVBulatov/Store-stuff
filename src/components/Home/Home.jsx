import React, { useEffect } from "react";
import { connect } from "react-redux";

import { filterByPrice } from "../../redux/products/productsSlice.js";

import Poster from "../Poster/Poster.jsx";
import Products from "../Products/Products.jsx";
import Categories from "../Categories/Categories.jsx";
import Banner from "../Banner/Banner.jsx";

const Home = (props) => {
  const { products, categories, filtered } = props;
  // console.log(props);

  useEffect(() => {
    filtered();
  }, [products.list.length, filtered]);

  return (
    <>
      <Poster />
      <Products products={products.list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={products.filtered} amount={5} title="Less than 100$" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filtered: () => dispatch(filterByPrice(100)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// По примеру с использованием хука useSelector
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { filterByPrice } from "../../redux/products/productsSlice.js";

// import Poster from "../Poster/Poster.jsx";
// import Products from "../Products/Products.jsx";
// import Categories from "../Categories/Categories.jsx";
// import Banner from "../Banner/Banner.jsx";

// const Home = (props) => {
//   const dispatch = useDispatch();
//   const { products, categories } = useSelector((state) => state);

//   useEffect(() => {
//     if (!products.list.length) return;

//     dispatch(filterByPrice(100));
//   }, [dispatch, products.list.length]);

//   return (
//     <>
//       <Poster />
//       <Products products={products.list} amount={5} title="Trending" />
//       <Categories products={categories.list} amount={5} title="Worth seeing" />
//       <Banner />
//       <Products products={products.filtered} amount={5} title="Less than 100$" />
//     </>
//   );
// };

// export default Home;
