let request = require('request-promise');

async function getDataFromApi(uri, data) {
    let options = {
        uri: uri,
        headers: data.headers,
        method: data.method || 'GET'
    };

    let response = await request(options);
    return response
}

function parseAppleData(response) {
    let jsonData = [];
    response = JSON.parse(response);
    for (var row of response["data"]) {
        jsonData.push({
            id: row['id'], 
            date: row['attributes']['date'], 
            review: row['attributes']['review']
        })
    }
    return jsonData
}

async function main() {
    let reviewData = [];

    for (let i = 10; i <= 1000; i += 10) {
        let uri = 'https://amp-api.apps.apple.com/v1/catalog/us/apps/570060128/reviews?l=en-US&offset='+i+'&platform=web&additionalPlatforms=appletv%2Cipad%2Ciphone%2Cmac'
        let data = {
            headers: {
                "Accept": "application/json,text/html,application/xhtml+xml,application/xml",
                "Origin": "https://apps.apple.com",
                "Authorization": "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNTg4MjAyNTM5LCJleHAiOjE2MDM3NTQ1Mzl9.ayXJqTDM0879m8ct_vyq_EMM2S1ynbYLolv4wVOPN3B1HNbUDg95796-fL3KioquQJPieGSGLRAfvVoU7_5zvA",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Referer": "https://apps.apple.com/us/app/duolingo-language-lessons/id570060128",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
            },
            method: 'GET'
        };
        let response = await getDataFromApi(uri, data);
        let jsonData = parseAppleData(response)
        reviewData = reviewData.concat(jsonData);
    }
    console.log(reviewData);
}

main();
