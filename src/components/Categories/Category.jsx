import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../redux/api/apiSlice.js";

import Products from "../Products/Products.jsx";

import styles from "../../styles/Category.module.css";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector((state) => state.categories);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5, // кол-во элементов
    offset: 0, //
    ...defaultValues,
  };
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [isEnd, setEnd] = useState(false);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues); // сброс при переходе между категориями
    setItems([]); // сброс при переходе между категориями
    setEnd(false); // сброс при переходе между категориями
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === Number(id));
    setCat(category);
  }, [id, list]);

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setEnd(true);

    setItems((_items) => {
      return [..._items, ...data];
    });
  }, [isLoading, data]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setItems([]); // сброс
    setEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input type="text" name="title" onChange={handleChange} placeholder="Product name" value={values.title} />
        </div>
        <div className={styles.filter}>
          <input type="number" name="price_min" onChange={handleChange} value={values.price_min} />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input type="number" name="price_max" onChange={handleChange} value={values.price_max} />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title="" products={items} style={{ padding: 0 }} amount={items.length} />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>See more</button>
        </div>
      )}
    </section>
  );
};

export default Category;
