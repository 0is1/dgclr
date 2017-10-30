// import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';
import {take} from 'lodash';
import data from './data.json';
// import {createCourse} from './controllers/course';

require('./db');
// request('https://frisbeegolfradat.fi/radat/', (error, response, body) => {
//     console.log('statusCode:', response && response.statusCode);
// Print the response status code if a response was received
//     const $ = cheerio.load(body);
//     const courseData = [];
//     $('#radatlistaus').find('td.rataCol a').each((i, course) => {
//         courseData.push({name: $(course).text(), url: $(course).attr('href')});
//     });
//     // console.log(courseData);
//     // fs.writeFile('data.json', JSON.stringify(courseData), (err) => {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     console.log('The file has been saved!');
//     // });
// });
const someData = take(data, 30).slice(28);
someData.forEach((course) => {
    request(course.url, (error, response, body) => {
        const $ = cheerio.load(body);
        // console.log(course.name);
        const dataObject = {
            events: [],
            courseInfo: {
                fee: {},
            },
            holes: [],
            locationInfo: {
                coordinates: {},
            },
            name: course.name,
        };
        $('ul.course_info').find('li').each((i, info) => {
            if ($(info).children('b').text().toLowerCase() === 'osoite') {
                const d = $(info).children('p').text().trim()
                    .split('\n');
                // console.log('Osoite: ');
                dataObject.locationInfo = d.map((part, ind) => {
                    if (ind === 1) {
                        const zipAndCity = part.trim().split(' ');
                        // console.log(zipAndCity);
                        return zipAndCity.length === 2 ?
                            {city: zipAndCity[1], zip: zipAndCity[0]} : {};
                    }
                    // console.log(part);
                    return {address: part};
                });
            } else if ($(info).children('b').text().toLowerCase() === 'väylien määrä') {
                // console.log('Väylien määrä: ', $(info).children('p').text());
                dataObject.holeCount = parseInt($(info).children('p').text(), 10);
            } else if ($(info).children('b').text().toLowerCase() === 'pinnanmuodot') {
                // console.log('Pinnanmuodot: ', $(info).children('p').text());
                dataObject.courseInfo.surfaceShapeTypes = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'perustettu') {
                // console.log('Perustettu: ', $(info).children('p').text());
                dataObject.courseInfo.founded = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'korit') {
                // console.log('korit: ', $(info).children('p').text());
                dataObject.courseInfo.basketType = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'heittopaikat') {
                // console.log('Heittopaikat: ', $(info).children('p').text());
                dataObject.courseInfo.teeType = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'opasteet') {
                // console.log('Opasteet: ', $(info).children('p').text());
                dataObject.courseInfo.infoSignType = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'ratatyyppi') {
                // console.log('Ratatyyppi: ', $(info).children('p').text());
                dataObject.courseInfo.courseType = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'ylläpito') {
                // console.log('Ylläpito: ', $(info).children('p').text());
                dataObject.courseInfo.maintenanceCycle = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'ratamestari') {
                // console.log('ratamestari: ', $(info).children('p').text());
                dataObject.courseInfo.rangeMaster = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'suunnittelija') {
                // console.log('suunnittelija: ', $(info).children('p').text());
                dataObject.courseInfo.courseDesigner = $(info).children('p').text();
            } else if ($(info).children('b').text().toLowerCase() === 'ilmainen/maksullinen') {
                // console.log('Ilmainen/maksullinen: ', $(info).children('p').text());
                dataObject.courseInfo.fee.value = $(info).children('p').text();
            }
            return dataObject;
        });
        if ($('a[href*="maps.google"]').length) {
            const coordinates = $('a[href*="maps.google"]').attr('href').replace(/^(https?):\/\/maps.google.com\/\?q=/, '').split(',');
            // console.log('coordinates: ', coordinates);
            if (coordinates && coordinates.length === 2 && coordinates[0] !== 'NULL') {
                dataObject.locationInfo.coordinates = {
                    lat: coordinates[0],
                    long: coordinates[1],
                };
            }
        }
        if ($('.sidebar_map a').length) {
            // console.log('Kartta: ', $('.sidebar_map a').attr('href'));
            dataObject.courseInfo.mapUrl = $('.sidebar_map a').attr('href');
        }
        // $('.fairway h4').each((i, item) => console.log('Väylä: ', $(item).text()));
        $('.fairway p').each((i, item) => {
            if (!(i % 2)) {
                const lengthAndPar = $(item).text().replace(/[A-Öa-ö ]/g, '').split('.');
                // console.log(lengthAndPar);
                if (lengthAndPar && lengthAndPar.length === 2) {
                    const meter = parseInt(lengthAndPar[0], 10) || 0;
                    const foot = parseInt(3.28 * meter, 10);
                    dataObject.holes.push({
                        bar: lengthAndPar[1],
                        length: {
                            foot,
                            meter,
                        },
                    });
                }
            }
        });
        // console.log('Caption: ', $('span.caption').text());
        // console.log('Description', $('span.description').text());
        dataObject.description = $('span.description').text().replace(/\n\t/g, '').trim();
        console.log('\n\n');
        console.log('Course data: ', dataObject);
        if (dataObject.holes.length) {
            console.log(dataObject.holes[0].length);
        }
    });
});

