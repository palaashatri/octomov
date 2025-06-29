document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      resultsDiv.textContent = 'Loading...';
      try {
        const res = await fetch(`/api/results?search=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.data && json.data.Search) {
          resultsDiv.textContent = ''; // Clear previous results
          const heading = document.createElement('h2');
          heading.textContent = `Results for "${query}"`;
          resultsDiv.appendChild(heading);
          const list = document.createElement('ul');
          json.data.Search.forEach(movie => {
            const listItem = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = movie.Title;
            listItem.appendChild(strong);
            listItem.appendChild(document.createTextNode(` - ${movie.Year} `));
            const link = document.createElement('a');
            link.textContent = 'Read More!';
            link.href = `/details.html?id=${movie.imdbID}`;
            listItem.appendChild(link);
            list.appendChild(listItem);
          });
          resultsDiv.appendChild(list);
        } else {
          resultsDiv.textContent = 'No results found.';
        }
      } catch (err) {
        resultsDiv.textContent = 'Error fetching results.';
      }
    });
  }
});
