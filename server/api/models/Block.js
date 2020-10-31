/**
 * Block.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      payload: {
        type: 'json',
      },
      transactions: {
        type: 'json', columnType: 'array'
      }
  },

};

