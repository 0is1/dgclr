// import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';
import {take} from 'lodash';
import data from './data.json';

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
const someData = take(data, 3);
someData.forEach(course =>
    request(course.url, (error, response, body) => {
        const $ = cheerio.load(body);
        console.log(course.name);
        $('ul.course_info').find('li').each((i, info) => {
            if ($(info).children('b').text().toLowerCase() === 'osoite') {
                console.log('Osoite: ', $(info).children('p').text());
            } else if ($(info).children('b').text().toLowerCase() === 'väylien määrä') {
                console.log('Väylien määrä: ', $(info).children('p').text());
            } else if ($(info).children('b').text().toLowerCase() === 'pinnanmuodot') {
                console.log('Pinnanmuodot: ', $(info).children('p').text());
            }
        });
        // $('.fairway h4').each((i, item) => console.log('Väylä: ', $(item).text()));
        $('.fairway p').each((i, item) => {
            if (!(i % 2)) {
                const lengthAndPar = $(item).text().replace(/[A-Öa-ö ]/g, '').split('.');
                console.log(lengthAndPar);
            }
        });
        // console.log($('span.caption').text());
        // console.log($('span.description').text());
        console.log('\n\n');
    }));
