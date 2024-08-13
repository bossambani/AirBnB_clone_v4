$(document).ready(function() {
  // Dictionary to store checked amenity IDs
  let checkedAmenities = {};

  // Listen for changes on each input checkbox
  $('input[type="checkbox"]').change(function() {
      let amenityName = $(this).attr('data-name');
      let amenityId = $(this).attr('data-id');
      if (this.checked) {
          checkedAmenities[amenityId] = amenityName;
      } else {
          delete checkedAmenities[amenityId];
      }
      // Update the h4 tag inside the div Amenities with the list of checked amenities
      let amenitiesList = Object.values(checkedAmenities).join(', ');
      $('.amenities h4').text(amenitiesList);
  });

  // Function to fetch places based on checked amenities
  function fetchPlaces() {
      $.ajax({
          type: 'POST',
          url: 'http://0.0.0.0:5001/api/v1/places_search/',
          contentType: 'application/json',
          data: JSON.stringify({
              amenities: Object.keys(checkedAmenities)
          })
      }).done(function(data) {
          // Clear previous content
          $('section.places').empty();

          for (const place of data) {
              const template = `<article>
                  <div class="title">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                  </div>
                  <div class="information">
                      <div class="max_guest">
                          <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                          <br />${place.max_guest} Guests
                      </div>
                      <div class="number_rooms">
                          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                          <br />${place.number_rooms} Bedrooms
                      </div>
                      <div class="number_bathrooms">
                          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                          <br />${place.number_bathrooms} Bathroom
                      </div>
                  </div>
                  <div class="description">${place.description}</div>
              </article> <!-- End 1 PLACE Article -->`;
              $('section.places').append(template);
          }
      }).fail(function(xhr, status, error) {
          console.error('Error fetching places:', error);
      });
  }

  // Listen for click events on the search button
  $('#search_button').click(function() {
      fetchPlaces();
  });
});
