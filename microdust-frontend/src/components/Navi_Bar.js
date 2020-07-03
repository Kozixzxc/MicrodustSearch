import React, { Component } from 'react';
import styled from 'styled-components';
import { getPm25Grade } from '../utils';
import { Badge } from '../App';

const MenuCover = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 5;
  display: ${props => props.open ? 'block' : 'none'};
`
const MenuList = styled.ul`
  position: fixed;
  height: 100%;
  top: 0;
  right: ${props => props.open ? '0px' : '-220px'};
  overflow: auto;
  min-width: 180px;
  z-index: 6;
  background-color: #fff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.4);
  transition: right 0.4s ease;
`
const MenuItem = styled.li`
  padding: 15px 10px 15px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`
const MenuItemTitle = styled.h4`
  font-size: 2em;
  font-weight: 100;
  margin: 0;
  padding: 0;
`
const MenuItemContent = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #ddd;
`
const MenuItemValue = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`

//메뉴컴포넌트 props 무변동 키값 전달
class Menu extends Component {
  render() {
    return (
      <div>
        <MenuList open={this.props.open}> 
          {this.props.data.map((e, i) => {
            return (
              <MenuItem key={i} onClick={() => this.props.onClickCity(e.id, e.name)}> 
                
                
                <MenuItemTitle>{e.name}</MenuItemTitle>
                <MenuItemContent> 
                  <MenuItemValue>{e.pm25}㎍/m³</MenuItemValue>
                  <Badge grade={getPm25Grade(e.pm25)}>{getPm25Grade(e.pm25)}</Badge>
                </MenuItemContent>
              </MenuItem>
            )
          })}
        </MenuList>
        <MenuCover open={this.props.open} onClick={this.props.onCloseMenu}></MenuCover> 
      </div>
    );
  }
}

export default Menu;