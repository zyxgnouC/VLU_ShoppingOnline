import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import classNames from "classnames/bind";
import styles from "./scss/Order.module.scss";
// import ReactPaginate from 'react-paginate';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
      ordersAll: [],
      order: null,
      selectedOption: '',
      customer: [],
      checked: 'all',

    };
  }
  render() {
    
    const cx = classNames.bind(styles);
    const customerArray = [];
    // console.log(this.state.ordersAll)
    

    const orders = this.state.ordersAll.map((item) => {
      if (this.state.selectedOption !== '') {
        if (item.customer._id === this.state.checked) {
          return (
              <tr key={item._id}  className={cx('list-order')} onClick={() => this.trItemClick(item)}>
                <td>{item._id}</td>
                <td>{new Date(item.cdate).toLocaleString()}</td>
                <td>{item.customer.name}</td>
                <td>{item.customer.phone}</td>
                <td>{item.total}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'PENDING' ?
                    <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>Xác nhận</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>Hủy</span></div>
                    : <div />}
                </td>
              </tr>

          )
        } 
      } else {
        return (
          <tr key={item._id} className={''} onClick={() => this.trItemClick(item)}>
            <td>{item._id}</td>
            <td>{new Date(item.cdate).toLocaleString()}</td>
            <td>{item.customer.name}</td>
            <td>{item.customer.phone}</td>
            <td>{item.total}</td>
            <td>{item.status}</td>
            <td>
              {item.status === 'PENDING' ?
                <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>Xác nhận</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>Hủy</span></div>
                : <div />}
            </td>
          </tr>
        )
      }


    });

    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
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
    this.state.ordersAll.map(item => {
      if(customerArray.includes(item.customer._id)) {

      } else {
        customerArray.push(item.customer._id)
        console.log(customerArray)
      }
      
    })
    const customer = this.state.customer.map((item) => {
      if (customerArray.includes(item._id)) {
        return (
          <div key={item._id} className={cx('Order-customer-all')} >
            <label  htmlFor={item._id}>
              <input
                type="radio"
                name="vote"
                value={item._id}
                id={item._id}
                checked={this.state.checked === item._id}
                onChange={(e) => this.handleOnChange(e, item._id)}
              />
              {item.name}
            </label>
          </div>
        )
      }
    })


    return (
      <div className={cx('Order')}>
        <h2 className="Order-title">ORDER LIST</h2>
        {this.state.loading ?
          <div className='container'>
            <div className={cx('center-container-order')}>
              <div className={cx('Order-customer')}>
                {this.state.customer ? customer : ''}
                <div className={cx('Order-customer-all')} onClick={(e) => this.handleOnChange2(e)}>Refest </div>
              </div>

              <div className={cx('Order-customer-table')}>
                {this.state.orders.length > 0 ?
                  <table className={cx('table')} border="1">
                    <tbody>
                      <tr className={cx('header')}>
                        <th className='fixed'>ID</th>
                        <th>Creation date</th>
                        <th>Cust.name</th>
                        <th>Cust.phone</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      {orders}
                    </tbody>
                  </table>
                  : 'khách hàng chưa mua gì cả'}

                {this.state.order ?
                  <div className={cx('Order-customer-table-detail')}>
                    <h2 className="text-center">ORDER DETAIL</h2>
                    <table className="" border="1">
                      <tbody>
                        <tr className={cx('header')}>
                          <th>No.</th>
                          <th>Prod.ID</th>
                          <th>Prod.name</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                        {items}
                      </tbody>
                    </table>
                  </div>
                  : <div />}
              </div>
            </div>
          </div>
          : 'loadding....'}

      </div>

    );
  }
  componentDidMount() {
    this.apiGetOrders();
    this.apiGetCustomers();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customer: result });
    });
  }
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result.orders, ordersAll: result.ordersAll, loading: true });
    });
  }
  handleOnChange(e, id) {
    // console.log('selected option', e.target.value);
    this.setState({ selectedOption: e.target.value, checked: id });
  }

  handleOnChange2(e) {
    // this.apiGetOrders(1);
    this.setState({ selectedOption: '', checked: 'all' });
    // console.log(this.state.orders)
    // this.apiGetOrders(curPage);
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders(this.state.curPage);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  


}
export default Order;