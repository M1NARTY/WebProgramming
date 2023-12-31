document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('weatherbtn').addEventListener('click', function() {
        var decodeServiceKey = "uMWxS7S9K+DsrHUz1n0Gvi7Fr77qzL8tSY7Rh+nPNbqtrULSZsnUU79wY9OlqmVCyb2VIpvXAzH04UOX+KGc4g==";
        var encodeServiceKey = encodeURIComponent(decodeServiceKey);

        var currentDate = new Date();
        var previousDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        previousDate.setDate(currentDate.getDate() - 1);
        var formattedCurrentDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
        var formattedPreviousDate = previousDate.toISOString().slice(0, 10).replace(/-/g, '');

        var url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList';

        var queryParams = '?' + encodeURIComponent('serviceKey')+ '=' + encodeURIComponent(decodeServiceKey);
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS');
        queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('DAY');
        queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent(formattedCurrentDate);
        queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent(formattedCurrentDate);
        queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108');

        var weatherInfolocation = '';
        var weatherInfoMinTemperature = '';
        var weatherInfoAvgTemperature = '';
        var weatherInfoMaxTemperature = '';

        fetch(url + queryParams)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류! 상태: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                var items = data.response.body.items;

                if(!items) {
                    throw new Error('API 응답 데이터에서 "items"를 찾을 수 없습니다.');
                }

                if(Array.isArray(items)) {
                    items.forEach(item => {
                        var location = item.stnNm || '데이터 없음';
                        var minTemperature = item.minTa || '데이터 없음';
                        var avgTemperature = item.avgTa || '데이터 없음';
                        var maxTemperature = item.maxTa || '데이터 없음';

                        weatherInfolocation += `<p>${location}</p>`
                        weatherInfoMinTemperature += `<p>${minTemperature}</p>`
                        weatherInfoAvgTemperature += `<p>${avgTemperature}</p>`
                        weatherInfoMaxTemperature += `<p>${maxTemperature}</p>`
                    });
                } else if(Array.isArray(items.item)) {
                    items.item.forEach(item => {
                        var location = item.stnNm || '데이터 없음';
                        var minTemperature = item.minTa || '데이터 없음';
                        var avgTemperature = item.avgTa || '데이터 없음';
                        var maxTemperature = item.maxTa || '데이터 없음';

                        weatherInfolocation += `<p>${location}</p>`
                        weatherInfoMinTemperature += `<p>${minTemperature}</p>`
                        weatherInfoAvgTemperature += `<p>${avgTemperature}</p>`
                        weatherInfoMaxTemperature += `<p>${maxTemperature}</p>`
                    });
                } else {
                    throw new Error('API 응답 데이터에서 "items" 또는 "items.item"을 찾을 수 없습니다.');
                }

                document.querySelector('#location').innerHTML = weatherInfolocation;
                document.querySelector('#minTemp').innerHTML = weatherInfoMinTemperature;
                document.querySelector('#avgTemp').innerHTML = weatherInfoAvgTemperature;
                document.querySelector('#maxTemp').innerHTML = weatherInfoMaxTemperature;
            })
            .catch(error => {
                console.error('API 요청 오류:', error);
            });
    });
});
