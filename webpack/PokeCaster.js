import React, { Component, PropTypes } from 'react'
import dc from 'dc'
import Schema from './util/Schema'
import DIL from './util/DCJS_Integration_Layer'
import { Map, TileLayer } from 'react-leaflet'
import PokemonSelect from './PokemonSelect'

const centerPosition = [51.0, -.09]

export default class PokeCaster extends Component {
  constructor(props) {
    super(props)

    this.state = { crossfilter: [], pokemonSelected: { id: 1 } } // Initial pokemon selected is Bulbasaur for now

    this.initialize = this.initialize.bind(this)
    this.reInitialize = this.reInitialize.bind(this)
    this.changePokemon = this.changePokemon.bind(this)
  }

  componentDidMount() {
    // make an API request with the currently selected pokemon
    DIL.get(`http://localhost:3000/api/pokemon/${this.state.pokemonSelected.id}/sightings` , this.initialize)
    
  }

  componentDidUpdate() {
    // make an API request with the currently selected pokemon
    DIL.get(`http://localhost:3000/api/pokemon/${this.state.pokemonSelected.id}/sightings`, this.reInitialize)
    
  }

  initialize(data) {
    let cfx = Schema.connect(data)

    this.dayChart = dc.pieChart("#day-chart")
      .width(150)
      .height(150)
      .dimension(cfx.dimension.day)
      .group(cfx.group.day)

    this.dataTable = dc.dataTable("#poke-table")
      .size(20)
      .columns([
        (d) => d.pokemon_id,
        (d) => d.city_id,
        (d) => d.latitude,
        (d) => d.longitude,
        (d) => d.local_time,
        (d) => d.weather,
        (d) => d.is_near_water
      ])
      .dimension(cfx.dimension.table)
      .group(cfx.group.table)

    dc.renderAll()
  }

  reInitialize(data) {
    let cfx = Schema.connect(data)

    this.dayChart.dimension(cfx.dimension.day).group(cfx.group.day)
    this.dataTable.dimension(cfx.dimension.table).group(cfx.group.table)

    dc.renderAll() 
  }

  changePokemon(value) {
    this.setState({ pokemonSelected: value })
  }

  render() {
    return (
      <div className="poke-caster">
        <PokemonSelect onChange={this.changePokemon} value={this.state.pokemonSelected.id} />
        <div id="day-chart"></div>
        <table id="poke-table">
          <thead>
            <tr>
              <th>Pokemon Id</th>
              <th>City Id</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Local Time</th>
              <th>Weather</th>
              <th>Near Water</th>
            </tr>
          </thead>
        </table>
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