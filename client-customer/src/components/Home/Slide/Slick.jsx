import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styled from "./Slide.scss";
import Slider from "react-slick";
// import "./scss/Slide.scss";

export default class SimpleSlider extends React.Component {
  render() {
    const settings = {
      // dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    // console.log(this.props.);

    return (
      <div>
        <Slider {...settings}>
          <div>
            <img className="img" src={this.props.img1} alt="err" />
          </div>
          <div>
            <img className="img" src={this.props.img2} alt="err" />
          </div>
          <div>
            <img className="img" src={this.props.img3} alt="err" />
          </div>
          <div>
            <img className="img" src={this.props.img4} alt="err" />
          </div>
        </Slider>
      </div>
    );
  }
}
