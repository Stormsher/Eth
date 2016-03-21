/**
 * InfoController
 *
 * @description :: Server-side logic for managing Infoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
moment = require('moment');
module.exports = {
	graph: function(req,res) {
		var now = moment().toISOString();
		var last = moment().subtract(1, 'hours').toISOString();
		Info.find({createdAt: {'<':now, '>':last}}).exec(function(err,items){
			if (err) res.send(err);
			counter = 0;
			var avg = [];
			result = [];
			var sum;
			var last;
			items.forEach(function(item){
				avg.push(item.usd);
				last = item.usd;
				counter++;
				if (counter==1) {
					counter = 0;
					avg.forEach(function(item){
						sum += Number(item);
					});
					var us = {
						usd: sum/1,
						time: item.createdAt
					}
					sum = 0;
					avg = [];
					result.push(us);
				}
			});
			return res.send({graph:result, last:last});
		});
	}
};
