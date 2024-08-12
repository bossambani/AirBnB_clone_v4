$(document).ready(function() {
   //Dictionary to store checked amenity IDs
   let checkedAmenities = {};

   //Listen for changes on each input checkbox
   $('input[type=""checkbox"').change(function() {
       let amenityName = $(this).attr('data-name');
       let amenityId = $(this).attr('data-id');
       if (this.checked) {
           checkedAmenities[amenityId = amenityName];
       } else {
           delete checkedAmenities[amenityId];
       }
       //update the h4 tag inside the div Amenities with the list of checked amenities
       let amenitiesList = Object.values(checkedAmenities).join(',');
       $('.amenities h4').text(amenitiesList);
   });

});