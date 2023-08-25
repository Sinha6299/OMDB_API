// public/scripts/main.js
$(document).ready(() => {
    const searchForm = $('#searchForm');
    const resultsContainer = $('#results');
  
    searchForm.submit(e => {
      e.preventDefault();
      const searchTerm = $('#search').val();
      fetchResults(searchTerm);
    });
  
    function fetchResults(searchTerm) {
      const apiKey = 'f0ecd509';
      const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
  
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => displayResults(data.Search));
    }
  
    function displayResults(results) {
      resultsContainer.empty();
  
      results.forEach(result => {
        const resultDiv = `
          <div class="result">
            <img src="${result.Poster}" alt="${result.Title}">
            <h2>${result.Title}</h2>
            <p>Year: ${result.Year}</p>
            <p>Type: ${result.Type}</p>
            <button class="btn btn-success favorite-btn"
              data-title="${result.Title}"
              data-year="${result.Year}"
              data-type="${result.Type}"
              data-poster="${result.Poster}">
              Favorite
            </button>
          </div>
        `;
        resultsContainer.append(resultDiv);
      });
    }
  
    resultsContainer.on('click', '.favorite-btn', function () {
      const title = $(this).data('title');
      const year = $(this).data('year');
      const type = $(this).data('type');
      const poster = $(this).data('poster');
  
      $.post('/favorite', { title, year, type, poster }, () => {
        alert('Added to favorites!');
      });
    });
  });
  