import React from "react";
import classNames from "classnames/bind";
import styles from "../scss/Footer.module.scss";


// import img from '../../img/payment.jpg'
function Footer() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("footer")}>
      <div className="container">
        <div className="footerCenter">
          <div className={cx("top")}>
            <div className={cx("item")}>
              <h1>Categories</h1>
              <span>iPhone</span>
              <span>iPad</span>
              <span>Macbook</span>
            </div>
            <div className={cx("item")}>
              <h1>Link</h1>
              <span>FAQ</span>
              <span>Pages</span>
              <span>Stores</span>
              <span>Compare</span>
              <span>Cookies</span>
            </div>
            <div className={cx("item")}>
              <h1>About</h1>
              <span>
              Chúng tôi là một công ty công nghệ hàng đầu, chuyên cung cấp các sản phẩm và dịch vụ đổi mới nhất. Với sứ mệnh mang lại giá trị cho khách hàng, chúng tôi cam kết phát triển các giải pháp sáng tạo, đáp ứng nhu cầu của thị trường.
              </span>
            </div>
            <div className={cx("item")}>
              <h1>Contact</h1>
              <span>
              Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, vui lòng liên hệ với chúng tôi qua địa chỉ email hỗ trợ khách hàng. 
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 để đảm bảo bạn có trải nghiệm tốt nhất.
              Bạn có thể đưa nội dung này vào phần giao diện của bạn để thay thế cho nội dung hiện tại!
              </span>
            </div>
    
          </div>
          <div className={cx("bottom")}>
            <div className={cx('left')}>
                <span className={cx('logo')}>
                    Unowned Store
                </span>
                <span className={cx('copy-right')}>
                    Copyright 2023  
                </span> 
    
            </div>
            <div className={cx('right')}>
                {/* <img src={img} alt="err" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
