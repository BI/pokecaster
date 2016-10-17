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

    this.state = { crossfilter: [], pokemonSelected: { id: -1 } }

    this.initialize = this.initialize.bind(this)
    this.reInitialize = this.reInitialize.bind(this)
    this.changePokemon = this.changePokemon.bind(this)
  }

  componentDidMount() {
    // make an API request with the currently selected pokemon
    DIL.get('dummy/path.json', this.initialize)
    dc.renderAll()
  }

  componentDidUpdate() {
    // make an API request with the currently selected pokemon
    DIL.get('dummy/path.json', this.reInitialize)
    dc.renderAll()
  }

  initialize(data) {
    let cfx = Schema.connect(data)

    this.dayChart = dc.pieChart("#day-chart")
      .width(150)
      .height(150)
      .dimension(cfx.dimension.day)
      .group(cfx.group.day)

    cfx.dimension.pokemon.filterAll()
    this.pokemonChart = dc.barChart('#pokemon-chart')
      .width(500)
      .height(300)
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .brushOn(false)
      .xAxisLabel('Pokemon')
      .yAxisLabel('Known Sightings')
      .barPadding(0.1)
      .outerPadding(0.05)
      .dimension(cfx.dimension.pokemon)
      .group(cfx.group.pokemon)

  }

  reInitialize(data) {
    let cfx = Schema.connect(data)

    this.dayChart.dimension(cfx.dimension.day).group(cfx.group.day)

    if(this.state.pokemonSelected == "All") {
      cfx.dimension.pokemon.filterAll()
    }
    else {
      cfx.dimension.pokemon.filter(this.state.pokemonSelected.id)
    }
      
    this.pokemonChart.dimension(cfx.dimension.pokemon).group(cfx.group.pokemon)
    
  }

  changePokemon(value) {
    this.setState({ pokemonSelected: value })
  }

  render() {
    return (
      <div className="poke-caster">
        <PokemonSelect onChange={this.changePokemon} value={this.state.pokemonSelected.id} />
        <div id="pokemon-chart"></div>
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