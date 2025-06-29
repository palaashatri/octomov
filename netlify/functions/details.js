const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apikey = process.env.API_KEY;
  const imdbID = event.queryStringParameters.id;
  const url = `http://omdbapi.com/?i=${imdbID}&apikey=${apikey}`;

  try {
    const response = await fetch(url);
    const movie = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ movie, url })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch movie details' })
    };
  }
};
