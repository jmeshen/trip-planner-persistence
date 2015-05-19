var express = require('express');
var dayRouter = module.exports = express.Router();
var attractionRouter = express.Router();
var models = require('../models');
var Promise = require('bluebird');

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day.find(function(err, days) {
    	res.json({
    		days: days
    	});
    });
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    console.log('newDay req: ', req.body);

    var day = new models.Day({number: req.body.number});
    console.log(day);

	day.save(function(err, day) {
	      console.log(err);
	      if(err) return next(err);
	      res.json(200, day);
	    });
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    models.Day.findOne({_id: req.params.id}, function(err, aDay) {
    	res.json(aDay);
    });
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    models.Day.findOne({_id: req.params.id}, function(err, aDay) {
    	aDay.remove(function(err) {
    		if(err) return next(err);
    		res.status(200).end();
    	});

    });
});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
    console.log(req.body);
    models.Day.findOne({_id: req.body.day}, function(err, updDay) {
    	updDay.hotel = (req.body.hotel_id);
    	console.log(updDay);

    	updDay.save(function(err, updDay) {
	      console.log(err);
	      if(err) return next(err);
	      res.json(200, updDay);
	    });
    });

});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
    models.Day.findOne({_id: req.body.day}, function(err, dDay) {
    	dDay.hotel = undefined;

    	dDay.save(function(err, dDay) {
    		console.log(err);
    		if(err) return next(err);
    		res.json(200, dDay);
    	});
    });
})
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

