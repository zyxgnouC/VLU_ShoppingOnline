import React, { useState, useContext } from "react";
import classNames from "classnames/bind";
import styles from '../scss/Card.module.scss'
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MyContext from '../contexts/MyContext';

function Card({ item }) {

    const Context = useContext(MyContext);
    const cx = classNames.bind(styles)
    const btnAdd2CartClick = (e,item) => {
        e.preventDefault();
        // const product = this.state.product;
        const quantity = 1
        if (quantity) {
            const mycart = Context.mycart;
            const index = mycart.findIndex(x => x.product._id === item._id); // check if the _id exists in mycart
            if (index === -1) { // not found, push newItem
                const newItem = { product: item, quantity: quantity };
                mycart.push(newItem);
            } else { // increasing the quantity
                mycart[index].quantity += quantity;
            }
            Context.setMycart(mycart);
            Context.SetnotifySuccess('sản phẩm đã thêm vào giỏ hàng của bạn')
        } else {
            Context.notifyWarning('mong bạn kiểm tra lại giúp mình số lượng')
        }
    }
    return (
        // <Link className={cx('link')} to={`/product/${item.id}`}>
        <div>
            <div className={cx('card')}>
                <div className={cx('image')}>
                    <figure>
                        <Link to={'/product/' + item._id}>
                            <img src={"data:image/jpg;base64," + item.image} alt="" className={cx('mainImg')} />
                        </Link>
                    </figure>
                </div>
                <h2 className={cx('Name')}>{item?.name}</h2>

                <div className={cx('prices')}>
                    <div>
                        <h2 >{item?.category.name}</h2>
                        <h3>{item.price} $</h3>
                    </div>
                    <AddShoppingCartIcon onClick={(e) => btnAdd2CartClick(e,item)} className={cx('icon-add')} />
                </div>
            </div>
        </div>
        // </Link>
    );
}

export default Card;
