import SimpleSlider from "./Slick";
import "../scss/Slide.scss";

import img1 from "../img/pic1.png";
import img2 from "../img/pic2.png";
import img3 from "../img/pic3.png";
import img4 from "../img/pic4.png";
import img5 from "../img/pic5.png";
import img6 from "../img/pic6.png";

function Slide() {
  return (
    <div className="slide">
      <div className="container">
        <div className="content-slide">
          <div className="test">
            <div className="content-flex">
              <SimpleSlider img1={img1} img2={img2} img3={img3} img4={img4} />
            </div>
          </div>

          <div className="content-flex-2">
            <img src={img6} alt="" />
            <img src={img5} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
