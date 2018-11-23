const axios = require('axios');
const xml2js = require('xml2js');

const express = require('express');
const router = express.Router();

const cities = require('../cities');
const appKey = '8123b6a1-7447-4561-b360-86439c84dcfa';
// const weather = require('../weather');
// const currWeather = require('../currWeather');
// const weather3 = require('../weather3');

router.get('/shortChart', function (req, res, next) {

    let weather = null;
    let url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1162056500';

    //기상청 서비스
    //axios.get('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108')
    axios.get(url)
        .then((response) => {
            xml2js.Parser().parseString(response.data, function (err, result) {
                weather = result;
            });
            res.send(eval(weather));
        }).catch((error) => {
        if (error) throw error;
        res.send(weather);
    });
});

router.get('/shortChart/:leafCode', function (req, res, next) {

    let weather = null;
    let leafCode = req.params.leafCode;

    let url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=' + leafCode;

    //기상청 서비스
    //axios.get('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108')
    axios.get(url)
        .then((response) => {
            xml2js.Parser().parseString(response.data, function (err, result) {
                weather = result;
            });
            res.send(eval(weather));
        }).catch((error) => {
        if (error) throw error;
        res.send(weather);
    });
});

router.get('/midChart', function (req, res, next) {

    let weather = null;
    let url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';

    //기상청 서비스
    //axios.get('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108')
    axios.get(url)
        .then((response) => {
            xml2js.Parser().parseString(response.data, function (err, result) {
                weather = result;
            });
            res.send(eval(weather));
        }).catch((error) => {
        if (error) throw error;
        res.send(weather);
    });
});

router.get('/midChart/:leafCode/:mdlName', function (req, res, next) {

    let weather = null;
    let leafCode = req.params.leafCode;
    let mdlName = req.params.mdlName;


    console.log('leafCode> ' + leafCode);
    console.log('mdlName> ' + mdlName);

    let topCode, mdlCode = null;
    if (leafCode) {
        topCode = leafCode.substr(0, 2);
        mdlCode = leafCode.substr(0, 5);
    }

    //서울·경기도
    let top109 = [11, 28, 41];

    //강원도
    let top105 = [42];

    //충청북도
    let top131 = [43];

    //충청남도
    let top133 = [44, 30];

    //전라북도
    let top146 = [45];

    //전라남도
    let top156 = [46, 29];

    //경상북도
    let top143 = [47, 27];

    //경상남도
    let top159 = [48, 26, 31];

    //제주특별자치도
    let top184 = [50];


    let url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';
    if (top109.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';
    } else if (top105.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=105';
    } else if (top131.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=131';
    } else if (top133.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=133';
    } else if (top146.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=146';
    } else if (top156.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=156';
    } else if (top143.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=143';
    } else if (top159.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=159';
    } else if (top184.indexOf(topCode) > 0) {
        url = 'http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=184';
    }


    //기상청 서비스
    axios.get(url)
        .then((response) => {
            xml2js.Parser().parseString(response.data, function (err, result) {
                weather = result;

                //최상단 시 에서 걸릴경우


                //구에서 걸러야할 경우


                let location = result.rss.channel[0].item[0].description[0].body[0].location;
                for (let key of Object.keys(location)) {
                    //console.log(location[key].city[0]);

                    if (mdlName.indexOf(location[key].city[0]) > -1) {
                        res.send(location[key].city[0]);
                        break;
                    }

                }


                //console.log(result.rss.channel[0]);
                //weather = result.rss.channel[0].item[0].description[0].body[0].data;
                res.send(weather);
            });
            res.send(eval(weather));
        }).catch((error) => {
        if (error) throw error;
        res.send(weather);
    });
});

router.get('/topCode', function (req, res) {

    let code = null;
    axios.get('http://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt')
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) throw error;
        res.send(code);
    });
});
router.get('/mdlCode', function (req, res) {

    let code = null;
    let topCode = req.query.topCode;
    axios.get('http://www.kma.go.kr/DFSROOT/POINT/DATA/mdl.' + topCode + '.json.txt')
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) throw error;
        res.send(code);
    });

});
router.get('/leafCode', function (req, res) {

    let code = null;
    let mdlCode = req.query.mdlCode;
    axios.get('http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf.' + mdlCode + '.json.txt')
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) throw error;
        res.send(code);
    });
});

router.get('/forecast/6days', function (req, res) {

    let code = null;
    let city = req.query.city;
    let country = req.query.country;
    let village = req.query.village;

    let data = {
        params: {
            'version': 1,
            'city': city,
            'county': country,
            'village': village,
            'foretxt': 'N',
            'appKey': appKey
        }
    }

    let url = 'http://api2.sktelecom.com/weather/forecast/6days';
    axios.get(url, data)
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) {
            throw error;
        }
        res.send(code);
    });

    // res.send(weather);
});

router.get('/current/minutely', function (req, res) {

    let code = null;
    let city = req.query.city;
    let country = req.query.country;
    let village = req.query.village;

    let data = {
        params: {
            'version': 1,
            'city': city,
            'county': country,
            'village': village,
            'appKey': appKey
        }
    }

    let url = 'http://api2.sktelecom.com/weather/current/minutely';
    axios.get(url, data)
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) {
            throw error;
        }
        res.send(code);
    });

    // res.send(currWeather);
});

router.get('/forecast/3days', function (req, res) {

    let code = null;
    let city = req.query.city;
    let country = req.query.country;
    let village = req.query.village;

    let data = {
        params: {
            'version': 1,
            'city': city,
            'county': country,
            'village': village,
            'foretxt': 'N',
            'appKey': appKey
        }
    }

    let url = 'http://api2.sktelecom.com/weather/forecast/3days';
    axios.get(url, data)
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) {
            throw error;
        }
        res.send(code);
    });

    // res.send(weather3);
});


router.get('/city', function (req, res) {
    res.send(cities);
});


router.get('/forecast/storm', function (req, res) {

    let code = null;

    let data = {
        params: {
            'version': 2,
            'proj': 4326,
            'isThatAll': 'N'
        }
    }

    let url = 'http://api2.sktelecom.com/weather/wmap/storm';
    axios.get(url, data)
        .then((response) => {
            code = response.data;
            res.send(code);
        }).catch((error) => {
        if (error) {
            throw error;
        }
        res.send(code);
    });

    // res.send(weather3);
});


module.exports = router;