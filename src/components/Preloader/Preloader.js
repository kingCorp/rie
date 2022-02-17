import React, { Component } from 'react';
import './Preloader.css';

class Preloader extends Component {
  preloader() {
    let preload = document.querySelector('.preloader');
    setTimeout(() => {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      preload.style.opacity = '0';
      setTimeout(() => {
        //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        preload.style.display = 'none';
      }, 1000);
    }, 3000);
  }

  componentDidMount() {
    this.preloader();
  }

  render() {
    return (
      <div className="preloader">
        <div className="spinner_wrap">
          <div className="spinner" />
        </div>
      </div>
    );
  }
}

export default Preloader;
