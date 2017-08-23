# node-bvckup2

[![NPM Package](https://img.shields.io/npm/v/bvckup2.svg?style=flat-square)](https://www.npmjs.org/package/bvckup2)

A simple module for using the [Bvckup2 Dashboard API](https://bvckup2.com/customer/api/).

Install using `npm install --save bvckup2` or clone the repo

## Examples

Init the object

``` javascript
const Bvckup2 = require('bvckup2');

// You should change this to your real API key
// or use environment variable BVCKUP2_API_KEY
const apiKey = 'api_secret_000011112222';
const bvckup2 = new Bvckup2(process.env.BVCKUP2_API_KEY || apiKey);
```

List all licenses

``` javascript
bvckup2.listAllLicenses({}, (err, licenses) => {
  if (err) return console.error('Error',err);
  console.log('Found',licenses.length,'licenses!');
  console.log(licenses);
});
```

Get a specific license

``` javascript
const licenseId = 'ABCD-1234-5678-9123';
bvckup2.getLicense(licenseId, (err, licenseInfo) => {
  if (err) return console.error('Error',err);
  console.log('Got License Info', licenseInfo);
});
```

Also supports promises!

``` javascript
const licenseId = 'ABCD-1234-5678-9123';
bvckup2.getLicenseAsync(licenseId).then((licenseInfo) => {
  console.log('Got License Info', licenseInfo);
}).error((err) => {
  console.error('Error',err);
});
```

## License [MIT](LICENSE)
