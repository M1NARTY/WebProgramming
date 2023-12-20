document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        var url = 'https://api.sunrise-sunset.org/json?lat=37.291111&lng=127.008888&date=today&tzId=Asia/Seoul';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                var results = data.results;
                var sunriseTime = '';
                var sunsetTime = '';

                var sunrise = results.sunrise || '데이터 없음';
                var sunset = results.sunset || '데이터 없음';
                
                sunriseTime += `<p>${sunrise}</p>`;
                sunsetTime += `<p>${sunset}</p>`;
                
                document.querySelector('#riseTime').innerHTML = sunriseTime;
                document.querySelector('#setTime').innerHTML = sunsetTime;
            });
            var date = new Date();
            var year = date.getFullYear();
            var month = ("0" + (1 + date.getMonth())).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            document.querySelector('#date').innerHTML = year + "-" + month + "-" + day;
            // document.write(year + "-" + month + "-" + day);
    });
});