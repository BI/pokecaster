import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import Pokemon from './pokemon.json'
import Styles from '../node_modules/react-select/dist/react-select.css'

export default class PokemonSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handlChange.bind(this)
  }

  handlChange(value) {
    this.props.onChange(value);
  }

  render() {
    let options = Pokemon.map( p => Object.assign(p, { value: p.identifier, label: p.identifier }))
    options.unshift({ value: 'All', label: 'All' })
    return (
      <Select 
        name="poke-select"
        value={this.props.value}
        options={options}
        onChange={this.handleChange}
        />
    )

  }
}