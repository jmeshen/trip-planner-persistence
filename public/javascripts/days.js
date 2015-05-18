var days = []
var currentDay

var Day = function() {
  this.dayNum = days.length + 1
  this.drawDayBtn()
  this.drawDayPanel()
  this.hotels = []
  this.restaurants = []
  this.thingsToDo = []
  this.markers = []
}

Day.prototype.clearMarkersFromMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(null)
  })
}
Day.prototype.addMarkersToMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(map)
  })
}

Day.prototype.drawDayPanel = function() {
  this.$dayPanel = templates.get('day-panel')
  this.$dayPanel.append(this.dayNum)
}

Day.prototype.addActivity = function(type, activity) {
  var $list = $('#itinerary  .' + type + '-group')
  $listItem = templates.get('itinerary-item')
  $listItem.find('.title').text(activity.name)
  $list.append($listItem)
  var marker = drawLocation(activity.place[0].location)
  this.markers.push(marker)
  //find the right ul
  //get a new template
  //populate it
  //put it in the right ul
}

Day.prototype.drawDayBtn = function() {
  var self = this

  var $dayBtn = templates.get('day-btn')//$('<button class="btn btn-circle day-btn">' + this.dayNum + '</button>')
  $dayBtn.text(this.dayNum)
  $('#add-day').before($dayBtn)

  $dayBtn.on('click', function() {
    if(currentDay) currentDay.clearMarkersFromMap()
    currentDay = self
    currentDay.addMarkersToMap()
    $('#itinerary #day-panel').replaceWith(self.$dayPanel)
  })
}

$('#add-day').on('click', function() {
  var newDay = new Day();
  

  $.ajax({
    type: 'POST',
    url: '/days',
    data: {number: newDay.dayNum},
    success: function(day) {
      console.log('hey this is a post request');
      days.push(day);
      console.log(days);
    }
  })


// $.post( "/days", 'data', function( data ) {
//     console.log('data',data);
//     // $( ".result" ).html( data );
//   });
})

var dayTarget = currentDay.dayNum.toString()


$("#day-destroyer").on("click", function() {
  // var dayTarget = currentDay.dayNum.toString();
  $.ajax({
    type: 'DELETE',
    url: '/days/' + dayTarget,
    data: {number: dayTarget},
    success: function(res) {
      console.log("delete successful");
    }
  })
})

// $('[data-type="hotels"]').on("click", function() {
//   $(this).
//   $.ajax({
//     type: 'POST',
//     url: '/days/dayTarget/hotel',
//     // data: {hotel: },
//     success: function(res) {
//       console.log('hey this is a post request');
//     }
//   })
// })


