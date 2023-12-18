document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('weatherbtn').addEventListener('click', function() {
        var currentDate = new Date();
        var startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 1);
        var formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
        var formattedEndDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

        var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList';
        var queryParams = '?' + encodeURIComponent('serviceKey') + 'esnNCY8czIqg29%2B2DGWoL23j6S6lPeksAYkmAhGYNz5qO%2ByYA3del96AXGjWtfWbuoq9t0KWh9L8frX8CyumaQ%3D%3D';
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

                document.querySelector('.temper').innerHTML = weatherInfoHTML;
            })
            .catch(error => {
                console.error('API 요청 오류:', error);
            });
    });
});
