/* eslint-env jest */
import { mockCourses } from 'jest/mockData';
import {
  convertCoordinatesToObject,
  convertKilometersToMeters,
  convertLinksToHtml,
  convertMetersToKilometers,
  courseAddressDetails,
  getCourseMapUrlForLayout,
  getRandomKey,
  getTitle,
  isArrayWithLength,
  uniqueLayoutRatings,
  convertWWWToHttpAndAddLinks,
} from './utils';
import { MOCK_DESCRIPTION_WITH_DOT_AT_THE_END_OF_URL } from './mock/description-mocks';

describe('Utils', () => {
  describe('convertLinksToHtml', () => {
    it('convert urls to html links', () => {
      const result = convertLinksToHtml(mockCourses[0].description);
      expect(result).toBeDefined();
      expect(result).toEqual(expect.stringMatching('<a href='));
    });
    it("doesn't convert string without urls to html links", () => {
      const result = convertLinksToHtml(mockCourses[1].description);
      expect(result).toBeDefined();
      expect(result).toEqual(expect.not.stringMatching('<a href='));
      expect(result).toEqual(mockCourses[1].description);
    });
    // TODO: do not include dot at the end of url
    it('convert http-text to link without last dot', () => {
      const result = convertLinksToHtml(MOCK_DESCRIPTION_WITH_DOT_AT_THE_END_OF_URL);
      expect(result).toEqual(
        "Rata on perustettu vuonna 1998 vanhan golfkentän paikalle, ja se laajennettiin täysimittaiseksi 18-väyläiseksi vuonna 2004. Hiirosessa on pelattu useita SM-tason kilpailuja. Rata soveltuu sekä kilpapelaajille että harrastajille: osa väylistä on haastavia metsäväyliä, mutta tarjolla on myös lyhyempiä puistoväyliä. Radan pituus on 1999 metriä ja par 58. Väylien pituudet vaihtelevat 69:stä 243metriin. Hiirosen frisbeegolfrataa hoitavat oululaiset seurat Oulun Frisbeeseura ry ja BSC Disc Golf Team ry yhteistyössä. Oulun kaupunki huolehtii ruohon ja heinän leikkuusta säännöllisesti. Radan yhteydessä on riittävästi paikoitustilaa, jonka sijainti käy ilmi ratakartasta. Alue on yleinen puisto, joten muiden liikkujien ja toisten turvallisuus on huomioitava erityisen tarkasti. WC-tiloja radan yhteydessä ei ole. Lähimmät palvelut ovat Hiirosen Neste ja Maikkulan Neste. Radalla pelataan viikkokisoja, joissa ennen kisan alkua on paikalla myös välinemyynti. Katso tarkemmat tiedot osoitteesta www.viikkokisat.com. Ratakartta, väyläesittelyt ja ajo-ohjeet <a href='http://www.oulunfrisbeeseura.net/radat.php?rata=hiironen'>http://www.oulunfrisbeeseura.net/radat.php?rata=hiironen</a>. Tervetuloa Hiiroseen!",
      );
    });
  });
  describe('convertCoordinatesToObject', () => {
    it('convert coordinates to object', () => {
      const result = convertCoordinatesToObject(mockCourses[0].locationInfo.location.coordinates);
      expect(result).toBeDefined();
      const expected = {
        lat: mockCourses[0].locationInfo.location.coordinates[1],
        lng: mockCourses[0].locationInfo.location.coordinates[0],
      };
      expect(result).toEqual(expected);
    });
    it('return null without param', () => {
      const result = convertCoordinatesToObject();
      expect(result).toEqual(null);
    });
    it('return null with invalid param', () => {
      const result = convertCoordinatesToObject([{}, 'invalid']);
      expect(result).toEqual(null);
    });
  });
  describe('courseAddressDetails', () => {
    it('return course address details string', () => {
      const result = courseAddressDetails(mockCourses[0].locationInfo);
      const expected = 'Puolarmaari 12, 02210 Espoo';
      expect(result).toBeDefined();
      expect(result).toEqual(expected);
    });
    it('return course address details string without address', () => {
      const result = courseAddressDetails({ city: 'Mäyry', zip: '63130' });
      const expected = '63130 Mäyry';
      expect(result).toBeDefined();
      expect(result).toEqual(expected);
    });
    it('return empty string', () => {
      const result = courseAddressDetails({ zip: '02200' });
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });
  });
  describe('uniqueLayoutRatings', () => {
    it('return layout rating', () => {
      const result = uniqueLayoutRatings(mockCourses[0].layouts);
      expect(result).toBeDefined();
      expect(result).toEqual(['A1']);
    });
    it('return layout ratings', () => {
      const result = uniqueLayoutRatings(mockCourses[1].layouts);
      expect(result).toBeDefined();
      expect(result).toEqual(['AA1', 'AAA1', 'B1']);
    });
    it('return empty array without param', () => {
      const result = uniqueLayoutRatings();
      expect(result).toBeDefined();
      expect(result).toEqual([]);
    });
    it('return empty array with invalid param', () => {
      const result = uniqueLayoutRatings([null, null]);
      expect(result).toBeDefined();
      expect(result).toEqual([]);
    });
  });
  describe('getRandomKey', () => {
    it('return random key', () => {
      const result = getRandomKey();
      expect(result).toBeDefined();
    });
  });
  describe('getTitle', () => {
    it('get default title', () => {
      const result = getTitle();
      expect(result).toEqual('DGCLR - Disc Golf Course Lists and Results');
    });
    it('get title with value', () => {
      const value = 'Hello from tests!';
      const result = getTitle(value);
      expect(result).toEqual(`DGCLR - ${value}`);
    });
  });
  describe('isArrayWithLength', () => {
    it('return true', () => {
      const result = isArrayWithLength([1]);
      expect(result).toEqual(true);
    });
    it('return false', () => {
      const result = isArrayWithLength([]);
      expect(result).toEqual(false);
    });
    it('return false', () => {
      const result = isArrayWithLength();
      expect(result).toEqual(false);
    });
  });
  describe('convertMetersToKilometers', () => {
    it('return positive integer', () => {
      expect(convertMetersToKilometers(2000)).toEqual(2);
      expect(convertMetersToKilometers(1200.5)).toEqual(1);
    });
    it('return zero', () => {
      const result = convertMetersToKilometers([]);
      expect(result).toEqual(0);
    });
  });
  describe('getCourseMapUrlForLayout ', () => {
    it('return mapUrl from index 0', () => {
      const result = getCourseMapUrlForLayout(mockCourses[0].layouts, 0);
      expect(result).toEqual('https://frisbeegolfradat.fi/files/2017/10/puolarmaarin_espoo_ratakartta_2017.jpg');
    });
    it('return mapUrl from index 2', () => {
      const result = getCourseMapUrlForLayout(mockCourses[1].layouts, 2);
      expect(result).toEqual('https://frisbeegolfradat.fi/files/2017/10/kartanogolf_ratakartta_2017.jpg');
    });
    it('return empty string from undefined index', () => {
      const result = getCourseMapUrlForLayout(mockCourses[0].layouts, 1);
      expect(result).toEqual('');
    });
  });
  describe('convertKilometersToMeters', () => {
    it('return positive integer', () => {
      expect(convertKilometersToMeters(1)).toEqual(1000);
      expect(convertKilometersToMeters(0.5)).toEqual(500);
      expect(convertKilometersToMeters(2.5)).toEqual(2500);
    });
    it('return zero', () => {
      expect(convertKilometersToMeters([])).toEqual(0);
      expect(convertKilometersToMeters({})).toEqual(0);
      expect(convertKilometersToMeters(null)).toEqual(0);
      expect(convertKilometersToMeters(0)).toEqual(0);
      expect(convertKilometersToMeters(undefined)).toEqual(0);
    });
  });
  describe('convertWWWToHttpAndAddLinks', () => {
    it('return original string if no www.domain.com texts found', () => {
      const string = 'Tässä tekstissä ei ole yhtään www-alkuista "linkkiä". Sen sijaan tässä on yksi <a href="https://www.dgclr.fi"><a>-elementti</a>. Sen ei siis pitäisi muuttua convertWWWToHttpAndAddLinks-funktiossa.';
      expect(convertWWWToHttpAndAddLinks(string)).toEqual(string);
    });
    it('convert string with www.domain.com text to links', () => {
      const string = "Tämä ei pitäisi muuntua https://www.dgclr.fi. Sen sijaan tämä www.frisbeegolfrata.info pitäisi muuttua linkiksi. Meri-Toppilan frisbeegolfrata sijaitsee Oulussa n. viiden kilometrin päässä keskustasta Meri-Toppilan kaupunginosassa meren rannassa. Rata perustettiin vuonna 2007 ja se on saavuttanut suuren suosion jo lyhyen olemassaolonsa aikana. Radalla on pelattu useita valtakunnallisia kilpailuja ja kisa toimi vuoden 2016 Euroopanmestaruuskisojen näyttämönä. Radalla on kesällä 2017 alkaen käynnissä muutostöitä, kun läheisen asuinalueen tieltä kaivettavia maita läjitetään puistoon. Muutostöiden aikana on käytössä tilapäinen ratalayout: Radan yhteydessä ei ole WC-tiloja. Lähimmät palvelut ovat Meri-Toppilan asutuskeskuksessa sijaitsevat  kioski ja baari-pizzeria. Pysäköintipaikat ovat aivan radan vieressä, lähimmät ykköstiin vieressä. Ykköstiin vierestä löytyy myös löytökiekkolaatikko. Meri-Toppilan ulkoilualue on yleinen puisto. Tästä syystä muut puiston käyttäjät on huomioitava erityisen tarkasti. Radalla pelataan viikkokisoja. Katso tarkemmat tiedot osoitteesta www.viikkokisat.com. Hyvä tietää: Rata sijaitsee niittyluokitellulla alueella, ja väylät niitetään ensimmäisen kerran kesäkuun lopulla ja koko alueen heinät niitetään elokuun puolivälissä. Tästä syystä heinä on paikoin pitkää ja pelaamista haittaavaa kesäkuun puolivälistä elokuun puoliväliin. Meri-Toppilan 18-väyläistä hoitavat oululaiset seurat Oulun Frisbeeseura ry ja BSC Disc Golf Team ry yhteistyössä. Tämän ei pitäisi vaikuttaa lopputulokseen <a href='https://www.suomisport.fi/'>https://www.suomisport.fi/</a>, mutta entäs www.suomisport.fi/subpage.";
      const result = convertWWWToHttpAndAddLinks(string);

      expect(result).toEqual(
        "Tämä ei pitäisi muuntua https://www.dgclr.fi. Sen sijaan tämä <a href='http://www.frisbeegolfrata.info'>www.frisbeegolfrata.info</a> pitäisi muuttua linkiksi. Meri-Toppilan frisbeegolfrata sijaitsee Oulussa n. viiden kilometrin päässä keskustasta Meri-Toppilan kaupunginosassa meren rannassa. Rata perustettiin vuonna 2007 ja se on saavuttanut suuren suosion jo lyhyen olemassaolonsa aikana. Radalla on pelattu useita valtakunnallisia kilpailuja ja kisa toimi vuoden 2016 Euroopanmestaruuskisojen näyttämönä. Radalla on kesällä 2017 alkaen käynnissä muutostöitä, kun läheisen asuinalueen tieltä kaivettavia maita läjitetään puistoon. Muutostöiden aikana on käytössä tilapäinen ratalayout: Radan yhteydessä ei ole WC-tiloja. Lähimmät palvelut ovat Meri-Toppilan asutuskeskuksessa sijaitsevat  kioski ja baari-pizzeria. Pysäköintipaikat ovat aivan radan vieressä, lähimmät ykköstiin vieressä. Ykköstiin vierestä löytyy myös löytökiekkolaatikko. Meri-Toppilan ulkoilualue on yleinen puisto. Tästä syystä muut puiston käyttäjät on huomioitava erityisen tarkasti. Radalla pelataan viikkokisoja. Katso tarkemmat tiedot osoitteesta <a href='http://www.viikkokisat.com'>www.viikkokisat.com</a>. Hyvä tietää: Rata sijaitsee niittyluokitellulla alueella, ja väylät niitetään ensimmäisen kerran kesäkuun lopulla ja koko alueen heinät niitetään elokuun puolivälissä. Tästä syystä heinä on paikoin pitkää ja pelaamista haittaavaa kesäkuun puolivälistä elokuun puoliväliin. Meri-Toppilan 18-väyläistä hoitavat oululaiset seurat Oulun Frisbeeseura ry ja BSC Disc Golf Team ry yhteistyössä. Tämän ei pitäisi vaikuttaa lopputulokseen <a href='https://www.suomisport.fi/'>https://www.suomisport.fi/</a>, mutta entäs <a href='http://www.suomisport.fi/subpage'>www.suomisport.fi/subpage</a>.",
      );
    });
    it('convert string with www.domain.com/path text to links', () => {
      const string = 'Radan sivut Facebookissa: www.facebook.com/tarinalaakso. Ajo-ohje: Nouse Siilinjärven keskustan rampista ja lähde suuntaan Viitasaari/Maaninka.  Noin kilometrin päästä käänny vasemmalle suuntaan Kumpunen. Kentän parkkialue sijaitsee heti risteyksen jälkeen oikealla puolella. Ykköstii ja opastaulu hiekkamontussa. Kentällä ei ole WC-tiloja. Lähin WC löytyy Siilinjärven keskustasta. Tervetuloa rohkeasti Viikkokisoihin!';
      const result = convertWWWToHttpAndAddLinks(string);
      expect(result).toEqual(
        "Radan sivut Facebookissa: <a href='http://www.facebook.com/tarinalaakso'>www.facebook.com/tarinalaakso</a>. Ajo-ohje: Nouse Siilinjärven keskustan rampista ja lähde suuntaan Viitasaari/Maaninka.  Noin kilometrin päästä käänny vasemmalle suuntaan Kumpunen. Kentän parkkialue sijaitsee heti risteyksen jälkeen oikealla puolella. Ykköstii ja opastaulu hiekkamontussa. Kentällä ei ole WC-tiloja. Lähin WC löytyy Siilinjärven keskustasta. Tervetuloa rohkeasti Viikkokisoihin!",
      );
    });
    it('convert string with www.domain.com/path?a=1&b=2 text to links', () => {
      const result = convertWWWToHttpAndAddLinks('www.hello.world/subpath/another/?a=1&b=2');
      expect(result).toEqual("<a href='http://www.hello.world/subpath/another/?a=1&b=2'>www.hello.world/subpath/another/?a=1&b=2</a>");
    });
  });
});
