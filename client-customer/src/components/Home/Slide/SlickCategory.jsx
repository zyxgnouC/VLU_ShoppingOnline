import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styled from "../SlideCate.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import img from '../img/pic1.png'
export default class SimpleSliderCate extends React.Component {
  render() {
    const settings = {
      // dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 440,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    // console.log(this.props.category);
    return (
      <div className="cate-slide">
        <Slider {...settings}>
          {this.props.category.map((item) => (
            <div className="cate-slide-item" key={item._id}>
              <Link to={"/product/category/" + item._id}>
                <img src={img} alt="" />
                <p>{item.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