/*
const testData = {
    description: `Haapaveden Urheilijat ja Haapaveden Latu ovat 1.5.2017
    aloittaneet yhteistyössä rakentamaan Korkatin urheilu- ja ulkoilualueelle kiinteää 18-väyläistä
    frisbeegolfrataa. Hanketta rahoittaa Keskipiste-Leader. Aakonmajalle tullessa jatka aakonmajan
    takaa oikealle laavun ohi ja näet rataopasterungon n. 170 m päässä edessäsi. 1-väylä lähtee
    rataopasteen takaa.`,
    courseInfo: {
        basketType: 'DiscGolfPark-maalikori',
        courseDesigner: 'HaU Disc Golf Club Haapavesi',
        courseType: 'Metsärata',
        fee: {
            amount: 0,
            value: 'ilmainen',
        },
        infoSignType: 'Prodigy opasteet',
        maintenanceCycle: 'Satunnainen',
        mapUrl: 'https://frisbeegolfradat.fi/files/2017/10/aakonvuoren_haapavesi_ratakartta_2017.jpg',
        rangeMaster: 'Niko Palokangas',
        surfaceShapeTypes: ['Kumpuileva, jonkin verran korkeuseroja'],
        teeType: 'Tekonurmi',
    },
    holes: [{
        bar: 3,
        length: {
            foot: 345,
            meter: 105,
        },
    }, {
        bar: 3,
        length: {
            foot: 295,
            meter: 90,
        },
    }, {
        bar: 3,
        length: {
            foot: 400,
            meter: 122,
        },
    }, {
        bar: 4,
        length: {
            foot: 433,
            meter: 132,
        },
    }, {
        bar: 4,
        length: {
            foot: 466,
            meter: 142,
        },
    }, {
        bar: 3,
        length: {
            foot: 328,
            meter: 100,
        },
    }, {
        bar: 4,
        length: {
            foot: 495,
            meter: 151,
        },
    }, {
        bar: 3,
        length: {
            foot: 371,
            meter: 113,
        },
    }, {
        bar: 3,
        length: {
            foot: 450,
            meter: 137,
        },
    }, {
        bar: 3,
        length: {
            foot: 312,
            meter: 95,
        },
    }, {
        bar: 3,
        length: {
            foot: 246,
            meter: 75,
        },
    }, {
        bar: 3,
        length: {
            foot: 325,
            meter: 99,
        },
    }, {
        bar: 3,
        length: {
            foot: 377,
            meter: 115,
        },
    }, {
        bar: 3,
        length: {
            foot: 253,
            meter: 77,
        },
    }, {
        bar: 3,
        length: {
            foot: 344,
            meter: 105,
        },
    }, {
        bar: 4,
        length: {
            foot: 443,
            meter: 135,
        },
    }, {
        bar: 3,
        length: {
            foot: 400,
            meter: 122,
        },
    }, {
        bar: 4,
        length: {
            foot: 476,
            meter: 145,
        },
    }],
    holeCount: 18,
    locationInfo: {
        address: 'Turvetie 1272',
        zip: 86600,
        city: 'Haapavesi',
        coordinates: {
            lat: '64.1752',
            long: '25.5045',
        },
    },
    name: 'Aakonvuoren frisbeegolfrata',
    totalPar: 59,
};
*/

//
// createCourse(testData)
//     .then(result => console.log('createCourse: ', result))
//     .catch(err => console.log('err: ', err));
