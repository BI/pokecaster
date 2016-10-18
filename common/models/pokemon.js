'use strict';

module.exports = function(Pokemon) {
  Pokemon.disableRemoteMethod('create', true);                // Removes (POST) /cities
  Pokemon.disableRemoteMethod('upsert', true);                // Removes (PUT) /cities
  Pokemon.disableRemoteMethod('replaceById', true);           // Removes (PUT) /cities
  Pokemon.disableRemoteMethod('replaceOrCreate', true);       // Removes (PUT) /cities
  Pokemon.disableRemoteMethod('upsertWithWhere', true);       // Removes (PUT) /cities
  Pokemon.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /cities/:id
  Pokemon.disableRemoteMethod("updateAll", true);             // Removes (POST) /cities/update
  Pokemon.disableRemoteMethod("updateAttributes", false);     // Removes (PUT) /cities/:id
  Pokemon.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /cities/change-stream

  Pokemon.disableRemoteMethod('__create__sightings', false);
  Pokemon.disableRemoteMethod('__upsert__sightings', false);
  Pokemon.disableRemoteMethod('__delete__sightings', false);
  Pokemon.disableRemoteMethod('__updateById__sightings', false);
  Pokemon.disableRemoteMethod('__destroyById__sightings', false);
};
