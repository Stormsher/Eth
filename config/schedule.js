/**
 * Created by jaumard on 27/02/2015.
 */
module.exports.schedule = {
  sailsInContext: true, //If sails is not as global and you want to have it in your task
  tasks: {
    //
    //   firstTask: {
    //       cron: "*/2 * * * * *",
    //     task: function(context, sails) {
    //       Ethereum.getInfo("", function(err, item) {
    /*
             var userHash = 1;
             var ethPrice = item.priceUsd;
             var netHashGH = (item.difficulty / item.blockTime) / 1e9;
             var blockTime = item.blockTime;
             var userRatio = userHash * 1e6 / (netHashGH * 1e9);
             var blocksPerMin = 60.0 / blockTime;
             var ethPerMin = blocksPerMin * 5.0;
             earnings = userRatio * ethPerMin * 60 * 24 * 30;

         });
         },
         context: {}
       }
       */
    priceEthereumUpdate: {
      cron: "*/5 * * * * *",
      task: function(context, sails) {
        Ethereum.getPrice("", function(err, item) {
          var ethereum = {
            usd: item.ethusd,
            btc: item.ethbtc
          };
          Info.create(ethereum).exec(function(err, item){
            if(err) sails.log(err);
            Info.publishCreate(item);
            sails.log(item);
          });
        });
      },
      context: {}
    }
  }
};
