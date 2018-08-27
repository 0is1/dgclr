// import fs from 'fs';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
// import { take } from 'lodash';
import connectDb from './db';
import data from './data.json';
import { createCourse } from './controllers/course';

/**
 * Get all course names and urls
 */
// const getAllCourseNamesAndurls = () => {
//   request('https://frisbeegolfradat.fi/radat/', (error, response, body) => {
//     console.log('statusCode:', response && response.statusCode);
//     // Print the response status code if a response was received
//     const $ = cheerio.load(body);
//     const courseData = [];
//     $('#radatlistaus')
//       .find('td.rataCol a')
//       .each((i, course) => {
//         courseData.push({
//           name: $(course).text(),
//           url: $(course).attr('href'),
//         });
//       });
//     // console.log(courseData);
//     fs.writeFile('data.json', JSON.stringify(courseData), (err) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log('The file has been saved!');
//     });
//   });
// };

export const maybeCreateCourse = async (courseData) => {
  try {
    await createCourse(courseData);
    // console.log('maybeCreateCourse: ', result);
  } catch (e) {
    console.error('maybeCreateCourse error: ', e);
  }
};

export const scrapeData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const someData = take(data, 5);
  // eslint-disable-next-line no-restricted-syntax
  for (const course of data) {
    // eslint-disable-next-line no-await-in-loop
    await page.goto(course.url);
    // eslint-disable-next-line no-await-in-loop
    const content = await page.content();
    const $ = cheerio.load(content);
    console.log(course.name);
    const dataObject = {
      events: [],
      courseInfo: {
        fee: {},
      },
      layouts: [],
      locationInfo: {
        location: {},
      },
      name: course.name,
    };
    let holeCount = 0;
    $('ul.course_info')
      .find('li')
      .each((i, info) => {
        if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'osoite'
        ) {
          const d = $(info)
            .children('p')
            .text()
            .trim()
            .split('\n');
          // console.log('Osoite: ');
          dataObject.locationInfo = d
            .map((part, ind) => {
              if (ind === 1) {
                const zipAndCity = part.trim().split(' ');
                // console.log('zipAndCity: ', zipAndCity);
                return zipAndCity.length === 2 ? { city: zipAndCity[1], zip: zipAndCity[0] } : {};
              }
              // console.log('address: ', part);
              return { address: part };
            })
            .reduce((a, b) => ({ ...a, ...b }));
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'väylien määrä'
        ) {
          holeCount = parseInt(
            $(info)
              .children('p')
              .text(),
            10,
          );
          // console.log('Väylien määrä: ', holeCount);
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'pinnanmuodot'
        ) {
          // console.log('Pinnanmuodot: ', $(info).children('p').text());
          dataObject.courseInfo.surfaceShapeTypes = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'perustettu'
        ) {
          // console.log('Perustettu: ', $(info).children('p').text());
          dataObject.courseInfo.founded = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'korit'
        ) {
          // console.log('korit: ', $(info).children('p').text());
          dataObject.courseInfo.basketType = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'heittopaikat'
        ) {
          // console.log('Heittopaikat: ', $(info).children('p').text());
          dataObject.courseInfo.teeType = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'opasteet'
        ) {
          // console.log('Opasteet: ', $(info).children('p').text());
          dataObject.courseInfo.infoSignType = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'ratatyyppi'
        ) {
          // console.log(
          //   'Ratatyyppi: ',
          //   $(info)
          //     .children('p')
          //     .text(),
          // );
          const courseTypes = $(info)
            .children('p')
            .text();
          dataObject.courseInfo.courseTypes = courseTypes.match(/[A-Ö][a-ö]+/g);
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'ylläpito'
        ) {
          // console.log('Ylläpito: ', $(info).children('p').text());
          dataObject.courseInfo.maintenanceCycle = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'ratamestari'
        ) {
          // console.log('ratamestari: ', $(info).children('p').text());
          dataObject.courseInfo.rangeMaster = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'suunnittelija'
        ) {
          // console.log('suunnittelija: ', $(info).children('p').text());
          dataObject.courseInfo.courseDesigner = $(info)
            .children('p')
            .text();
        } else if (
          $(info)
            .children('b')
            .text()
            .toLowerCase() === 'ilmainen/maksullinen'
        ) {
          // console.log('Ilmainen/maksullinen: ', $(info).children('p').text());
          dataObject.courseInfo.fee.value = $(info)
            .children('p')
            .text();
        }
      });
    if ($('a[href*="maps.google"]').length) {
      const coordinates = $('a[href*="maps.google"]')
        .attr('href')
        .replace(/^(https?):\/\/maps.google.com\/\?q=/, '')
        .split(',');
      // console.log('coordinates: ', coordinates);
      if (coordinates && coordinates.length === 2 && coordinates[0] !== 'NULL') {
        dataObject.locationInfo.location = {
          type: 'Point',
          coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
        };
      } else {
        dataObject.locationInfo.location = {
          type: 'Point',
          coordinates: [0, 0],
        };
      }
    }
    if ($('.sidebar_map a').length) {
      // console.log('Kartta: ', $('.sidebar_map a').attr('href'));
      dataObject.courseInfo.mapUrl = $('.sidebar_map a').attr('href');
    }
    // $('.fairway h4').each((i, item) => console.log('Väylä: ', $(item).text()));
    // Try to figure out all layouts
    const layoutNames = $('.fairway') && $('.fairway').length && $('.fairway').parent()
      ? $('.fairway')
        .parent()
        .prev('h3')
      : false;
    console.log('layoutNames: ', layoutNames.length);
    if (layoutNames && layoutNames.length) {
      // If we found some layouts, try to get their hole data
      layoutNames.each((i, layout) => {
        const layoutName = $(layout).text() || course.name;
        // this is lol XD
        const ratingImage = $(layout).prev('.rating_image');
        const rating = ratingImage.length
          ? ratingImage
            .attr('src')
            .split('/')
            .slice(-1)[0]
            .split('.')[0]
            .toUpperCase()
          : '';
        dataObject.layouts.push({ name: layoutName, holes: [], rating });
        const layoutIndex = dataObject.layouts.length >= 0 ? dataObject.layouts.length - 1 : 0;
        const holes = $(layout)
          .siblings('span')
          .children('.fairway')
          .children('h4');
        let dynamicHoleCount = 0;
        holes.each((index, hole) => {
          if (!(index % 2)) {
            dynamicHoleCount += 1;
            const lengthAndPar = $(hole)
              .siblings()
              .first('p')
              .text()
              .replace(/[A-Öa-ö ]/g, '')
              .split('.');
            console.log('lengthAndPar: ', lengthAndPar);
            if (lengthAndPar && lengthAndPar.length === 2) {
              const meter = parseInt(lengthAndPar[0], 10) || 0;
              const foot = parseInt(3.28 * meter, 10);
              dataObject.layouts[layoutIndex].holes.push({
                par: lengthAndPar[1],
                length: {
                  foot,
                  meter,
                },
              });
            }
          }
        });
        const finalHoleCount = dynamicHoleCount > 0 ? dynamicHoleCount : holeCount;
        dataObject.layouts[layoutIndex].holeCount = finalHoleCount;
      });
    } else {
      // this is lol XD
      const ratingImage = $('.rating_image');
      const rating = ratingImage.length
        ? ratingImage
          .attr('src')
          .split('/')
          .slice(-1)[0]
          .split('.')[0]
          .toUpperCase()
        : '';
      // Some reason we couldn't find layoutNames from the page
      dataObject.layouts.push({
        name: course.name,
        holes: [],
        holeCount,
        rating,
      });
      // but try again with fallback logic
      $('.fairway p').each((i, item) => {
        if (!(i % 2)) {
          const lengthAndPar = $(item)
            .text()
            .replace(/[A-Öa-ö ]/g, '')
            .split('.');
          // console.log('lengthAndPar: ', lengthAndPar);
          if (lengthAndPar && lengthAndPar.length === 2) {
            const meter = parseInt(lengthAndPar[0], 10) || 0;
            const foot = parseInt(3.28 * meter, 10);
            dataObject.layouts[0].holes.push({
              par: lengthAndPar[1],
              length: {
                foot,
                meter,
              },
            });
          }
        }
      });
    }
    // console.log('Caption: ', $('span.caption').text());
    // console.log('Description', $('span.description').text());
    const description = $('span.description')
      .text()
      .replace(/\n\t/g, '')
      .trim();
    dataObject.description = description !== 'NULL' ? description : '';
    // console.log('\n\n');
    // console.log('Course data: ', dataObject);

    // if (dataObject.layouts.length && dataObject.layouts[0].holes.length) {
    //   console.log('dataObject.layouts[0]');
    //   console.log(dataObject.layouts[0]);
    // }
    maybeCreateCourse(dataObject);
  }
};

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
    courseTypes: ['Metsärata'],
    fee: {
      amount: 0,
      value: 'ilmainen',
    },
    infoSignType: 'Prodigy opasteet',
    maintenanceCycle: 'Satunnainen',
    mapUrl:
      'https://frisbeegolfradat.fi/files/2017/10/aakonvuoren_haapavesi_ratakartta_2017.jpg',
    rangeMaster: 'Niko Palokangas',
    surfaceShapeTypes: ['Kumpuileva, jonkin verran korkeuseroja'],
    teeType: 'Tekonurmi',
  },
  layouts: [
    {
      name: 'Aakonvuoren frisbeegolfrata',
      holes: [
        {
          par: 3,
          length: {
            foot: 345,
            meter: 105,
          },
        },
        {
          par: 3,
          length: {
            foot: 295,
            meter: 90,
          },
        },
        {
          par: 3,
          length: {
            foot: 400,
            meter: 122,
          },
        },
        {
          par: 4,
          length: {
            foot: 433,
            meter: 132,
          },
        },
        {
          par: 4,
          length: {
            foot: 466,
            meter: 142,
          },
        },
        {
          par: 3,
          length: {
            foot: 328,
            meter: 100,
          },
        },
        {
          par: 4,
          length: {
            foot: 495,
            meter: 151,
          },
        },
        {
          par: 3,
          length: {
            foot: 371,
            meter: 113,
          },
        },
        {
          par: 3,
          length: {
            foot: 450,
            meter: 137,
          },
        },
        {
          par: 3,
          length: {
            foot: 312,
            meter: 95,
          },
        },
        {
          par: 3,
          length: {
            foot: 246,
            meter: 75,
          },
        },
        {
          par: 3,
          length: {
            foot: 325,
            meter: 99,
          },
        },
        {
          par: 3,
          length: {
            foot: 377,
            meter: 115,
          },
        },
        {
          par: 3,
          length: {
            foot: 253,
            meter: 77,
          },
        },
        {
          par: 3,
          length: {
            foot: 344,
            meter: 105,
          },
        },
        {
          par: 4,
          length: {
            foot: 443,
            meter: 135,
          },
        },
        {
          par: 3,
          length: {
            foot: 400,
            meter: 122,
          },
        },
        {
          par: 4,
          length: {
            foot: 476,
            meter: 145,
          },
        },
      ],
      holeCount: 18,
    },
  ],
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
}; */

//
// createCourse(testData)
//     .then(result => console.log('createCourse: ', result))
//     .catch(err => console.log('err: ', err));

const init = async () => {
  console.log('before db');
  await connectDb();
  console.log('after db');
  scrapeData();
  // maybeCreateCourse(testData);
};

init();
