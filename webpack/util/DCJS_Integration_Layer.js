import Request from 'superagent'

export default class DCJS_Integration_Layer {
  static get(path, callback) {
    // dummy data
    let data = [
      {
        "id":1,
        "name": "bulbasaur",
        "spotted_on": "2016-08-01 13:54:00",
        "latitude": 40.5888,
        "longitude": -105.062,
        "type_1":"grass",
        "type_2":"poison",
        "weather":"cloudy",
        "day": "Tuesday",
        "local_time":"2016-09-08T05:02:45.000Z"
      },
      {
        "id":4,
        "name": "charmander",
        "spotted_on": "2016-08-03 23:14:00",
        "latitude": 40.5788,
        "longitude": -105.062,
        "type_1":"fire",
        "type_2":"",
        "weather":"raining",
        "day": "Thursday",
        "local_time": "2016-09-07T06:19:51.000Z"
      },
      {
        "id":26,
        "name": "raichu",
        "spotted_on": "2016-08-03 03:56:00",
        "latitude": 40.5988,
        "longitude": -105.063,
        "type_1":"electric",
        "type_2":"",
        "weather":"cloudy",
        "day": "Thursday",
        "local_time": "2016-09-04T06:19:51.000Z"
      },
      {
        "id":1,
        "name": "gyrados",
        "spotted_on": "2016-08-05 13:54:00",
        "latitude": 40.5888,
        "longitude": -105.062,
        "type_1":"grass",
        "type_2":"flying",
        "weather":"sunny",
        "day": "Saturday",
        "local_time": "2016-09-07T06:19:51.000Z"
      },
      {
        "id":131,
        "name": "lapras",
        "spotted_on": "2016-08-05 13:54:00",
        "latitude": 40.5883,
        "longitude": -105.065,
        "type_1":"water",
        "type_2":"ice",
        "weather":"cloudy",
        "day": "Saturday",
        "local_time": "2016-09-02T06:19:51.000Z"
      }
    ]

    // call the callback when the request is finished
    callback(data)
  }
}