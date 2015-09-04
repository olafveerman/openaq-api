define({ "api": [
  {
    "type": "get",
    "url": "/locations",
    "title": "GET",
    "group": "Locations",
    "description": "<p>Providing data about distinct measurement locations, this is a nested list reflecting the country-city-location relationship, <code>count</code> and <code>lastUpdated</code> are calculated from all children.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "limit",
            "defaultValue": "100",
            "description": "<p>Change the number of results returned, max is 100.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Paginate through results.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "skip",
            "description": "<p>Number of records to skip.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location description for measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>2 digit country code containing measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>City containing measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "count",
            "description": "<p>Number of measurements, cumulative by specificity level</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "lastUpdated    The last update time for this specificity level.",
          "content": "HTTP/1.1 200 OK\n[\n  {\n  \"country\": \"UK\",\n  \"cities\": [\n    {\n    \"city\": \"London\",\n    \"locations\": [\n      {\n        \"location\": \"London Harrow Stanmore\",\n        \"count\": 1,\n        \"lastUpdated\": \"2015-08-23T16:00:00.000Z\"\n      },\n      {\n        \"location\": \"Southwark A2 Old Kent Road\",\n        \"count\": 4,\n        \"lastUpdated\": \"2015-08-23T16:00:00.000Z\"\n      }\n    ],\n    ...\n    \"count\": 68,\n    \"lastUpdated\": \"2015-08-23T16:00:00.000Z\"\n  ],\n  \"count\": 68,\n  \"lastUpdated\": \"2015-08-23T16:00:00.000Z\"\n]",
          "type": "date"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "statusCode",
            "description": "<p>The error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error name</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"statusCode\": 400,\n \"error\": \"Bad Request\",\n \"message\": \"Oops!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/locations.js",
    "groupTitle": "Locations",
    "name": "GetLocations"
  },
  {
    "type": "get",
    "url": "/measurements",
    "title": "GET",
    "group": "Measurements",
    "description": "<p>Providing data about individual measurements</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "country",
            "description": "<p>Limit results by a certain country.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "location",
            "description": "<p>Limit results by a certain location.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "parameter",
            "description": "<p>Limit to only a certain parameter (valid values are pm25, pm10, so2, no2, o3, co and bc).</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "value_from",
            "description": "<p>Show results above value threshold, useful in combination with <code>parameter</code>.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "value_to",
            "description": "<p>Show results below value threshold, useful in combination with <code>parameter</code>.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "date_from",
            "description": "<p>Show results after a certain date.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "date_to",
            "description": "<p>Show results before a certain date.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "sort",
            "defaultValue": "desc",
            "description": "<p>The sort order, asc or desc. Must be used with <code>order_by</code>.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "order_by",
            "defaultValue": "date",
            "description": "<p>Field to sort by. Must be used with <code>sort</code>.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "limit",
            "defaultValue": "100",
            "description": "<p>Change the number of results returned, max is 100.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Paginate through results.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>number</p> ",
            "optional": true,
            "field": "skip",
            "description": "<p>Number of records to skip.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>string</p> ",
            "optional": true,
            "field": "format",
            "defaultValue": "json",
            "description": "<p>Format for data return, can be <code>csv</code> or <code>json</code>.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>date</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Date and time of measurement (UTC)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "parameter",
            "description": "<p>Property being measured</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>number</p> ",
            "optional": false,
            "field": "value",
            "description": "<p>Value of measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "unit",
            "description": "<p>Unit of measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>Location description for measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>2 digit country code containing measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>City containing measurement</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"55a823fc3fe18309498d6ce2\",\n \"parameter\": \"Ammonia\",\n \"date\": \"2015-07-16T20:30:00.000Z\",\n \"value\": \"72.9\",\n \"unit\": \"µg/m3\",\n \"location\": \"Anand Vihar\",\n \"country\": \"IN\",\n \"city\": \"Delhi\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "statusCode",
            "description": "<p>The error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error name</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"statusCode\": 400,\n \"error\": \"Bad Request\",\n \"message\": \"Oops!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/measurements.js",
    "groupTitle": "Measurements",
    "name": "GetMeasurements"
  },
  {
    "type": "get",
    "url": "/sources",
    "title": "GET",
    "group": "Sources",
    "description": "<p>Providing data about where the measurements come from</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Descriptive name for location of measurement</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>City where measurement is taken</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>Country where measurement is taken</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Description of instrument</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>string</p> ",
            "optional": false,
            "field": "sourceURL",
            "description": "<p>Source URL to find original data</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "HTTP/1.1 200 OK\n {\n \"name\": \"Mandir Marg\",\n \"city\": \"Delhi\",\n \"country\": \"IN\",\n \"description\": \"\",\n \"sourceURL\": \"http://www.dpccairdata.com/dpccairdata/display/mmView15MinData.php\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "statusCode",
            "description": "<p>The error code</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error name</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Error message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n \"statusCode\": 400,\n \"error\": \"Bad Request\",\n \"message\": \"Oops!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/sites.js",
    "groupTitle": "Sources",
    "name": "GetSources"
  }
] });