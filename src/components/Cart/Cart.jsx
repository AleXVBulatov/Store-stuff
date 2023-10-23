import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { sumBy } from "../../utils/common.js";

import styles from "../../styles/Cart.module.css";
import { addItemToCart, removeItemFromCart } from "../../redux/user/userSlice.js";

const Cart = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.user);
  const { cart } = selector;

  const changeQuantity = (item, quantity) => {
    // console.log(quantity);
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeQuantity = (item) => {
    dispatch(removeItemFromCart(item));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;
              // console.log(quantity);
              return (
                <div key={id} className={styles.item}>
                  <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }} />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>
                  <div className={styles.price}>${price}</div>

                  <div className={styles.quantity}>
                    <div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                      <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div className={styles.plus} onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}>
                      <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>${price * quantity}</div>

                  <div className={styles.close} onClick={() => removeQuantity(item)}>
                    <svg className="icon">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              Total Price: {""}
              <span>${sumBy(cart.map((elem) => elem.price * elem.quantity))}</span>
            </div>
            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
