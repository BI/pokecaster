import dc from 'dc'
import crossfilter from 'crossfilter'

const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default class Schema {
  static connect(data) {
    let cfx = crossfilter(data)
    let dimensions = {
      day: cfx.dimension( d => weekday[(new Date(d.local_time)).getDay()] ),
      pokemon: cfx.dimension(dc.pluck('id'))
    }
    let groups = {
      day: dimensions.day.group().reduceCount(),
      pokemon: dimensions.pokemon.group().reduceCount()
    }

    return { dimension: dimensions, group: groups }
  }
}