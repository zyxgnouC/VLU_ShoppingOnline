import React from 'react';
import Menu from './MenuComponent';
// import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import AllProductComponent from './AllProductComponent';
import { Route, Routes, Navigate } from 'react-router-dom'
import ProductDetail from './ProductDetailComponent';
import Signup from './SignUpComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Footer from './FooterComponent';
import Mycart from './ShowCartComponent';
import Myorders from './MyOderComponent';
import ProfileForm from './ProfileForm';
import ChangePass from './ChangePasswordComponent';
import {  useLayoutEffect } from 'react';
import {useLocation} from 'react-router-dom';
// import '../../src/App.scss'
// class Main extends Component {
//   render() {
//     return (
//       <div className="body-customer">
//         <Menu />
//         {/* <Inform /> */}
//         <div className="body-component">
//           <Routes >
//             <Route path='/' element={<Navigate replace to='/home' />} />
//             <Route path='/home' element={<Home />} />
//             <Route path='/product/category/:cid' element={<Product />} />
//             <Route path='/products' element={<AllProductComponent />} />
//             <Route path='/product/search/:keyword' element={<Product />} />
//             <Route path='/product/:id' element={<ProductDetail />} />
//             <Route path='/signup' element={<Signup />} />
//             <Route path='/active' element={<Active />} />
//             <Route path='/login' element={<Login />} />
//             <Route path="myprofile" element={<Myprofile />} >
//               <Route path='' element={<ProfileForm />} />
//               <Route path="myorders" element={<Myorders />} />
//               <Route path="profile" element={<ProfileForm />} />
//               <Route path="changepass" element={<ChangePass />} />
//             </Route>
//             <Route path='/mycart' element={<Mycart />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     );
//   }
// }
// export default Main;
function Main() {

  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  } 
  return (  
    <div className="body-customer">
      <Wrapper>
        <Menu />
        {/* <Inform /> */}
        <div className="body-component">
          <Routes >
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/products/' element={<AllProductComponent />} />
            <Route path='/products/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/active' element={<Active />} />
            <Route path='/login' element={<Login />} />
            <Route path="myprofile" element={<Myprofile />} >
              <Route path='' element={<ProfileForm />} />
              <Route path='myorders/:cid' element={<Myorders />} />
              <Route path="profile/:id" element={<ProfileForm />} />
              <Route path="changepass" element={<ChangePass />} />
            </Route>
            <Route path='/mycart' element={<Mycart />} />
          </Routes>
        </div>
        <Footer />
        </Wrapper>
      </div>
  );
}

export default Main;