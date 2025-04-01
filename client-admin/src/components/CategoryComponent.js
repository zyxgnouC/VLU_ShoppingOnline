import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import './scss/Category.scss'

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.length > 0 ?  this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    }) : 'loading...';
    return (
      <div className="category">
        <div className='container'>
          <div className='center-category-container'>
            <div className="float-left">
              <h2 className="text-center">CATEGORY LIST</h2>
              <table className="datatable" border="1">
                <tbody>
                  <tr className="datatable">
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                  {cates}
                </tbody>
              </table>
            </div>
            {/* <div className="inline" /> */}
            <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
            {/* <div className="float-clear" /> */}
          </div>
        </div>
      </div>
    );
    
  }
  
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      // console.log(res)
      if (res.data.success != 'False') {
        const result = res.data;
        this.setState({ categories: result ? result : [] });
      } else {
        this.context.setToken('');
      }
    });
  }
  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  
}
export default Category;