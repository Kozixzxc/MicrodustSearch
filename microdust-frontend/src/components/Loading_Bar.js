import React, { Component } from 'react';
import styled from 'styled-components';

const LoadingBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  z-index: 4;
`
const LoadingImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
class Loading extends Component {
  render() {
    return (
      <LoadingBg display={this.props.display}>
        <LoadingImage src="images/loading.svg"></LoadingImage>
      </LoadingBg>
    );
  }
}

export default Loading;
