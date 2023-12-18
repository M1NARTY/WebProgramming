// 현재 날짜를 가져오기
var currentDate = new Date();

// 시작일을 설정
var startYear = currentDate.getFullYear();
var startMonth = currentDate.getMonth() + 1;
var startDay = currentDate.getDate();

// 날짜를 'YYYYMMDD' 형식으로 변환
var formattedStartDate = startYear + ('0' + startMonth).slice(-2) + ('0' + startDay).slice(-2);

var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'; /* API 주소 */
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'esnNCY8czIqg29%2B2DGWoL23j6S6lPeksAYkmAhGYNz5qO%2ByYA3del96AXGjWtfWbuoq9t0KWh9L8frX8CyumaQ%3D%3D'; /* 서비스 키 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS'); /**/
queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('DAY'); /**/
queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent('formattedStartDate'); /**/
queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent('formattedStartDate'); /**/
queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108'); /**/

fetch(url + queryParams)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return response.json(); // JSON 형식으로 파싱
    })
    .then(data => {
        // JSON에서 필요한 정보 추출
        var items = data.response.body.items.item;

        if (!items || !Array.isArray(items.item)) {
            throw new Error('API 응답 데이터에서 "items.item"을 찾을 수 없습니다.');
        }
        
        var weatherInfoHTML = '';

        items.forEach(item => {
            var region = item.stnNm || 'N/A';
            var minTemperature = item.minTa || 'N/A';
            var averageTemperature = item.avgTa || 'N/A';
            var maxTemperature = item.maxTa || 'N/A';

            weatherInfoHTML += `<p>지역: ${region}</p>
                                <p>최저 기온: ${minTemperature}°C</p>
                                <p>평균 기온: ${averageTemperature}°C</p>
                                <p>최고 기온: ${maxTemperature}°C</p>`;
        });

        // HTML 페이지에 동적으로 추가
        document.getElementById('weather-info').innerHTML = weatherInfoHTML;
    })
    .catch(error => {
        console.error('Fetch 오류:', error);
    });