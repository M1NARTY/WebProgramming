document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        var url = 'https://api.sunrise-sunset.org/json?lat=37.291111&lng=127.008888&tzld=Asia/Seoul';

        fetch(url)
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
            var sunrise = results.sunrise || '데이터 없음';
            var sunset = results.sunset || '데이터 없음';
            
            sunriseTime += `<p>${sunrise}</p>`;
            sunsetTime += `<p>${sunset}</p>`;
            
            document.querySelector('#riseTime').innerHTML = sunriseTime;
            document.querySelector('#setTime').innerHTML = sunsetTime;

            
            document.querySelector('#riseTime').innerHTML = sunriseTime;
            document.querySelector('#setTime').innerHTML = sunsetTime;
        })
        .catch(error => {
            console.error('API 요청 오류:', error);
        });
    });
});