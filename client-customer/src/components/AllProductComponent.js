import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../ultils/withRouter';
import styles from '../scss/Product.module.scss'
import classNames from "classnames/bind";
import Card from "./Card";
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      category: [],
      min: 0,
      max: 1000,
    };
  }
  render() {


    const cx = classNames.bind(styles)

    const handlePageClick = async (data) => {
      const curPage = await data.selected + 1;
      this.apiGetProducts(curPage);
    }
    const prods =  this.state.products.map((item) => {
      if(item.price <= this.state.max && item.price >= this.state.min) {
        return (
          <Card item={item} key={item._id} />
        );
      } 
     
    });
    // console.log(this.state.products)
    
    return (
      <div className={cx('Product')}>
        <div className={cx('ListCardItem')}>
          <div className='container'>
            <div className={cx('Content')}>
              <div className={cx('Category')}>
                
                <div className={cx('Category-List')}>
                <div className={cx('Category-title')}>
                  <span>Danh mục sản phẩm:</span>
                </div>
                  <ul>
                    <li>
                    <NavLink to={'/products'}>Xem tất cả</NavLink>
                    </li>
                  {this.state.category.map((item) => {
                  return (
                    <li>
                      <NavLink to={"/product/category/" + item._id}>{item.name}</NavLink>
                    </li>
                  )
                })}
                  </ul>
                </div>
                <div className={cx('Category-Price')}>
                  <span>Lọc theo giá:</span>
                  <div className={cx('Category-Price-input')}>
                    <input type="number" min={0} value={this.state.min} onChange={(e) => this.setState({min: e.target.value})}  placeholder='Giá từ ($)'/>
                    <div class="bold">  <p>~</p>  </div>
                    <input type="number" min={0} value={this.state.max}  onChange={(e) => this.setState({max: e.target.value})}  placeholder='Giá đến ($)'/>
                  </div>
                </div>
                
              </div>
              <div className={cx('divContainer')}>
                <h2 className={cx('ListCard-title')}>
                  <p>{this.state.products.length > 0 ? ` Tất cả sản phẩm ` : 'Loading...'}</p>

                </h2>
                <div className={cx('ListItem')}>
                  {prods}
                </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    this.apiGetProducts(this.state.curPage);
  }

  apiGetProducts(page) {
    axios.get('/api/customer/products/category?page=' + page).then(async (res) => {
      const result = await res.data;
      // console.log(result)
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage , category: result.categories });
    });
  }

}
export default withRouter(Product);



