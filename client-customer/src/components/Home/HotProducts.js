import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import classNames from "classnames/bind";
import "./scss/HotProducts.scss"
import Card from "../Card";
import { useState, useEffect } from "react";
import img from './img/flash.svg'
import { Link } from "react-router-dom";
function HotProducts({ type }) {
  // const cx = classNames.bind(styles);

  const [hotProduct, setHotProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const ProductHot = await axios.get('/api/customer/products/hot');
      setHotProduct(ProductHot.data)
    };
    fetchData();

  }, [])

  console.log(hotProduct == null)

  return (
    <div className="HotProducts">
      <div className="HotProductsTitle">
        <div className="HotProducts-img">
          <img src={img} alt="" />
          <h1>{type} Products</h1>
        </div>
        <div className="HotProducts-more">
          <Link to={'/products'}>Xem thêm <ArrowForwardIosIcon className="icon" /> </Link>
        </div>
      </div>
      <div className="ProductHotList">
        {hotProduct?.map((item) => {
          if (item !== null) {
            return (
              <Card item={item} key={item._id} />
            )

          } else {
            return(' Chưa có sản phẩm được mua ')
          }

        })}
      </div>
    </div>
  );
}

export default HotProducts;
