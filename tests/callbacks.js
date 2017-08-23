const Bvckup2 = require('../');

// You should change this to your real API key
// or use environment variable BVCKUP2_API_KEY
const apiKey = 'api_secret_000011112222';
const bvckup2 = new Bvckup2(process.env.BVCKUP2_API_KEY || apiKey);
bvckup2.listAllLicenses({}, (err, licenses) => {
  if (err) return console.error('Error',err);
  if (licenses.length === 0) {
    return console.error('No licenses available');
  }
  console.log('Found',licenses.length,'licenses!');
  const license = licenses[licenses.length-1];
  console.log('Getting information about the last license with id:',license.id);
  bvckup2.getLicense(license.id, (err, licenseInfo) => {
    if (err) return console.error('Error',err);
    console.log('Got License Info!');
    console.log(licenseInfo);
  });
});
