import React from "react";
import { useContext } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from '../scss/Cart.module.scss'

import MyContext from '../contexts/MyContext';

import { Link } from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CartUtil from '../ultils/CartUtil';
import 'react-toastify/dist/ReactToastify.css';

import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
function Cart(prop) {
    const Context = useContext(MyContext);
    const Cart = Context.mycart

    // console.log('cart', Cart)

    const cx = classNames.bind(styles)
    const [quantitya, setQuantitya] = useState(null)
    const handleCartChild = () => {
        prop.handleCart();
    };
    const lnkRemoveClick = (id) => {
        const mycart = Context.mycart;
        const index = mycart.findIndex(x => x.product._id === id);
        if (index !== -1) { // found, remove item
            mycart.splice(index, 1);
            Context.SetnotifySuccess('xóa sản phẩm thành công')
            Context.setMycart(mycart);
        }
    };
    const lnkRemoveAll = () => {
        Context.setMycart([]);
        Context.SetnotifySuccess('xóa tất cả sản phẩm thành công')
    };

    const handleQuantityPlus = (id, quantity) => {
        // console.log(id)
        Cart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                item.quantity += 1
            }
        })
    }
    const handleQuantityMinus = (id, quantity) => {
        // console.log(id)
        Cart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                if (quantity > 1) {
                    item.quantity -= 1
                }
            }
        })
    }

    return (
        <div className={cx('cart')}> {!Cart.length ? <div className={cx('null')} ><div>Not have any thing in your cart</div></div> : (
            <>
                <div className={cx('title')}>
                    <h1>Products in your cart</h1>
                    <span onClick={() => lnkRemoveAll()} >< DeleteSweepOutlinedIcon className={cx('reset')} /></span>
                </div>
                <div className={cx('listproduct')}>
                    {Cart.map(item => {
                        return (
                            <div className={cx('item')} key={item.product._id}>
                                <div className={cx('content-img')}>
                                    <img src={"data:image/jpg;base64," + item.product.image} key={item.product._id} alt="" />
                                </div>
                                <div className={cx('item-content')}>
                                    <div className={cx('details')}>
                                        <h1>{item.product.name}</h1>
                                        {/* <p>{item.product.category.name}</p> */}
                                        <div>{item.product.price}$</div>
                                    </div>
                                    <div className={cx('quantity')}>
                                        <button className={cx(item.quantity <= 1 ? 'none' : '')} onClick={(e) => {
                                            handleQuantityMinus(item.product._id, item.quantity)
                                            setQuantitya(item.quantity)
                                        }}>-</button>
                                        <div className={cx('price')}>{item.quantity} </div>
                                        <button onClick={(e) => {
                                            handleQuantityPlus(item.product._id, item.quantity)
                                            setQuantitya(item.quantity)
                                        }}>+</button>
                                    </div>
                                </div>

                                <div className={cx('delete-button')}>
                                    <ClearOutlinedIcon className={cx('delete')} onClick={() => lnkRemoveClick(item.product._id)} />

                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className={cx('footerCart')}>
                    <div className={cx('totalss')}>
                        <span>SUBTOTAL :</span>
                        <span>$ {CartUtil.getTotal(Context.mycart)} </span>
                    </div>
                    <button><Link to='/mycart' onClick={() => handleCartChild()} >To checkout</Link></button>
                </div>

            </>)}

        </div>
    );

}

export default Cart;
