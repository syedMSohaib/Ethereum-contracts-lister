/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/' : { 
    controller: 'block',
    action: "index",
  },
  'get /blocks/fetch' : {
    controller: 'block',
    action: "fetch",
    cors: {
      allowOrigins: '*',
   },    
  },
  'get /blocks/search' : {
    controller: 'block',
    action: "search",
    cors: {
      allowOrigins: '*',
   },    
  },  
  'get /blocks/sync' : {
    controller: 'block',
    action: "sync",
    cors: {
      allowOrigins: '*',
   },    
  }

};
