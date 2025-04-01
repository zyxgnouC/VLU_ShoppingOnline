// import axios from 'axios';
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import withRouter from '../ultils/withRouter';
import classNames from "classnames/bind";
import styles from '../scss/Menu.module.scss'
import { Link } from 'react-router-dom'
import Cart from './Cart';
import MyContext from '../contexts/MyContext';
import img from '../img/logo.png'


function Navbar() {
    const Context = useContext(MyContext);
    // console.log(Context)
    const navigate = useNavigate();
    const cx = classNames.bind(styles)
    const [open, setOpen] = useState(false)
    const [txtKeyword, setTxtKeyword] = useState('')

    const HandleCart = () => {
        setOpen(!open)
  
    }


    const HandleHome = () => {

        setOpen(false)
    }


    // console.log(Context.customer._id)
    const btnSearchClick = (e) => {
        e.preventDefault();
        if (txtKeyword !== '') {
            navigate('/products/search/' + txtKeyword);
        }
    }
    return (
        <div className={cx('Navbar')}>
            <div className='container'>
                <div className={cx('Wrapper')}>
                    <div className={cx('Wrapper-top')}>
                        <div className={cx('left')}>
                            <div className={cx('item')}>
                                <PaidOutlinedIcon className={cx('icon')}/>
                                <span>1 USD = 25,880 VNĐ</span>
                               
                            </div>  
                        </div>
                        <div className={cx('right')}>
                            {Context.token === ""
                                ? (
                                    <div className={cx('user-bar')}>
                                        {/* <LockPersonOutlinedIcon className={cx('user-icon')} onClick={() => HandleUser()} /> */}

                                        <div><Link to="/login" onClick={() => {setOpen(false)}}><p>Đăng Nhập</p></Link></div> /
                                        <div><Link to="/signup" onClick={() => {setOpen(false)}}><p> Đăng Kí</p></Link></div> /  
                                        <div><Link to="/active" onClick={() => {setOpen(false)}}><p>Active</p></Link></div> 

                                    </div>
                                )
                                : (
                                    <div  onClick={() => {setOpen(false)}} className={cx('user-bar')}>
                                        <Link to={'/myprofile/profile/' + Context.customer._id}><AccountCircleOutlinedIcon className={cx('user-icon')} /></Link>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className={cx('Wrapper-bottom')}>
                        <div className={cx('logo')}>
                            <Link className={cx('link')} onClick={() => HandleHome()} to="/home">
                                <img src={img} alt="" />
                                <HomeRoundedIcon className={cx('logo-icon')}/>
                            </Link>
                        </div>
                        <div className={cx('search-bar')}>
                            <input type="text" placeholder="Tìm kiếm..." value={txtKeyword} onChange={(e) => setTxtKeyword(e.target.value)} />
                            <SearchIcon className={cx('icon')} onClick={(e) => btnSearchClick(e)} />
                        </div>
                        <div className={cx('cart-icon')} >
                            {/* <Link to='/mycart' ><ShoppingCartOutlinedIcon/>  </Link>  */}
                            <div>
                                <p>{Context.mycart.length}</p>
                                <ShoppingCartOutlinedIcon onClick={() => HandleCart()} />
                            </div>
                            <div className={cx(open ? 'show' : 'hide')}><Cart handleCart={() => HandleCart()} /></div>
                        </div>
                        
                    </div>

                </div>

                
            </div>

        </div>
    );

}

export default withRouter(Navbar);