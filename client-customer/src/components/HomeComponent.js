import React from 'react';
import HotProducts from './Home/HotProducts'
import NewProducts from './Home/NewProducts'
import PicCategories from './Home/PictureCategoryComponent';
import Slide from './Home/Slide/Slide';
import SlideCate from './Home/Slide/SlideCategory';
import NewThings from './Home/NewThingsComponent';
import Delivery from './Home/DeliveryComponent';
import img from './Home/img/pic9.png'
// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       newprods: [],
//       hotprods: []
//     };
//   }
//   render() {
//     return (
//       <div className='Home'>
//         <HotProducts type = 'Hot'/>
//         <NewProducts type = 'New' />  
//       </div>
//     );
//   }

// }
// export default Home;
function Home() {
  return (
    <div className='Home'>
      <div className='container'>
        <div className='HomeDIV'>
          <Slide/>
          <SlideCate/>
          <NewThings/>
          <HotProducts type='Hot' />
          <PicCategories />
          <img src={img} alt="" className='img-home' />
          <NewProducts type='New' />
          <Delivery/>
        </div>
      </div>
    </div>
  );
}

export default Home;