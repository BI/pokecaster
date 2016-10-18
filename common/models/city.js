'use strict';

module.exports = function(City) {
  City.disableRemoteMethod('create', true);                // Removes (POST) /cities
  City.disableRemoteMethod('upsert', true);                // Removes (PUT) /cities
  City.disableRemoteMethod('replaceById', true);                // Removes (PUT) /cities
  City.disableRemoteMethod('replaceOrCreate', true);                // Removes (PUT) /cities
  City.disableRemoteMethod('upsertWithWhere', true);                // Removes (PUT) /cities
  City.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /cities/:id
  City.disableRemoteMethod("updateAll", true);               // Removes (POST) /cities/update
  City.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /cities/:id
  City.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /cities/change-stream

  City.disableRemoteMethod('__create__sightings', false)
  City.disableRemoteMethod('__upsert__sightings', false)
  City.disableRemoteMethod('__delete__sightings', false)
  City.disableRemoteMethod('__updateById__sightings', false)
  City.disableRemoteMethod('__destroyById__sightings', false)
  // City.disableRemoteMethod('__create__sightings', true)
};
