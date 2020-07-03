import React, { Component } from 'react'
import styled from 'styled-components'
import { getPm25Grade } from '../utils';

const Container = styled.ul`
  display: flex;
  flex-direction: row-reverse;
  max-width: 100%;
  overflow:auto;
`
const Value = styled.li`
  width: 100%;
  padding: 0 2px;
  text-align: center;
`
const ValueTime = styled.h5`
  margin-bottom: 6px;
  color: #aaa;
  @media (max-width: 768px){
    font-size: 12px;
  }
`
const ValueBarBg = styled.div`
  width: 100%;
  height: 220px;
  background-color: #fafafa;
  border-radius: 5px 5px 0 0;
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1);
  position: relative;
  @media (max-width: 768px){
    height: 180px;
  }
`
const ValueBarFill = styled.div`
  width: 100%;
  height: ${props => props.val + '%'};
  max-height: 100%;
  min-height: 30px;
  background-color: ${
    props => {
      let grade = getPm25Grade(props.val);
      if (grade === '좋음'){
        return 'royalblue'
      }else if (grade === '보통'){
        return 'green'
      }else if (grade === '나쁨'){
        return 'orange'
      }else if (grade === '매우나쁨'){
        return 'red'
      }else if (grade === '정보없음'){
        return 'gray'
      }
    }
  };
  position: absolute;
  bottom: 0;
  border-radius: 3px 3px 0 0;
`
const ValueBarValue = styled.p`
  margin-top: 8px;
  color: #fff;
  @media (max-width: 768px){
    font-size: 12px;
  }
`
//substr 5부터시작해야함 안그럼 년도도나옴
class Chart extends Component {
  render() {
    return (
      <Container>
        {this.props.data.map((e,i) => {
          return (
            <Value key={i}>
              <ValueTime>{e['dataTime'].substr(5)}</ValueTime>
              <ValueBarBg>
                <ValueBarFill val={e[this.props.city]}>
                  <ValueBarValue>{e[this.props.city]}</ValueBarValue>
                </ValueBarFill>
              </ValueBarBg>
            </Value>
          )
        })}
      </Container>
    )
  }
}

export default Chart;