import React, { Component } from 'react';  
import MyContext from '../contexts/MyContext';  
import CartUtil from '../ultils/CartUtil';  
import axios from 'axios';  
import withRouter from '../ultils/withRouter';  
import classNames from "classnames/bind";  
import styles from '../scss/ShowCart.module.scss';  
import CreditCardIcon from '@mui/icons-material/CreditCard';  

class Mycart extends Component {  
  static contextType = MyContext;  

  constructor(props) {  
    super(props);  
    this.state = {  
      address: ''  
    };  
  }  

  lnkRemoveClick(id) {  
    const mycart = this.context.mycart;  
    const index = mycart.findIndex(x => x.product._id === id);  
    if (index !== -1) {  
      mycart.splice(index, 1);  
      this.context.SetnotifySuccess('Xóa giỏ hàng thành công.');  
      this.context.setMycart(mycart);  
    }  
  }  

  lnkRemoveAll() {  
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {  
      this.context.setMycart([]);  
      this.context.SetnotifySuccess('Đã xóa toàn bộ giỏ hàng.');  
    }  
  }  

  lnkCheckoutClick() {  
    if (window.confirm('Bạn có muốn đặt hàng?')) {  
      const { mycart, customer } = this.context;  
      const { address } = this.state;  

      if (mycart.length === 0) {  
        this.context.SetnotifyWarning('Giỏ hàng của bạn đang trống.');  
        return;  
      }  

      if (!customer) {  
        this.props.navigate('/login');  
        return;  
      }  

      if (address.length === 0) {  
        this.context.SetnotifyWarning('Bạn chưa có địa chỉ giao hàng.');  
        return;  
      }  

      const total = CartUtil.getTotal(mycart);  
      this.apiCheckout(total, mycart, customer, address);  
    }  
  }  

  render() {  
    const cx = classNames.bind(styles);  
    const user = this.context.customer;  

    return (  
      <div className={cx('ShowCart')}>  
        <div className='container'>  
          <div className={cx('ShowCart-center')}>  
            <div className={cx('ShowCart-title')}>  
              <CreditCardIcon className={cx('ShowCart-title-icon')} />  
              <h3>Thanh Toán</h3>  
              <p>Vui lòng kiểm tra thông tin, địa chỉ và giỏ hàng trước khi đặt hàng.</p>  
            </div>  
            <div className={cx('ShowCart-content')}>  
              <div className={cx('ShowCart-userInf')}>  
                <div className={cx('item')}>  
                  <h4>Thông tin khách hàng</h4>  
                </div>  
                <div className={cx('item')}>  
                  <label htmlFor="">Họ tên</label>  
                  <input type="text" value={user && user.name} disabled />  
                </div>  
                <div className={cx('item')}>  
                  <label htmlFor="">Số điện thoại</label>  
                  <input type="text" value={user && user.phone} disabled />  
                </div>  
                <div className={cx('item')}>  
                  <label htmlFor="">Email</label>  
                  <input type="text" value={user && user.email} disabled />  
                </div>  
                <div className={cx('item')}>  
                  <label htmlFor="address">Địa chỉ</label>  
                  <input  
                    name='address'  
                    type="text"  
                    value={this.state.address}  
                    onChange={(e) => this.setState({ address: e.target.value })}  
                  />  
                </div>  
                <div className={cx('item')}>  
                  <h4>Hình thức thanh toán</h4>  
                  <div className={cx('item-thanhtoan')}>  
                    <input type="radio" id="thanhtoan" checked readOnly />  
                    <label htmlFor="thanhtoan">Thanh toán khi nhận hàng</label>  
                  </div>  
                </div>  
              </div>  
              <div className={cx('ShowCart-cartInf')}>  
                <div className={cx('ShowCart-cartInf-title')}>  
                  <h4>Thông tin đơn hàng</h4>  
                  <p>SL: {this.context.mycart.length} </p>  
                </div>  
                <div className={cx('ShowCart-cartInf-Content')}>  
                  {this.context.mycart.map(item => (  
                    <div key={item.product._id} className={cx('ShowCart-cartInf-products')}>  
                      <div className={cx('ShowCart-cartInf-product')}>  
                        <div className={cx('left')}>  
                          <span>{item.product.name}</span>  
                          <p>{item.product.price} x {item.quantity}</p>  
                        </div>  
                        <div className={cx('right')}>  
                          <p>: {item.product.price * item.quantity} $</p>  
                        </div>  
                      </div>  
                    </div>  
                  ))}  
                </div>  
                <div className={cx('ShowCart-cartInf-total')}>  
                  <div className={cx('total')}>  
                    <span>Tổng thành tiền:</span>  
                    <p>{CartUtil.getTotal(this.context.mycart)} $</p>  
                  </div>  
                </div>  
                <div className={cx('ShowCart-cartInf-Checkout')}>  
                  <button onClick={() => this.lnkCheckoutClick()} >Xác nhận</button>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    );  
  }  

  apiCheckout(total, items, customer, address) {
    const body = { total: total, items: items, customer: customer, address: address };
    const config = { headers: { 'x-access-token': this.context.token } };
    
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.context.SetnotifySuccess('Bạn đã đặt hàng thành công.');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        this.context.SetnotifyWarning('Đã có lỗi gì đó với giỏ hàng của bạn.');
      }
    })
      .catch((error) => {  
      this.context.SetnotifyWarning('Lỗi kết nối, vui lòng thử lại sau.');  
    });;
  }  
}  

export default withRouter(Mycart);
 