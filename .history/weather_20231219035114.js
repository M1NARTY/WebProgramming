// // 현재 날짜를 가져오기
// var currentDate = new Date();

// // 시작일을 설정 (현재 시각의 하루 전으로 설정)
// var startDate = new Date(currentDate);
// startDate.setDate(currentDate.getDate() - 1);

// // 시작일을 'YYYYMMDD' 형식으로 변환
// var formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');

// // 현재 날짜를 'YYYYMMDD' 형식으로 변환
// var formattedEndDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

// var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'; /* API 주소 */
// var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'esnNCY8czIqg29%2B2DGWoL23j6S6lPeksAYkmAhGYNz5qO%2ByYA3del96AXGjWtfWbuoq9t0KWh9L8frX8CyumaQ%3D%3D'; /* 서비스 키 */
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
// queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
// queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS'); /**/
// queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('DAY'); /**/
// queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent('formattedStartDate'); /**/
// queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent('formattedEndDate'); /**/
// queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108'); /**/

// fetch(url + queryParams)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP 오류! 상태: ${response.status}`);
//         }
//         return response.json(); // JSON 형식으로 파싱
//     })
//     .then(data => {
//         // JSON에서 필요한 정보 추출
//         var items = data.response.body.items.item;
//         var weatherInfoHTML = '';

//         items.forEach(item => {
//             var region = item.stnNm || 'N/A';
//             var minTemperature = item.minTa || 'N/A';
//             var averageTemperature = item.avgTa || 'N/A';
//             var maxTemperature = item.maxTa || 'N/A';

//             weatherInfoHTML += `<p>지역: ${region}</p>
//                                 <p>최저 기온: ${minTemperature}°C</p>
//                                 <p>평균 기온: ${averageTemperature}°C</p>
//                                 <p>최고 기온: ${maxTemperature}°C</p>`;
//         });

//         // HTML 페이지에 동적으로 추가
//         document.getElementById('weather-info').innerHTML = weatherInfoHTML;
//     })
//     .catch(error => {
//         console.error('Fetch 오류:', error);
//     });

document.addEventListener('DOMContentLoaded', function() {
    var weatherBtn = document.getElementById('weatherbtn');
    var temperElement = document.querySelector('.temper');
    var placeElement = document.querySelector('.place');
    var describeElement = document.querySelector('.describe');

    weatherBtn.addEventListener('click', function() {
        var currentDate = new Date();
        var startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 1);
        var formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
        var formattedEndDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

        var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList';
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=서비스키';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS');
        queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('DAY');
        queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent(formattedStartDate);
        queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent(formattedEndDate);
        queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108');

        var weatherInfoHTML = '';

        fetch(url + queryParams)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                var items = data.response.body.items;

                if (!items) {
                    throw new Error('API 응답 데이터에서 "items"를 찾을 수 없습니다.');
                }

                if (Array.isArray(items)) {
                    items.forEach(item => {
                        var location = item.stnNm || '데이터 없음';
                        var minTemperature = item.minTa || '데이터 없음';
                        var avgTemperature = item.avgTa || '데이터 없음';
                        var maxTemperature = item.maxTa || '데이터 없음';

                        weatherInfoHTML += `<p>Location: ${location}</p>
                                            <p>Min Temperature: ${minTemperature}°C</p>
                                            <p>Average Temperature: ${avgTemperature}°C</p>
                                            <p>Max Temperature: ${maxTemperature}°C</p>
                                            <hr>`;
                    });
                } else if (Array.isArray(items.item)) {
                    items.item.forEach(item => {
                        var location = item.stnNm || '데이터 없음';
                        var minTemperature = item.minTa || '데이터 없음';
                        var avgTemperature = item.avgTa || '데이터 없음';
                        var maxTemperature = item.maxTa || '데이터 없음';

                        weatherInfoHTML += `<p>Location: ${location}</p>
                                            <p>Min Temperature: ${minTemperature}°C</p>
                                            <p>Average Temperature: ${avgTemperature}°C</p>
                                            <p>Max Temperature: ${maxTemperature}°C</p>
                                            <hr>`;
                    });
                } else {
                    throw new Error('API 응답 데이터에서 "items" 또는 "items.item"을 찾을 수 없습니다.');
                }

                temperElement.textContent = weatherInfoHTML;
            })
            .catch(error => {
                console.error('API 요청 오류:', error);
            });
    });
});
