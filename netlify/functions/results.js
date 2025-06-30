const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apikey = process.env.API_KEY;
  const query = event.queryStringParameters.search;
  const page = event.queryStringParameters.page || 1;
  const url = `http://omdbapi.com/?s=${query}&apikey=${apikey}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ data, query, page: Number(page) })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
