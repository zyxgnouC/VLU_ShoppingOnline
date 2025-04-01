import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import styles from '../scss/MyOrder.module.scss'
import classNames from "classnames/bind";
class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
      noPages: 0,
      curPage: 1,
      no: 1,
      name: ''
    };
  }
  render() {
    const cx = classNames.bind(styles)

    // console.log(this.state.orders)
    // console.log(this.state.order ? this.state.order.items : '')

    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>

          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.total}</td>
          <td>{item.Address}</td>
          <td>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        
        return (
          <tr key={item.product._id} >
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    const handlePageClick = async (data) => {
      const curPage = await data.selected + 1;
      const params = this.context.customer._id;
      this.apiGetOrdersByCustID(params, curPage);
    }

    return (
      <div>
        <div className={cx('Order')}>
          <h3 className={cx('Order-title')}>Đơn đặt hàng của bạn</h3>
          <table className={cx('Order-table')} border="1">
            <tbody>
              <tr>

                <th>ID đơn hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng đơn hàng</th>
                
                <th>Địa chỉ giao</th>
                <th>Trạng thái</th>
              </tr>
              {orders}
             
            </tbody>
          </table>
          <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={">>"}
                  breakLabel={'...'}
                  pageCount={this.state.noPages}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={1}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName='active'
                />  
        </div>
        {this.state.order ?
          <div className={cx('Order')}>
            <h4 className={cx('Order-title')}>Chi tiết đơn </h4>
            <table className={cx('Order-table')} border="1">
              <tbody>
                <tr >
                  <th>ID sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền ($)</th>

                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid, this.state.curPage);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
 
  // apis
  apiGetOrdersByCustID(cid, page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid + '?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result.orders, noPages: result.noPages, curPage: result.curPage, });
    });
  }
}
export default Myorders;