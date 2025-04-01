import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './scss/Category.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: '',
    };
  }
  render() {
    return (

      <div className="float-right">

        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <table>

            <tbody>
              <tr >
                <td><label >ID</label></td>
                <td><input type="text" value={this.state.txtID} id='id' onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr >
                <td><label>Name</label></td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
            </tbody>

          </table>
          <div className='btn-category'>
            <input type="submit" value="Add New" onClick={(e) => this.btnAddClick(e)} className='btn-add' />
            <input type="submit" value="Update" onClick={(e) => this.btnUpdateClick(e)} className='btn-upda' />
            <input type="submit" value="Delete" onClick={(e) => this.btnDeleteClick(e)} className='btn-dele' />
            <input type="submit" value="Clear" onClick={(e) => this.btnClearClick(e)} className='btn-clear' />
            <ToastContainer 
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </form>
      </div>
    );
  }

 
  notifySuccess = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


  notifyWarning = (message) => toast.warn(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });  
  //add
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        this.notifySuccess('thêm mới thành công');
        this.apiGetCategories();
        setTimeout(() => {
          this.setState({ class: 'test-none' })
        }, 3000)
      } else {
        this.notifyWarning('Thêm mới không thành công')
      }
    });
  }
  btnClearClick(e) {
    e.preventDefault();
    this.setState({ txtID: '', txtName: '' });
  }

  //update
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      this.notifyWarning('Bạn không thể để input trống')
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {

        this.notifySuccess('Update thành công');
        this.apiGetCategories();
      } else {
        this.notifyWarning('Update không thành công')
      }
    });
  }

  // delete
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        this.notifyWarning('bạn cần chọn id nào để xóa')
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        this.notifySuccess('xóa thành công');
        this.apiGetCategories();
      } else {
        this.notifyWarning('Xóa không thành công')
      }
    });
  }


  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
    this.setState({ txtID: '', txtName: '' })
  }

}
export default CategoryDetail;