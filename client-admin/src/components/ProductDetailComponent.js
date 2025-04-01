import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import img from './img/noimg.png';
import './scss/Product.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  // Event Handlers - Buttons
  btnAddClick = (e) => {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    const name = txtName;
    const price = parseInt(txtPrice);
    const category = cmbCategory;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (name && price && category && image) {
      const prod = { name, price, category, image };
      this.apiPostProduct(prod);
    } else {
      this.notifyWarning('Hãy nhập các trường còn thiếu');
    }
  }

  btnUpdateClick = async (e) => {  
    e.preventDefault();  
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;  
    const id = txtID;  
    const name = txtName;  
    const price = parseInt(txtPrice);  
    const category = cmbCategory;  
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');  
  
    if (id && name && price && category && image) {  
      const prod = { name, price, category, image };  
      await this.apiPutProduct(id, prod);  
    } else {  
      this.notifyWarning('Hãy nhập các ô bị để trống');  
    }  
  }

  btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        this.notifyWarning('Chọn sản phẩm bạn muốn xóa');
      }
    }
  }

  btnClearClick = (e) => {
  if (e) e.preventDefault();
  this.setState({
    txtPrice: "",
    txtName: "",
    txtID: "",
    cmbCategory: "",
    imgProduct: ""
  });
}


  // APIs
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      if (res.data) {
        this.notifySuccess('Thêm thành công');
        this.btnClearClick();
        this.apiGetProducts();
      } else {
        this.notifyWarning('Không thể thực hiện hành động');
      }
    });
  }

  apiPutProduct = async (id, prod) => {  
    const config = { headers: { 'x-access-token': this.context.token } };  
    try {  
      const response = await axios.put(`/api/admin/products/${id}`, prod, config);  
      if (response.data) {  
        this.notifySuccess('Cập nhật thành công');  
        this.apiGetProducts();  
        this.btnClearClick(); // Xóa thông tin sau khi cập nhật thành công  
      } else {  
        this.notifyWarning('Không thể cập nhật, vui lòng thử lại');  
      }  
    } catch (error) {  
      console.error('Update failed', error);  
      this.notifyWarning('Có lỗi xảy ra, vui lòng kiểm tra lại');  
    }  
  }  

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/products/${id}`, config).then((res) => {
      if (res.data) {
        this.notifySuccess('Xóa thành công');
        this.btnClearClick();
        this.apiGetProducts();
      } else {
        this.notifyWarning('Không thể thực hiện hành động');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${this.props.curPage}`, config).then((res) => {
      const result = res.data;
      if (result.products.length) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get(`/api/admin/products?page=${this.props.curPage - 1}`, config).then((res) => {
          this.props.updateProducts(res.data.products, res.data.noPages);
        });
      }
    });
  }

  // Helper Methods
  notifySuccess = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

  notifyWarning = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });

  previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      const { _id, name, price, category, image } = this.props.item;
      this.setState({
        txtID: _id,
        txtName: name,
        txtPrice: price,
        cmbCategory: category._id,
        imgProduct: `data:image/jpg;base64,${image}`,
      });
    }
  }

  render() {
    const cates = this.state.categories.map((cate) => (
      <option key={cate._id} value={cate._id} selected={this.props.item?.category?._id === cate._id}>
        {cate.name}
      </option>
    ));

    return (
      <div className="productDetail">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" value={this.state.txtID} readOnly /></td>
              </tr>
              <tr>
                <td>Name</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} /></td>
              </tr>
              <tr>
                <td>Price</td>
                <td><input type="text" value={this.state.txtPrice} onChange={(e) => this.setState({ txtPrice: e.target.value })} /></td>
              </tr>
              <tr>
                <td>Image</td>
                <td><input type="file" accept="image/jpeg, image/png, image/gif" onChange={this.previewImage} /></td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select onChange={(e) => this.setState({ cmbCategory: e.target.value })}>
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="submit" value="ADD NEW" onClick={this.btnAddClick} className="btn-add" />
                  <input type="submit" value="UPDATE" onClick={this.btnUpdateClick} className="btn-upda" />
                  <input type="submit" value="DELETE" onClick={this.btnDeleteClick} className="btn-dele" />
                  <input type="submit" value="CLEAR" onClick={this.btnClearClick} className="btn-clear" />
                  <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} theme="light" />
                </td>
              </tr>
              <tr className="productDetail-img">
                <td colSpan="2">
                  <img src={this.state.imgProduct || img} width="200" height="200" alt="product" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default ProductDetail;
