import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Col, Row} from 'react-styled-flexboxgrid';
import { Normalize } from 'styled-normalize';


import Loading from './components/Loading_Bar'; // 컴포넌트 분류
import Menu from './components/Navi_Bar';
import Chart from './components/Microdust_Chart';

import { getPm25Grade } from './utils';

const cityList = [ // 소팅되면서 안 섞이게 리스트 분류
  {id: 'seoul', name: '서울'},
  {id: 'incheon', name: '인천'},
  {id: 'gyeonggi', name: '경기'},
  {id: 'gangwon', name: '강원'},
  {id: 'gwangju', name: '광주'},
  {id: 'daejeon', name: '대전'},
  {id: 'busan', name: '부산'},
  {id: 'daegu', name: '대구'},
  {id: 'ulsan', name: '울산'},
  {id: 'chungbuk', name: '충북'},
  {id: 'chungnam', name: '충남'},
  {id: 'jeonbuk', name: '전북'},
  {id: 'jeonnam', name: '전남'},
  {id: 'gyeongbuk', name: '경북'},
  {id: 'gyeongnam', name: '경남'},
  {id: 'jeju', name: '제주'},
  {id: 'sejong', name: '세종'}
]

// 모바일 스크롤바 안생기는 문제 있음. 9.22 오버플로우 지우고 스크롤바옵션 생성해서 해결

const Default = createGlobalStyle` 
  
  h1,h2,h3,h4,h5,h6{margin: 0; padding: 0;}
  p{margin: 0; padding:0;}

  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  body::-webkit-scrollbar {
    width: 2px;
  }
  .weak{font-weight: 100;}
  div{box-sizing: border-box}
`
//박스쉐도우 모바일기준 y값 수정해야함 리스트 삐져나옴. 상속으로 수정안되게 관리
export const Badge = styled.span`
  background-color: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'royalblue'}
      else if (grade === '보통'){return 'seagreen'}
      else if (grade === '나쁨'){return 'orange'}
      else if (grade === '매우나쁨'){return 'crimson'}
      else if (grade === '정보없음'){return 'gray'}
    }
  };
  border-radius: 4px;
  box-shadow: 4px 2px; 
  padding: 2px 10px;
  font-size: 14px;
  color: #D8D8D8;
`
// 배경 물결무늬로 변하게 keyframes 수정 컨테이너 컴포넌트로 구현

const Container = styled.div` 
  display: flex;
  background: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'linear-gradient(300deg, royalblue, skyblue)'}
      else if (grade === '보통'){return 'linear-gradient(300deg, seagreen, limegreen)'}
      else if (grade === '나쁨'){return 'linear-gradient(300deg, orange, khaki)'}
      else if (grade === '매우나쁨'){return 'linear-gradient(300deg, tomato, crimson)'}
      else if (grade === '정보없음'){return 'linear-gradient(300deg, gray, black)'}
    }
  };

  background-size: 400% 400%;
  -webkit-animation: animatedGradient 10s ease infinite;
  -moz-animation: animatedGradient 10s ease infinite;
  animation: animatedGradient 10s ease infinite;

  @-webkit-keyframes animatedGradient {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
  @-moz-keyframes animatedGradient {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
  @keyframes animatedGradient { 
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
`
//모바일대응 미디어쿼리 수정
const Content = styled.div`
  
  max-width: 1920px;
  width: 100%;
  padding: 30px 40px 180px;
  margin: auto;
  position: relative;

  @media (max-width: 768px){
    margin: 0;
    padding: 20px 20px 180px;
  }
`
//모바일대응 fixed로 교체 
const ContentBg = styled.div`
  width: 100%;
  background-image: url('/images/city.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  @media{
    background-attachment: fixed;
  }
`
const ContentTitle = styled.h1`
  letter-spacing: -7px;
  font-size: 5em;
  color: #000;
  @media (max-width: 768px){
    font-size: 2.3em;
    letter-spacing: -3px;
  }
`
//카드 디자인
const Card = styled.div`
  background-color: rgba(255,255,255,1);
  border-radius: 12px;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.2);
  padding: 20px;
  margin-top: 20px;
  & img{
    max-width: 100%;
    height: auto;
    position: relative;
    padding: 3px;
  }

  @media (max-width:768px) {
  & img{
    max-width: 100%;
    padding:2px;
  }    
`
const CardTitle = styled.h2`
  margin-bottom: 20px;
  color: #444;
  @media (max-width: 768px){
    font-size: 20px;
  }
`
//카드에 들어갈 테이블이랑 카드타이틀 디자인
const TableWrapper = styled.div`
  max-height: 600px;
  overflow: auto;
`
const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`
const TableRow = styled.tr`
  & td, th{
    padding: 8px 4px;
    border-top: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }
`
//네비게이션바 버튼디자인

const Button = styled.button`
  width: auto;
  padding: 12px 20px;
  background-color: #fff;
  border: 0;
  border-radius: 5px 0 0 5px;
  position: absolute;
  top: 30px;
  right : 0px;
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
  cursor: pointer;
  font-weight: 800;
  color: #444;
  transition: padding-right 0.2s ease;
  &:hover{
    padding-right: 30px;
  }
  &>span{
    display: inline-block;
    vertical-align: middle;
  }
  &>img{
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 4px;
  }
  @media (max-width: 768px){
    top: 10px;
    padding: 8px 16px;
    font-size: 12px;
  }
