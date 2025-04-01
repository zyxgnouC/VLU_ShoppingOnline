import axios from 'axios';
import React, { Component } from 'react';
import { Link, Navigate, Outlet, NavLink } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

import classNames from "classnames/bind";
import styles from '../scss/Myprofile.module.scss'

import LogoutIcon from '@mui/icons-material/Logout';

import CreateIcon from '@mui/icons-material/Create';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      imgProduct: '',
      readOnly: 'readonly'
    };
  }
  render() {
    const cx = classNames.bind(styles)
    // console.log(this.context.token)

    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className={cx("Profile")}>
        <div className='container'>
          <div className={cx("ProfileCenter")}>
            <div className={cx("ProfileUser")}>
              <div className={cx("ImgUser")}>
                <img
                  src={ this.context.customer.image ?  "data:image/jpg;base64," + this.context.customer.image : ''}
                  alt="err"
                />
                <div className={cx("ImgUser-name")}>
                  <p>{this.state.txtUsername} </p>
                  <div className={cx("ImgUser-name-update")}>
                    <CreateIcon />
                    <p>Sửa hồ sơ</p>
                  </div>
                </div>
              </div>

              <div className={cx("User-setting")}>
                {/* <div className={cx("User-setting-item")}>
                  <ReceiptIcon />
                  <p>Ưu đãi cho bạn</p>
                </div> */}
                
                  <div className={cx("User-setting-item")}>
                    <NavLink to={'/myprofile/profile/' + this.context.customer._id}>
                   
                      <PersonIcon />
                      <p>Hồ sơ của tôi</p>
                    </NavLink>
                 
                </div>
                <div className={cx("User-setting-item")}>
                  <NavLink to='/myprofile/changepass'>
                    <LockResetOutlinedIcon />
                    <p>Đổi Mật Khẩu</p>
                  </NavLink>
                </div>
                <div className={cx("User-setting-item")}>
                  <NavLink to={'/myprofile/myorders/' + this.context.customer._id} >
                    <AssignmentIcon />
                    <p>Đơn mua</p>
                  </NavLink>
                </div>
                <div className={cx("User-setting-item")}>
                  <NotificationsIcon />
                  <p>Thông báo</p>
                </div>
                <div className={cx("User-setting-item")}>
                  <Link to='/home' onClick={() => this.lnkLogoutClick()}>
                    <LogoutIcon/>
                    <p>Logout</p>
                  </Link>
                </div>
              </div>

            </div>
            <div className={cx("ProfileForm")}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
  lnkLogoutClick = () => {
    this.context.setToken('');
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
        imgProduct: this.context.customer.image
      });
    }
  }
  // event-handlers
  // btnUpdateClick(e) {
  //   e.preventDefault();
  //   const username = this.state.txtUsername;
  //   const password = this.state.txtPassword;
  //   const name = this.state.txtName;
  //   const phone = this.state.txtPhone;
  //   const email = this.state.txtEmail;
  //   if (username && password && name && phone && email) {
  //     const customer = { username: username, password: password, name: name, phone: phone, email: email };
  //     this.apiPutCustomer(this.context.customer._id, customer);
  //   } else {
  //     alert('Please input username and password and name and phone and email');
  //   }
  // }
  // // apis
  // apiPutCustomer(id, customer) {
  //   const config = { headers: { 'x-access-token': this.context.token } };
  //   axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
  //     const result = res.data;
  //     if (result) {
  //       alert('OK BABY!');
  //       this.context.setCustomer(result);
  //     } else {
  //       alert('SORRY BABY!');
  //     }
  //   });
  // }
}
export default Myprofile;