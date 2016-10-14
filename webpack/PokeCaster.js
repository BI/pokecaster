import React, { Component, PropTypes } from 'react'
import dc from 'dc'
import crossfilter from 'crossfilter'
import { Map, TileLayer } from 'react-leaflet'

const centerPosition = [51.0, -.09]

export default class PokeCaster extends Component {
  constructor(props) {
    super(props)

    this.data = [
      {
        "pokedex_id":1,
        "name": "bulbasaur",
        "spotted_on": "2016-08-01 13:54:00",
        "latitude": 40.5888,
        "longitude": -105.062,
        "type_1":"grass",
        "type_2":"poison",
        "weather":"cloudy",
        "day": "Tuesday"
      },
      {
        "pokedex_id":4,
        "name": "charmander",
        "spotted_on": "2016-08-03 23:14:00",
        "latitude": 40.5788,
        "longitude": -105.062,
        "type_1":"fire",
        "type_2":"",
        "weather":"raining",
        "day": "Thursday"
      },
      {
        "pokedex_id":26,
        "name": "raichu",
        "spotted_on": "2016-08-03 03:56:00",
        "latitude": 40.5988,
        "longitude": -105.063,
        "type_1":"electric",
        "type_2":"",
        "weather":"cloudy",
        "day": "Thursday"
      },
      {
        "pokedex_id":1,
        "name": "gyrados",
        "spotted_on": "2016-08-05 13:54:00",
        "latitude": 40.5888,
        "longitude": -105.062,
        "type_1":"grass",
        "type_2":"flying",
        "weather":"sunny",
        "day": "Saturday"
      },
      {
        "pokedex_id":131,
        "name": "lapras",
        "spotted_on": "2016-08-05 13:54:00",
        "latitude": 40.5883,
        "longitude": -105.065,
        "type_1":"water",
        "type_2":"ice",
        "weather":"cloudy",
        "day": "Saturday"
      }
    ]
    this.crossfilter = crossfilter(this.data)
  }

  componentDidMount() {
    let dayDimension = this.crossfilter.dimension(dc.pluck('day'))
    let dayCount = dayDimension.group().reduceCount()

    this.dayChart = dc.pieChart("#day-chart")
      .width(150)
      .height(150)
      .dimension(dayDimension)
      .group(dayCount)
    
    dc.renderAll()
  }

  componentDidUpdate() {

  }

  wireUpData() {

  }

  render() {
    return (
      <div className="poke-caster">
        <div id="day-chart"></div>
        <Map
          style={{height: "500px", width: "500px"}}
          center={centerPosition}
          zoom={1}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/adetwiler/ciua6jnlx001n2ipllot5n0k6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRldHdpbGVyIiwiYSI6ImNpc2tnODV6ZjA0bzIyb29jN3hiMzc2bncifQ.-YhC_4Dhk4PAcFpi-z9odw"
            attribution="<attribution>" />
        </Map>
      </div>
    )
  }
}