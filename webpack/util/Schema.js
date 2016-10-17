import dc from 'dc'
import crossfilter from 'crossfilter'

export default class Schema {
  static connect(data) {
    let cfx = crossfilter(data)
    let dimensions = {
      day: cfx.dimension(dc.pluck('day')),
      pokemon: cfx.dimension(dc.pluck('name'))
    }
    let groups = {
      day: dimensions.day.group().reduceCount(),
      pokemon: dimensions.pokemon.group().reduceCount()
    }

    return { dimension: dimensions, group: groups }
  }
}