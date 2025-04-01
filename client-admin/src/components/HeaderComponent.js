import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import classNames from 'classnames/bind'
import styles from './scss/HeaderComponent.module.scss'
import { Link,NavLink } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  
  render() {
    const cx = classNames.bind(styles)
    // console.log(this.context.token)
    return (
      <div className={cx('Header')}>
        <div className='container'>
          <div  className={cx('Nav')}>
                <p>Hello</p> 
                <b>{this.context.username}</b> | <NavLink  to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</NavLink>
          </div>
        </div>
      </div>
    );
  }
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
    this.setCookie('token', "", 0)
  }
  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}
export default Menu;