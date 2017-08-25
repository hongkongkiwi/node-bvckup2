'use strict'

const Promise = require('bluebird');
const request = require('request');
const util = require('util');
const _ = require('underscore');
// Handy error classes
const Errors = require('node-error-classes');
const httpError = require('http-errors');

const invalidParamError = (parameterName, expectedValue, gotValue) => {
  const err = new Errors.InvalidParameter;
  err.setMessage(parameterName, expectedValue, gotValue);
  return err;
}

const requiredParamError = (parameterName) => {
  const err = new Errors.RequiredParameter;
  err.setMessage(parameterName);
  return err;
}

class Bvckup2 {
  constructor(apiKey, options) {
    if (_.isUndefined(apiKey) || _.isNull(apiKey)) {
      throw requiredParamError('apiKey');
    } else if (_.isEmpty(apiKey)) {
      throw invalidParamError('apiKey', 'should contain some sting.', 'empty value.');
    } else if (!_.isString(apiKey)) {
      throw invalidParamError('apiKey', 'should be a string.', typeof licenseId);
    } else if (apiKey.substring(0, 11) !== "api_secret_") {
      throw invalidParamError('apiKey', 'should start with "api_secret_"', apiKey);
    }

    this.apiKey = apiKey;
    // Apply defaults
    this.options = _.extend({
      protocol: 'https',
      host: 'bvckup2.com',
      basePath: 'customer/api',
      requestOptions: {
        timeout: 2000,
        gzip: true
      }
    }, options);
    this.baseUrl = util.format('%s://%s/%s', this.options.protocol, this.options.host, this.options.basePath);
  }

  // Just a helper function so we can change the way all requests are done later
  _r(params, cb) {
    params = _.extend(_.extend({
      auth: {
        user: this.apiKey,
        sendImmediately: true
      },
      json: true,
      method: 'GET',
    }, params), this.options.requestOptions);
    request(params, cb);
  }

  listAllLicenses(options, cb) {
    // Sets default values if options is not passed
    options = _.extend({
      object: 'list',
      start: 0,
      limit: 1000
    }, options);
    const params = {
      url: util.format('%s/%s?start=%d&limit=%d&object=%s', this.baseUrl, 'licenses', options.start, options.limit, options.object)
    };
    this._r(params, (err, response, body) => {
      if (err) {
        return cb(err);
      } else if (response.statusCode < 200 || response.statusCode >= 300) {
        return cb(httpError(response.statusCode, body));
      }
      cb(null, body.data, body.has_more);
    });
  }

  getLicense(licenseId, cb) {
    if (_.isUndefined(licenseId) || _.isNull(licenseId)) {
      return cb(requiredParamError('licenseId'));
    } else if (_.isEmpty(licenseId)) {
      return cb(invalidParamError('licenseId', 'should not be empty.', licenseId));
    } else if (!_.isString(licenseId)) {
      return cb(invalidParamError('licenseId', 'should be a string.', typeof licenseId));
    }
    const params = {
      url: util.format('%s/%s/%s', this.baseUrl, 'licenses', licenseId)
    };
    this._r(params, (err, response, body) => {
      if (err) {
        return cb(err);
      } else if (response.statusCode < 200 || response.statusCode >= 300) {
        return cb(httpError(response.statusCode, body));

      }
      cb(null, body[0]);
    });
  }
}

Promise.promisifyAll(Bvckup2.prototype);

module.exports = Bvckup2;
