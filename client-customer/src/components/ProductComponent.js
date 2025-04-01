import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    let NameCategory = ''
    // console.log(this.state.category)
    const prods =  this.state.products.map((item) => {
      NameCategory = item.category.name
      if(item.price <= this.state.max && item.price >= this.state.min) {
        return (
          <Card item={item} key={item._id} />
        );
      } 
    });

    const handlePageClick = async (data) => {
      const curPage = await data.selected + 1;
      const params = this.props.params;
      if (params.cid) {
        this.apiGetProductsByCatID(params.cid, curPage);
      } else if (params.keyword) {
        this.apiGetProductsByKeyword(params.keyword, curPage);
      }
    }
    
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
                  <p>{this.state.products.length > 0 ? ` List Product ${NameCategory} ` : 'Loading...'}</p>

                </h2>
                <div className={cx('ListItem')}>
                  {/* <Link to={'/product/category/6288b164708fabf8ab29ca0a'}>xem thêm </Link> */}
                  {this.state.products && prods}
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
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid, this.state.curPage);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword, this.state.curPage);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    // console.log(params)
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid, this.state.curPage);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword, this.state.curPage);
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.params.id !== this.props.params.id) {
  //     const id = nextProps.params.id
  //     this.apiGetProduct( id );
  //   }
  // }
  // apis
  apiGetProductsByCatID(cid, page) {
    axios.get('/api/customer/products/category/' + cid + '?page=' + page).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage, category: result.categories });
    });
  }
  apiGetProductsByKeyword(keyword, page) {
    axios.get('/api/customer/products/search/' + keyword + '?page=' + page).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage, category: result.categories });
    });
  }
}
export default withRouter(Product);