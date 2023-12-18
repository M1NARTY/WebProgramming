var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'; /* API 주소 */
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'esnNCY8czIqg29+2DGWoL23j6S6lPeksAYkmAhGYNz5qO+yYA3del96AXGjWtfWbuoq9t0KWh9L8frX8CyumaQ=='; /* 서비스 키 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /**/
queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS'); /**/
queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('DAY'); /**/
queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent('20100101'); /**/
queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent('20100601'); /**/
queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108'); /**/

fetch(url + queryParams)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return response.text(); // 또는 response.json()을 사용하면 됩니다. 데이터 형식에 따라 선택
    })
    .then(data => {
        // 받은 데이터를 XML로 파싱
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");

        // XML에서 필요한 정보 추출
        var items = xmlDoc.getElementsByTagName('item');
        var weatherInfoHTML = '';

        for (var i = 0; i < items.length; i++) {
            var region = items[i].getElementsByTagName('stnNm').item(0).textContent;
            var minTemperature = items[i].getElementsByTagName('taMin').item(0).textContent;
            var currentTemperature = items[i].getElementsByTagName('ta').item(0).textContent;
            var maxTemperature = items[i].getElementsByTagName('taMax').item(0).textContent;

            weatherInfoHTML += `<p>Region: ${region}</p>
                                <p>Min Temperature: ${minTemperature}°C</p>
                                <p>Current Temperature: ${currentTemperature}°C</p>
                                <p>Max Temperature: ${maxTemperature}°C</p>`;
        }

        // HTML 페이지에 동적으로 추가
        document.getElementById('weather-info').innerHTML = weatherInfoHTML;
    })
    .catch(error => {
        console.error('Fetch 오류:', error);
    });

    var items = xmlDoc.getElementsByTagName('item');
console.log('Items:', items);

for (var i = 0; i < items.length; i++) {
    var regionElement = items[i].getElementsByTagName('stnNm').item(0);
    console.log('Region Element:', regionElement);

    // 다른 코드...
}