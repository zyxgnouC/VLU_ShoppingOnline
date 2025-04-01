import React, {  useState } from 'react';
//import MyContext from '../contexts/MyContext';
import classNames from 'classnames/bind'
import styles from './scss/MenuComponent.module.scss'
import { AiFillHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdStoreMallDirectory } from 'react-icons/md';
import { MdHistoryEdu } from 'react-icons/md';
import { CgUserList } from 'react-icons/cg';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link,NavLink } from 'react-router-dom';

function Menu() {
  const cx = classNames.bind(styles)
  const [show, setShow] = useState(false)
  const [routate, setRoutate] = useState(true)
  const [active, setActive] = useState(0)
  const change = () => {
    setShow(!show)
    setRoutate(!routate)
  }
  const change2 = () => {
    setShow(false)
    // setRoutate(!routate)
  }
  return (
    <div className={cx(show ? 'HomeNavbar' : 'hide')}>
        <div className={cx('button-show')}>
          <BsArrowRightShort className={cx(routate ? 'show-icon' : 'routate')} onClick={() => change()} />
        </div>
        <div className={cx('Top')}>
  
          <div className={cx('NavbarMenu')}>
            <ul className={cx('NavbarMenu-ul')}>
  
              <li className={cx('NavbarMenu-li')} onClick={() => change2()}>
                <NavLink  to='/admin/home'  >
                  <div><AiFillHome className={cx('icon')} /></div>
                  <p>Home</p>
                </NavLink>
              </li>
              <li className={cx('NavbarMenu-li')} onClick={() => change2()}>
                <NavLink  to='/admin/category'  >
                  <div><BiCategory className={cx('icon')} /></div>
                  <p>Category</p>
                </NavLink>
              </li>
              <li className={cx('NavbarMenu-li')} onClick={() => change2()} >
                <NavLink  to='/admin/product' >
                  <div><MdStoreMallDirectory className={cx('icon')} /></div>
                  <p>Product</p>
                </NavLink>
              </li>
              <li className={cx('NavbarMenu-li')} onClick={() => change2()} >
                <NavLink  to='/admin/order' >
                  <div><MdHistoryEdu className={cx('icon')} /></div>
                  <p>Order</p>
                </NavLink>
                
              </li>
              <li className={cx('NavbarMenu-li')} onClick={() => change2()}>
                <NavLink  to='/admin/customer' >
                  <div><CgUserList className={cx('icon')} /></div>
                  <p>Customer</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      
    </div>
  );
}

export default Menu;





//   render() {
//     const pro = useContext(MyProvider)
//     const cx = classNames.bind(styles)

//     console.log(pro)
//     return (
//       <div className={cx('HomeNavbar')}>

//         <div className={cx('Top')}>
//           <div className={cx('button-show')}>
//             <BiRightArrowAlt className={cx('show-icon')}/>
//           </div>
//           <div className={cx('NavbarMenu')}>
//             <ul className={cx('NavbarMenu-ul')}>

//               <li className={cx('NavbarMenu-li')}>
//                 <AiFillHome />
//                 <a to="#/">Home</a></li>
//               <li className={cx('NavbarMenu-li')}>
//                 <BiCategory />
//                 <a to="#/">Category</a>
//               </li>
//               <li className={cx('NavbarMenu-li')}>
//                 <MdStoreMallDirectory />
//                 <a to="#/">Product</a>
//               </li>
//               <li className={cx('NavbarMenu-li')}>
//                 <MdHistoryEdu />
//                 <a to="#/">Order</a>
//               </li>
//               <li className={cx('NavbarMenu-li')}>
//                 <CgUserList />
//                 <a to="#/">Customer</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//       </div>
//     );
//   }

//   setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }
//   // event-handlers
//   lnkLogoutClick() {
//     this.context.setToken('');
//     this.context.setUsername('');
//     this.setCookie('token', "", 0)
//   }
// }
// export default Menu;