document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        var url = 'https://api.sunrise-sunset.org/json';

        var queryParams = '?' + encodeURIComponent('lat') + '=' + encodeURIComponent('37.291111');
        queryParams += '&' + encodeURIComponent('lng') + '=' + encodeURIComponent('127.008888');
        queryParams += '&' + encodeURIComponent('tzld') + '=' + encodeURIComponent('Asia/Seoul');

        fetch(url + queryParams)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            var sunriseTime = '';
            var sunsetTime = '';

            var results = data.results;

            if (!results) {
                throw new Error('API 응답 데이터에서 "results"를 찾을 수 없습니다.');
            }

            if (Array.isArray(results)) {
                results.forEach(result => {
                    var sunrise = result.sunrise || '데이터 없음';
                    var sunset = result.sunset || '데이터 없음';

                    sunriseTime += `<p>${riseTime}</p>`;
                    sunsetTime += `<p>${setTime}</p>`;
                });
            }
            document.querySelector('#riseTime').innerHTML = sunriseTime;
            document.querySelector('#setTime').innerHTML = sunsetTime;
        })
        .catch(error => {
            console.error('API 요청 오류:', error);
        });
    });
});