document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');

  function searchAndRender(query) {
    if (!query) return;
    resultsDiv.textContent = 'Loading...';
    let currentPage = 1;
    let totalPages = 1;
    async function fetchAndRender(page) {
      try {
        const res = await fetch(`/api/results?search=${encodeURIComponent(query)}&page=${page}`);
        const json = await res.json();
        if (json.data && json.data.Search) {
          resultsDiv.textContent = '';
          const heading = document.createElement('h2');
          heading.textContent = `Results for "${query}"`;
          resultsDiv.appendChild(heading);
          // Table for results
          const table = document.createElement('table');
          table.className = 'results-table';
          const thead = document.createElement('thead');
          thead.innerHTML = '<tr><th>Poster</th><th>Title</th><th>Year</th><th>Plot</th></tr>';
          table.appendChild(thead);
          const tbody = document.createElement('tbody');
          // For each movie, fetch short plot
          await Promise.all(json.data.Search.map(async movie => {
            const tr = document.createElement('tr');
            // Poster
            const posterTd = document.createElement('td');
            posterTd.setAttribute('data-label', 'Poster');
            if (movie.Poster && movie.Poster !== 'N/A') {
              const poster = document.createElement('img');
              poster.src = movie.Poster;
              poster.alt = `${movie.Title} Poster`;
              poster.className = 'movie-poster';
              posterTd.appendChild(poster);
            }
            tr.appendChild(posterTd);
            // Title (with link)
            const titleTd = document.createElement('td');
            titleTd.setAttribute('data-label', 'Title');
            const link = document.createElement('a');
            link.textContent = movie.Title;
            link.href = `/details.html?id=${movie.imdbID}`;
            titleTd.appendChild(link);
            tr.appendChild(titleTd);
            // Year
            const yearTd = document.createElement('td');
            yearTd.setAttribute('data-label', 'Year');
            yearTd.textContent = movie.Year;
            tr.appendChild(yearTd);
            // Short Plot (fetch details)
            const plotTd = document.createElement('td');
            plotTd.setAttribute('data-label', 'Plot');
            try {
              const detailsRes = await fetch(`/api/details?id=${movie.imdbID}`);
              const detailsJson = await detailsRes.json();
              plotTd.textContent = detailsJson.movie && detailsJson.movie.Plot ? detailsJson.movie.Plot.substring(0, 120) + (detailsJson.movie.Plot.length > 120 ? '...' : '') : '';
            } catch {
              plotTd.textContent = '';
            }
            tr.appendChild(plotTd);
            tbody.appendChild(tr);
          }));
          table.appendChild(tbody);
          resultsDiv.appendChild(table);
          // Pagination controls
          totalPages = Math.min(Math.ceil(Number(json.data.totalResults || 0) / 10), 100);
          if (totalPages > 1) {
            const pagination = document.createElement('div');
            pagination.className = 'pagination';
            if (page > 1) {
              const prev = document.createElement('button');
              prev.textContent = 'Previous';
              prev.onclick = () => fetchAndRender(page - 1);
              pagination.appendChild(prev);
            }
            for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) {
              const btn = document.createElement('button');
              btn.textContent = p;
              if (p === page) btn.disabled = true;
              btn.onclick = () => fetchAndRender(p);
              pagination.appendChild(btn);
            }
            if (page < totalPages) {
              const next = document.createElement('button');
              next.textContent = 'Next';
              next.onclick = () => fetchAndRender(page + 1);
              pagination.appendChild(next);
            }
            resultsDiv.appendChild(pagination);
          }
        } else {
          resultsDiv.textContent = 'No results found.';
        }
      } catch (err) {
        resultsDiv.textContent = 'Error fetching results.';
      }
    }
    fetchAndRender(1);
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = input.value.trim();
      searchAndRender(query);
    });
  }

  // Listen for search param in URL (for actor/director/linked searches)
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    input.value = searchParam;
    searchAndRender(searchParam);
  }
});
