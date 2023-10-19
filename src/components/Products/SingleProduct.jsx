import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetProductQuery } from "../../redux/api/apiSlice.js";
import { getRelatedProducts } from "../../redux/products/productsSlice.js";
import { ROUTES } from "../../utils/routes.js";

import Product from "./Product.jsx";
import Products from "./Products.jsx";

const SingleProduct = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const selector = useSelector((state) => state.products);
  const { list, related } = selector;

  const productQuery = useGetProductQuery({ id });
  const { data, isLoading, isFetching, isSuccess } = productQuery;

  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
