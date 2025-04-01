import React from "react";  
import { Link } from "react-router-dom";  
import './scss/PicCategories.scss';  

function Categories() {  
  return (  
    <div className="Piccategories">  
      <div className="col">  
        <div className="row">  
          <img  
            src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/9/9/1391879/Iphone-16-1.jpg"  
            alt="iPhone"  
          />  
          <button>  
          <Link to="../product/category/6288b174708fabf8ab29ca0d" className="link">  
              iPhone  
            </Link>  
          </button>  
        </div>  
      </div>  
      <div className="col">  
        <div className="row">  
          <img  
            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/14/1068214/Anh-Chup-Man-Hinh-20-01.png"  
            alt="iPad"  
          />  
          <button>  
            <Link to="../product/category/6288b164708fabf8ab29ca0a" className="link">  
              iPad  
            </Link>  
          </button>  
        </div>  
      </div>  
      <div className="col col-l">  
        <div className="row">  
          <img  
            src="https://cdn.tgdd.vn/Files/2023/02/19/1511466/hinh-nen-macbook-dep-nhat-1-190223-210557.jpg"  
            alt="Macbook"  
          />  
          <button>  
            <Link to="../product/category/6288b180708fabf8ab29ca10" className="link">  
              Macbook  
            </Link>  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default Categories;