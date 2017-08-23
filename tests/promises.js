const Bvckup2 = require('../');

// You should change this to your real API key
// or use environment variable BVCKUP2_API_KEY
const apiKey = 'api_secret_000011112222';
const bvckup2 = new Bvckup2(process.env.BVCKUP2_API_KEY || apiKey);
bvckup2.listAllLicensesAsync({}).then((licenses) => {
  if (licenses.length === 0) {
    throw new Error('no licenses');
  };
  console.log('Found',licenses.length,'licenses!');
  const license = licenses[licenses.length-1];
  console.log('Getting information about the last license with id:',license.id);
  return bvckup2.getLicenseAsync(license.id);
}).then((licenseInfo) => {
  console.log('Got License Info!');
  console.log(licenseInfo);
}).catch(Error('no licenses'), () => {
  console.log('No licenses Available!');
}).error((err) => {
  console.error('Error',err);
});
