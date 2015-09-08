'use strict';

var request = require('request');
var _ = require('lodash');
var cheerio = require('cheerio');
var moment = require('moment-timezone');

exports.name = 'netherlands';

exports.fetchData = function (source, cb) {
  var finalURL = source.url;
  request(finalURL, function (err, res, body) {
    if (err || res.statusCode !== 200) {
      console.error(err || res);
      return cb({message: 'Failure to load data url.'});
    }

    // Wrap everything in a try/catch in case something goes wrong
    try {
      // Format the data
      var data = formatData(body);
      // Make sure the data is valid
      if (data === undefined) {
        return cb({message: 'Failure to parse data.'});
      }
      cb(null, data);
    } catch (e) {
      return cb({message: 'Unknown adapter error.'});
    }
  });
};

var formatData = function (data) {
  var $ = cheerio.load(data);

  var parseDate = function (string) {
    // The original string contains spaces and (multiple) non-breaking spaces
    // 'Maandag 07-09-2015    16 uurconcentraties in µg/m3ongevalideerde'

    var splitString = string.split(/\s+/g);
    var dt = splitString[1] + splitString[2];
    var date = moment.tz(dt, 'DD-MM-YYYYHH', 'Europe/Amsterdam');

    return date.toDate();
  };

  var getCity = function (string) {
    var splitLocation = string.split('-');
    return splitLocation[0];
  };

  var getRoad = function (string) {
    var splitLocation = string.split('-');
    // Not every location has a road
    return splitLocation[1] || '';
  };

  var l = {
    name: 'unused',
    measurements: []
  };

  var mDate = parseDate($('#datumveld').text());

  $('table.UurwaardenTabel tr').each(function (i, elem) {
    // Values are stored in <td>. Skip the rows that don't contain them
    if ($(this).find('td').length === 0) {
      return true;
    };

    // Store the content of the <td> in an array
    var valuesLocation = [];
    $('td', this).each(function (i, elem) {
      valuesLocation[i] = $(this).text();
    });

    // Shared properties
    var baseP = {
      location: valuesLocation[0],
      city: getCity(valuesLocation[2]),
      road: getRoad(valuesLocation[2]),
      unit: 'µg/m3',
      date: mDate
    };

    // The index of each of the measurements
    var i = {
      'pm10': 3,
      'pm25': 4,
      'no2': 5,
      'no': 6,
      'o3': 7,
      'nh3': 8,
      'co': 9,
      'so2': 10,
      'bc': 11
    };

    // Add measurements
    for (var key in i) {
      var v = valuesLocation[i[key]];
      if (isNaN(v) === false && v !== '') {
        var p = _.clone(baseP);
        p.parameter = key;
        p.value = Number(v);
        l.measurements.push(p);
      }
    }
  });

  return l;
};
