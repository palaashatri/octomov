const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apikey = process.env.API_KEY;
  const query = event.queryStringParameters.search;
  const url = `http://omdbapi.com/?s=${query}&apikey=${apikey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ data, query })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
