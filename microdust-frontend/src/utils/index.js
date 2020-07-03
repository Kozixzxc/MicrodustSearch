  // 시간별 평균값구하기. heroku에 업로드해서 해당코드는 지워도됨.
  export const getAverage = (arr, key) => {
    let result = arr.reduce((acc, cur) => {
      if (cur[key] === '-'){
        cur[key] = 0;
      }
      acc += cur[key]*1
      return acc
    }, 0)
    result = Math.floor(result/arr.length);
    return result
  }

  // 등급 구하기
  export const getPm25Grade = (value) => {
    if (value >= 0 && value <= 15){
      return '좋음'
    }else if (value >= 16 && value <= 35){
      return '보통'
    }else if (value >= 36 && value <= 75){
      return '나쁨'
    }else if (value >= 76){
      return '매우나쁨'
    }else if (value === "-" || value === "" || value === undefined){
      return '정보없음'
    }
  }
