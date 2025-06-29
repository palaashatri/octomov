document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      resultsDiv.innerHTML = 'Loading...';
      try {
        const res = await fetch(`/api/results?search=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.data && json.data.Search) {
          resultsDiv.innerHTML = `<h2>Results for "${query}"</h2><ul>` +
            json.data.Search.map(movie =>
              `<li><strong>${movie.Title}</strong> - ${movie.Year} <a href="/details.html?id=${movie.imdbID}">Read More!</a></li>`
            ).join('') + '</ul>';
        } else {
          resultsDiv.innerHTML = 'No results found.';
        }
      } catch (err) {
        resultsDiv.innerHTML = 'Error fetching results.';
      }
    });
  }
});
