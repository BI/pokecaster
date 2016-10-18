import Request from 'superagent'

export default class DCJS_Integration_Layer {
  static get(path, callback) {
    Request.get(path)
      .end(function(error, response) {
        callback(response.body)
      })
  }
}