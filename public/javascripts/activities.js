var $hotelAdder = $('#hotel-adder'),
    $restaurantAdder = $('#restaurant-adder'),
    $thingsToDoAdder = $('#thingsToDo-adder');

var setupOptions = function() {

  rawData.hotels.forEach(function(h) {

    var $option = $('<option>')
      .text(h.name)
      .attr('value', h._id)

    $hotelAdder
      .find('select')
      .append($option)
  })

  rawData.restaurants.forEach(function(r) {

    var $option = $('<option>')
      .text(r.name)
      .attr('value', r._id)

    $restaurantAdder
      .find('select')
      .append($option)
  })

  rawData.thingsToDo.forEach(function(t) {

    var $option = $('<option>')
      .text(t.name)
      .attr('value', t._id)

    $thingsToDoAdder
      .find('select')
      .append($option)
  })
}

setupOptions()

$('.add-activity').on('click', function() {
  $this = $(this)
  var type = $this.attr('data-type') //replace
  var id = $this.siblings('select').val() //replace
  var activity = data.get(type, id)
  currentDay[type].push(activity)

  currentDay.addActivity(type, activity)

  var dayTarget = currentDay.dayNum.toString();
  // var curDayID
  days.forEach(function(day){
    if(day.number.toString() === dayTarget) {
      curDayID = day._id;
    }
  });

  console.log(type, id, activity, curDayID);
  $.ajax({
    type: 'POST',
    url: '/days/'+curDayID+'/hotel',
    data: {day: curDayID,
      hotel_name: activity.name,
      hotel_id: id
    },

    // console.log(data),
    success: function(res) {
      console.log('hey this is a post request');
    }
  });

  // currentDay.addActivity(type, activity)
  //find the activity id assoc w/ button
  //find correct activity object
  //put the activity in the day somehow
});

