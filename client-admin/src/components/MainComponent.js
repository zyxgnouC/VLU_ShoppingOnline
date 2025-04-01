import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Header from './HeaderComponent'
import classNames from 'classnames/bind';
import styles from './scss/MainComponent.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
class Main extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const cx = classNames.bind(styles)

    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Header />
          <div className="content">
            <Menu />
            <Routes>
              <Route path='/' element={<Navigate replace to='/admin/home' />} />
              <Route path='/admin/home' element={<Home />} />
              <Route path='/admin/category' element={<Category />} />
              <Route path='/admin/product' element={<Product />} />
              <Route path='/admin/order' element={<Order />} />
              <Route path='/admin/customer' element={<Customer />} />
            </Routes>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  // setCookie(cname, cvalue, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }
  // getCookie(cname) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //       let c = ca[i];
  //       while (c.charAt(0) === ' ') {
  //           c = c.substring(1);
  //       }
  //       if (c.indexOf(name) === 0) {
  //           return c.substring(name.length, c.length);
  //       }
  //   }
  //   return "";
  // }
}
export default Main;