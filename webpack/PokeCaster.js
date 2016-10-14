import React, { Component, PropTypes } from 'react'
import dc from 'dc'
import crossfilter from 'crossfilter'
import DIL from './util/DCJS_Integration_Layer'
import { Map, TileLayer } from 'react-leaflet'

const centerPosition = [51.0, -.09]

export default class PokeCaster extends Component {
  constructor(props) {
    super(props)

    this.state = { crossfilter: [] }

    this.wireUpData = this.wireUpData.bind(this)
  }

  componentDidMount() {
    DIL.get('dummy/path.json', this.wireUpData)

    dc.renderAll()
  }

  componentDidUpdate() {

  }

  wireUpData(data) {
    let pokemonCfx = crossfilter(data)
    let dayDimension = pokemonCfx.dimension(dc.pluck('day'))
    let dayCount = dayDimension.group().reduceCount()

    this.dayChart = dc.pieChart("#day-chart")
      .width(150)
      .height(150)
      .dimension(dayDimension)
      .group(dayCount)
    this.setState({ crossfilter: pokemonCfx })
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