`
//초기설정 서울로 교수님 피드백하시면 충북으로 변경
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fetchInProgress: true,
      menuIsOpen: false,
      selectedCityId: 'seoul',
      selectedCityName: '서울',
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

    
  //앱 구동시 로딩바와 리얼타임기준 도시평균 상태값 가져오기
  fetchRealtimeDatasToState = (cityName) => {
    fetch(`https://miseoneclick.herokuapp.com/realtime?city=${encodeURI(cityName)}`)
    .then(res => res.json())
    .then(json => {
      this.setState({realtimeData: json['list']})
      this.setState({fetchInProgress: false})
    })
  }
  
  // 앱 구동시 차트 초기값 : heroku에서 크롤링해오기 ddos방지용 heroku서버 문제생기면 로컬에서 서버열고 3000으로 호출
  
  /*
      fetch(`http://localhost:3000/hourly`)
      .then(json => {
      this.setState({hourlyData: json['list']});
    })
  */
  
  componentDidMount(){
    this.fetchRealtimeDatasToState(this.state.selectedCityName);

    fetch(`https://miseoneclick.herokuapp.com/hourly`)
    .then(res => res.json())
    .then(json => this.setState({hourlyData: json['list']}))
    
    fetch(`https://miseoneclick.herokuapp.com/daily`)
    .then(res => res.json())
    .then(json => this.setState({dailyData: json['list']}))
  }

// 가져올 도시미세먼지 데이터가 많으니 getCityData함수 제작하여 인수 2개 정해놓고 data랑 id값이랑 같을때 해당 값 뱉게 설정

/*

getcitydata = (hourlydata, cityid) =>{
    for(let key in hourlydata){
        if(key==cityid){
          return hourlydata[key]
    }
}

*/

  getCityData = (obj, value) => { 
    for (let key in obj){
      if (key === value){
        return obj[key]
      }
    }
  }

  //city리스트 가져오기. 50개까지밖에 못가져옴 더 많은 측정소가 있으면 json페이지 수정해서 상한 올려받기
  getCityDataList = () => {
    const cityData = cityList.reduce((acc, cur) => { // 누적 최대 50으로 설정해놨음,현재
      acc.push({ 
        ...cur, 
        pm25: this.getCityData(this.state.hourlyData[0], cur.id)
      }) // 리스트에 있는거 다 넣을때까지 지속적으로 return , push
      return acc;
    }, [])
    return cityData;
  }
  
  // 클릭시 메인페이지 변경 id값 기반으로 state값 전부 바꿔주기
  handleClick = (id, name) => {
    this.setState({
      fetchInProgress: true,
      selectedCityId: id,
      selectedCityName: name
    });
    this.fetchRealtimeDatasToState(name);
  }
  
  
  /*<RealTime data={this.state.realtimeData} cityName={this.state.selectedCityName}></RealTime> 아래로 변경*/
  render() {
    return (
      <div className="App">
        <Normalize/>
        <Default/>
        {this.state.fetchInProgress ? <Loading/> : ''}
        <Container grade={getPm25Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}>
          <Menu
            onCloseMenu={() => this.setState({menuIsOpen: false})}
            open={this.state.menuIsOpen}
            data={this.getCityDataList()}
            onClickCity={this.handleClick}></Menu> 
          <ContentBg>
            <Content>
              <ContentTitle>
                <p>
                  <span className="weak">현재 </span>
                  {this.state.selectedCityName}
                  <span className="weak">의 </span>
                
                
                  미세먼지
                  <span className="weak"> 농도는</span>
                </p>
                <p>
                  "{getPm25Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}" <span className="weak">상태입니다.</span>
                </p>
              </ContentTitle>
              <p style={{color: '#000', fontSize: '16px', marginTop: '14px'}}>
                ({this.state.hourlyData[0] ? this.state.hourlyData[0].dataTime : '0000-00-00 00:00'} 최종측정시간, {this.state.selectedCityName} 측정소 평균값입니다.)
              </p>
              <Row>
                <Col md={7} xs={12}>
                  <Card>
                    <CardTitle>시간별 미세먼지 수치</CardTitle>
                    <Chart
                      data={this.state.hourlyData}
                      city={this.state.selectedCityId}></Chart>
                  </Card>
                  <Card>
                    <CardTitle>일간 미세먼지 수치</CardTitle>
                    <Chart
                      data={this.state.dailyData}
                      city={this.state.selectedCityId}></Chart>
                  </Card>
                  <Card>
                        <img src="/images/grade.png" alt="Grade Graph"></img>
                  </Card>
                        
                </Col>
                <Col md={5} xs={12}>
                  <Card>
                    <CardTitle>측정소별 미세먼지 수치</CardTitle>
                    <TableWrapper>
                      <Table>
                        <tbody>
                        <TableRow>
                          <th>측정소</th>
                          <th>농도</th>
                          <th>등급</th>
                        </TableRow>
                      {this.state.realtimeData.map((e, i) => {
                        return (
                          <TableRow key={i}>
                            <td>{e.stationName}</td>
                            <td>{e.pm25Value}</td>
                            <td>
                              <Badge grade={getPm25Grade(e.pm25Value)}>{getPm25Grade(e.pm25Value)}</Badge>
                            </td>
                          </TableRow>
                        )
                      })}</tbody></Table>
                    </TableWrapper>
                  </Card>

                 <Card>
                    <CardTitle>행동강령 확인</CardTitle>
                    <td><a href="/images/mise.png" download="환경부 행동강령">환경부 행동강령 다운로드 링크</a></td> 
                    <TableWrapper>
                    </TableWrapper>
                  </Card>
                </Col>
              </Row>
            </Content>
          </ContentBg>
          <Button onClick={() => this.setState({menuIsOpen: !this.state.menuIsOpen})}>
            <img src="images/menu.svg" alt="left arrow"></img><span> 다른 지역 확인</span>
          </Button>
        </Container>
        
      </div>
    );
  }
}

export default App;
