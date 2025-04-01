
import styles from './scss/Delivery.module.scss'
import classNames from "classnames/bind";
import search from './img/search.svg'
import buy from './img/buy.svg'
import cart from './img/cart.svg'
import car from './img/car.svg'
import checkout from './img/checkout.svg'
function Delivery() {
    const cx = classNames.bind(styles)
    return (
        <div className={cx('Delivery')}>
            <div className={cx('Delivery-title')}>
                <h3>Quy trình mua hàng</h3>
            </div>
            <div className={cx('Delivery-Content')}>
                <div className={cx('Delivery-Content-item')}>
                    <div className={cx('item')}>
                        <div className={cx('icon')}>
                            <img src={search} alt="" />
                        </div>
                        <div className={cx('text')}>
                            <h5>Tìm kiếm sản phẩm</h5>
                            <p>Tìm Kiếm Sản Phẩm Bạn Muốn Đấu Giá Hoặc Mua</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('icon')}>
                            <img src={buy} alt="" />
                        </div>
                        <div className={cx('text')}>
                            <h5>Đặt mua</h5>
                            <p>Đặt Mua Sản Phẩm Bạn Muốn Sau Khi Tìm Kiếm</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('icon')}>
                            <img src={checkout} alt="" />
                        </div>
                        <div className={cx('text')}>
                            <h5>Thanh toán đơn hàng</h5>
                            <p>Thanh Toán Hoàn Toàn Hoặc Một Phần Giá Trị Đơn Hàng</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('icon')}>
                            <img src={cart} alt="" />
                        </div>
                        <div className={cx('text')}>
                            <h5>Tiếp nhận đơn hàng</h5>
                            <p>Chúng Tôi Tiếp Nhận Và Xử Lý Đơn Hàng Của Bạn</p>
                        </div>
                    </div>
                    <div className={cx('item-last')}>
                        <div className={cx('icon')}>
                            <img src={car} alt="" />
                        </div>
                        <div className={cx('text')}>
                            <h5>Đóng gói & vận chuyển</h5>
                            <p>Đóng Gói Hàng Và Vận Chuyển Đến Tay Bạn</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Delivery;