doucument.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        var url = 'https://api.sunrise-sunset.org/json';

        var queryParams = '?' + encodeURIComponent('lat') + '=' + encodeURIComponent('37.291111');
        queryParams += '&' + encodeURIComponent('lng') + '=' + encodeURIComponent('127.008888');
        queryParams += '&'
    });
});