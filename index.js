// import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

request('https://frisbeegolfradat.fi/radat/', (error, response, body) => {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    const $ = cheerio.load(body);
    const courseData = [];
    $('#radatlistaus').find('td.rataCol a').each((i, course) => {
        courseData.push({name: $(course).text(), url: $(course).attr('href')});
    });
    // console.log(courseData);
    // fs.writeFile('data.json', JSON.stringify(courseData), (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log('The file has been saved!');
    // });
});
