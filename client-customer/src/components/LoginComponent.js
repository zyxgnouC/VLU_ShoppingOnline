import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../ultils/withRouter';
import classNames from "classnames/bind";
import styles from '../scss/SignUp.module.scss'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    const cx = classNames.bind(styles)
    // console.log(this.context)
    return (
      <div className={cx('Signup')}>
        <div className={cx('Form')}>
          <div className={cx('title-signup')}>
            Login
          </div >
          <form>
            <div className={cx('box')}>
              <div className={cx('input-group')}>
                <label htmlFor="username">Your NameAccount</label>
                <input type="text" name='username' value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
              </div>
              <div className={cx('input-group')}>
                <label htmlFor="password">Your Password</label>
                <input type="password" name='password' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
              </div>
              <div className={cx("LoginAndSignUp")}>
                <input type="submit" value="login" className={cx("login-btn")} onClick={(e) => this.btnLoginClick(e)} />
                <Link className={cx('toLogin')} to="/signup">SignUp</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
 
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    // console.log(username,password)
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      this.context.SetnotifyWarning('Mời bạn nhập vào những trường còn trống')
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      // console.log(result)
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        this.context.SetnotifyWarning('Tài khoản,mật khẩu không đúng hoặc bạn chưa active account')
      }
    });
  }
}
export default withRouter(Login);