var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'; /* API 주소 */
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'esnNCY8czIqg29%2B2DGWoL23j6S6lPeksAYkmAhGYNz5qO%2ByYA3del96AXGjWtfWbuoq9t0KWh9L8frX8CyumaQ%3D%3D'; /* 서비스 키 */
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

        // XML 데이터를 문자열로 변환
        var xmlString = new XMLSerializer().serializeToString(xmlDoc);

        // XML 데이터를 파일로 저장
        var blob = new Blob([xmlString], { type: 'application/xml' });
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'weather_data.xml';
        a.click();
    })
    .catch(error => {
        console.error('Fetch 오류:', error);
    });
