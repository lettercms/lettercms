import countries from 'i18n-iso-countries';

export default async function SetView(req, res) {

  const {
    headers
  } = req;

  const country = headers['x-vercel-ip-country'];

  const countryName = country ? countries.getName(country, 'es') : 'Unknown';

  res.json({
    country,
    countryName
  });
};
