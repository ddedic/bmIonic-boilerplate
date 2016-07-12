'use strict';

/**
 * @ngdoc constant
 * @name bmIonic.common.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('bmIonic.common')

  // development
  .constant('API_ENDPOINT', {
    host: 'http://api.develop2',
    path: '/v1',
    port: 80,

    needsAuth: false,
    username: 'whatever',
    password: 'foobar',

    needsToken: false,
    token: '--secret-token---'
  })

  .constant('S3_CONFIG', {
    bucket: 'https://s3.eu-central-1.amazonaws.com',
    folder: 'my-bucket'
  })

  .constant('APP_CONFIG', {
    defaultImage: 'http://google.com/someimage.jpg'
  });
