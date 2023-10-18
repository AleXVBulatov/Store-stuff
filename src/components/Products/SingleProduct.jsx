import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetProductQuery } from "../../redux/api/apiSlice.js";
import { ROUTES } from "../../utils/routes.js";

import Product from "./Product.jsx";
import Products from "./Products.jsx";

const SingleProduct = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const productQuery = useGetProductQuery({ id });
  const { data, isLoading, isFetching, isSuccess } = productQuery;

  const { products } = useSelector((state) => state); // Нужно будет переделать!!!!!!!!!!

  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={products.list} amount={5} title="Trending" />
    </>
  );
};

export default SingleProduct;
