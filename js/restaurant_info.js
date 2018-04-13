let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
};

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
      callback(null, self.restaurant);
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
      error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
};

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

    const picture = document.querySelector('#restaurant-container picture');

    const image = document.createElement('img');
    image.className = 'restaurant-img';
    imageLocation = setImageLocation(DBHelper.imageUrlForRestaurant(restaurant));
    setImageSrc(image, imageLocation);
    setImageAlt(image, restaurant.name);
    setImagesForDifferentWindowSizes(picture, imageLocation, 'restaurant');
    image.id = 'restaurant-img';
    picture.append(image);
  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

    //setting the review form resturant id
    document.getElementById("addReviewForm").setAttribute("data-id", restaurant.id);
    document.getElementById("FavoriteButton").setAttribute("data-id", restaurant.id);

    //setting favorite
    document.getElementById('FavoriteButton').checked = restaurant.is_favorite;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
    const title = document.createElement('h4');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

formData = () => {
    let id = document.querySelector('#addReviewForm').dataset.id;
    let rating = document.querySelector('#addReviewForm input#number').value;
    let comment = document.querySelector('#addReviewForm #comment').value;
    let name = document.querySelector('#addReviewForm input#name').value;
    return {id: id, rating: rating, comments: comment, name: name};
};
pushReview = () => {
    var header = new Headers({
        'Content-Type': 'application/json',
    });
    var restaurant = formData();
    let url = DBHelper.DATABASE_URL + 'reviews/';
    fetch(url, {
        method: 'post',
        headers: header,
        body: JSON.stringify(restaurant)
    }).then(function (response) {
        return response.json();
    }).then(function () {
        clearInputs('addReviewForm');
    }).catch(function (error) {
        store.outbox('readwrite').then(function (outbox) {
            return outbox.put({data: restaurant, type: 'review', url: url, method: 'post'});
        });
        clearInputs('addReviewForm');
        console.log((`Request failed. Returned status of ${error}`), null);
    });


};
markAsFavorite = () => {
    let resturantId = document.getElementById("FavoriteButton").dataset.id;
    let state = document.getElementById('FavoriteButton').checked;
    var header = new Headers({
        'Content-Type': 'application/json',
    });
    let url = `${DBHelper.DATABASE_URL}restaurants/${resturantId}/?is_favorite=${state}`;
    fetch(url, {
        method: 'put',
        headers: header
    }).then(function (response) {
        return response.json();
    }).then(function (restaurants) {
        console.log(restaurants);
    }).catch(function (error) {

        store.outbox('readwrite').then(function (outbox) {
            return outbox.put({data: url, type: 'favorite', method: 'post', url: url});
        });
        console.log((`Request failed. Returned status of ${error}`), null);
    });
};

clearInputs = (parentID) => {
    let AllChildInputs = document.querySelectorAll(`#${parentID} input ,#${parentID} textarea`);
    for (let i = 0; i < AllChildInputs.length; i++) {
        AllChildInputs.value = "";
    }
};