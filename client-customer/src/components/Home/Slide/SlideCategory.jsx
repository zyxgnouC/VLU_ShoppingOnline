import { useState, useEffect } from "react";
import SimpleSliderCate from "./SlickCategory";
import axios from "axios";
import "../scss/SlideCate.scss";
import img from '../img/category.svg'
function SlideCate() {
  const [category, SetCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const CategoryNew = await axios.get("/api/customer/categories");
      SetCategory(CategoryNew.data);
    };
    fetchData();
  }, []);
  console.log(category)
  return (
    <div className="slide-2">
      <div className="container">
        <div className="content-slide">
          <div className="test">
            <div className="content-slide-title">
              <img src={img} alt="" />
              <h2>Danh mục sản phẩm</h2>
            </div>
            <div className="content-flex">
              {category.length > 0 ? <SimpleSliderCate category={category} /> : ""}
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default SlideCate;
