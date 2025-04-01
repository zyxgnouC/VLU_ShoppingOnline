import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from '../scss/ChangePass.module.scss'
import MyContext from '../contexts/MyContext';
import axios from 'axios';

function ChangePass() {
    const Context = useContext(MyContext);
    // console.log(Context.customer.password)
    const cx = classNames.bind(styles)
    const [passNow, SetPassNow] = useState('')
    const [newPass, SetNewPass] = useState('')

    // console.log('passNow', passNow)
    // console.log('newPass', newPass)

    const apiPutCustomer = (id, customer) => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.put('/api/customer/customers/myprofile/profile/' + id, customer, config).then((res) => {
          const result = res.data;
          if (result) {
            Context.setCustomer(result);
            setTimeout(() => {
                Context.setToken('')
              }, "3000");
          } else {
            alert('lỗi gì gòi á');
          }
        });
      }

      const btnUpdateClick = (e) => {
        e.preventDefault();
        if (passNow && newPass) {
            if(passNow === Context.customer.password) {
                const customer = {password: newPass};
                apiPutCustomer(Context.customer._id, customer);
                SetPassNow('')
                SetNewPass('')
                Context.SetnotifySuccess('đã đổi mật khẩu thành công. mời bạn đăng nhập lại')
            }
        } else {
            Context.SetnotifyWarning('bạn nhập sai mật khẩu cũ gòi kìa')
        }
      }
    return (
        <div className={cx('change-pass')}>
            <div className={cx('change-pass-title')}>
                <h3>Đổi mật khẩu</h3>
            </div>
           <div className={cx('Groups')}>
                <div >
                    <div className={cx('change-pass-group')}>
                        <label htmlFor="oldpass">Mật khẩu cũ: </label>
                        <input type="password" id="oldpass" value={passNow} onChange={(e) => SetPassNow(e.target.value)} />
                    </div>
        
                    <div className={cx('change-pass-group')}>
                        < label htmlFor="newpass">Mật khẩu mới: </label>
                        <input type="password" id="newpass " value={newPass} onChange={(e) => SetNewPass(e.target.value)} />
                    </div>
                </div>
                <div className={cx('change-pass-button')}>
                    <button onClick={(e) => btnUpdateClick(e)}>update</button>
                </div>
           </div>
        </div>
    );
}

export default ChangePass;