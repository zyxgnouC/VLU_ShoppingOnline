import axios from "axios";

import classNames from "classnames/bind";
import styles from "./scss/NewProduct.module.scss";
import Card from "../Card";
import { useState, useEffect } from "react";
import img from './img/shoppingcart.svg'
import img2 from './img/shoppingtime.svg'

function NewProducts({ type }) {

  const cx = classNames.bind(styles);

  const [newProDuct, setNewProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ProductNew = await axios.get('/api/customer/products/new');
      setNewProduct(ProductNew.data);
    };
    fetchData();
  }, [])
  // console.log(newProDuct)
  return (
    <div className={cx("NewProducts")}>
      <div className={cx("NewProducts-title")}>
        <div className={cx("NewProducts-title-center")}>
          <img src={img} alt="" />
          <h1>Sản phẩm bán chạy</h1>
        </div>
      </div>
      <div className={cx("NewProductsList")}>
        <div className={cx("NewProductsList-title")}>
          <span>
            <img src={img2} alt="" />
            Yahoo! Shopping
          </span>
        </div>
        <div className={cx("NewProductsList-List")}>
         <div className={cx("NewProductsList-List-center")}>
            {newProDuct?.map((item) => 
             <Card item={item} key={item._id} /> 
            )}
         </div>
        </div>

      </div>
    </div>
  );
}

export default NewProducts;
