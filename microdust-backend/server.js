const express = require('express');
const request = require('request');
const cors = require('cors'); 

const app = express();
const portNum = 3000; // 톰캣이랑 포트번호 겹치면 실행안됌

const serviceKey = 'nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D'; // 나중에 분리해야함
const realtimeEndpoint = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'; //실시간
const dailyAndHourlyEndpoint = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst'; //일간,시간별

app.use(express.json());
app.use(cors());
app.listen(portNum, () => {
  console.log(`익스프레스 서버가 가동중입니다: ${portNum}`)
})

app.get('/realtime', (req, res) => { //실시간 가져오기

  request({
    url: `${realtimeEndpoint}?serviceKey=${serviceKey}&numOfRows=50&pageNo=1&sidoName=${encodeURI(req.query.city)}&ver=1.3&_returnType=json`,
    method: 'GET'
  }, (error, response, body) => {
    res.send(body);
  })
})

app.get('/hourly', (req, res) => { //시간별 정보 가져오기

  request({
    url: `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=12&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=WEEK&_returnType=json`,
    method: 'GET'
  }, (error, response, body) => {
    res.send(body)
  })
})

app.get('/daily', (req, res) => { //일간 정보 가져오기
    
  request({
    url: `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=7&pageNo=1&itemCode=PM10&dataGubun=DAILY&searchCondition=WEEK&_returnType=json`,
    method: 'GET'
  }, (error, response, body) => {
    res.send(body) //바로 프론트로 넘겨주기
  })
})

