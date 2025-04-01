import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';


class Home extends Component {

  static contextType = MyContext;
  render() {

    return (
      <div className="align-center">
        <h2 className="text-center">ADMIN HOME</h2>
        {/* <img src="http://cliparting.com/wp-content/uploads/2018/03/animated-emoticons-2018-13.gif" width="800px" height="600px" alt="" /> */}
      </div>
    );
  }
}
export default Home;