import axios from 'axios';
import React, { Component } from 'react';
import {  Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import classNames from "classnames/bind";
import styles from '../scss/ProfileChild.module.scss'
import img from '../img/avatar2.jpg'
class ProfileForm extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            imgUser: '',
            newIMG: '',
            Disabled: 'disabled'
        };
    }
    render() {
        const cx = classNames.bind(styles)
        // console.log(this.state.imgUser)
        // console.log(this.context.customer)
        
        if (this.context.token === '') return (<Navigate replace to='/login' />);
        return (
            <div className={cx('UserAccount')}>
                <div className={cx('title')}>
                    <h3>Hồ sơ của tôi</h3>
                    <p>Quản lí thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className={cx('contennt')}>
                    <form>
                        <table className={cx('table')}>
                            <tbody>
                                <tr>
                                    <td>Tên tài khoản</td>
                                    <td><input type="text" value={this.state.txtUsername} disabled={this.state.Disabled} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                                </tr>
                                {/* <tr>
                                        <td>Password</td>
                                        <td><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                                    </tr> */}
                                <tr>
                                    <td>Tên của bạn</td>
                                    <td><input type="text" value={this.state.txtName} disabled={this.state.Disabled} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
                                </tr>
                                <tr>
                                    <td>số điện thoại</td>
                                    <td><input type="tel" value={this.state.txtPhone} disabled={this.state.Disabled} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><input type="email" value={this.state.txtEmail} disabled={this.state.Disabled} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button className={cx('inputSubmit')} type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} >Update</button></td>
                                </tr>

                            </tbody>
                        </table>
                    </form>
                    <div className={cx('ImgUser')}>
                        <img src={img} alt="" className={cx('Img')}/>
                        <label for="fileImageuser">Chọn ảnh</label>                        
                        <input type="file" name="fileImageuser" id="fileImageuser" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} />
                        <div className={cx('ImgUser-bottom')}>
                            <p>Dụng lượng file tối đa 1 MB</p>
                            <p>Định dạng:.JPEG, .PNG, .gif</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    componentDidMount() {
        if (this.context.customer) {
            this.setState({
                txtUsername: this.context.customer.username,
                txtPassword: this.context.customer.password,
                txtName: this.context.customer.name,
                txtPhone: this.context.customer.phone,
                txtEmail: this.context.customer.email,
                imgUser: this.context.customer.image
            });
        }
    }
    previewImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({ newIMG: evt.target.result });
            }
            reader.readAsDataURL(file);
        }
    }
    // event-handlers
    btnUpdateClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        const image =  this.state.newIMG.replace(/^data:image\/[a-z]+;base64,/, '');
        if (username && password && name && phone && email && image) {
            const customer = { username: username, password: password, name: name, phone: phone, email: email , image: image };
            this.apiPutCustomer(this.context.customer._id, customer);
        } else {
            alert('Please input username and password and name and phone and email');
        }
    }
    // apis
    apiPutCustomer(id, customer) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/customer/customers/myprofile/profile/' + id, customer, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('Update thành công!');
                this.context.setCustomer(result);
            } else {
                alert('Update không thành công!');
            }
        });
    }
}
export default ProfileForm;