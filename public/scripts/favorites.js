// public/scripts/favorites.js
$(document).ready(() => {
    fetch('/favorites')
      .then(response => response.json())
      .then(data => displayFavorites(data));
  
    function displayFavorites(favorites) {
      const favoritesContainer = $('#favorites');
      favoritesContainer.empty();
  
      favorites.forEach(favorite => {
        const favoriteDiv = `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${favorite.poster}" alt="${favorite.title} Poster" class="img-fluid">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${favorite.title}</h5>
                  <p class="card-text">Year: ${favorite.year}</p>
                  <p class="card-text">Type: ${favorite.type}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        favoritesContainer.append(favoriteDiv);
      });
    }
  });
  