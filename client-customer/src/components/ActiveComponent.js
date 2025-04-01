import axios from 'axios';
import React, { Component } from 'react';
import classNames from "classnames/bind";
import styles from '../scss/SignUp.module.scss'
import MyContext from '../contexts/MyContext';

class Active extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    const cx = classNames.bind(styles)
    return (

      <div className={cx('Signup')}>
        <div className={cx('Form')}>
          <div className={cx('title-signup')}>
            ACTIVE ACCOUNT
          </div >
         <form>
            <div className={cx('box')}>
              <div className={cx('input-group')}>
                <label htmlFor="ID">Your ID</label>
                <input name='ID' type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} />
              </div>
              <div className={cx('input-group')}>
                <label htmlFor="token">Your Token</label>
                <input type="text" name='token' value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
              </div>
              <input type="submit" value="Active" className={cx("login-btn")} onClick={(e) => this.btnActiveClick(e)} />
            </div>
         </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      if (id.length > 23) {
        this.apiActive(id, token);
      } else {
        this.context.SetnotifyWarning('ID sai kìa má vô mail check lại đi')
      }
        
    } else {
      this.context.SetnotifyWarning('Mời bạn nhập các trường còn thiếu')
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      // console.log(result)
      if (result.active = 1) {
        this.context.SetnotifySuccess('Kích hoạt tài khoản thành công, giờ bạn có thể đăng nhập')
        this.setState({ txtID: '', txtToken: ''})
      } else {
        this.context.SetnotifyWarning(result.message)
      }
    });
  }
}
export default Active;