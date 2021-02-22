$( document ).ready(function() {



  var btcusd = 0;
  var btceur = 0;
  var btcgbp = 0;

  $.getJSON( "https://api.coindesk.com/v1/bpi/currentprice.json", function( data ) {



        console.log(data.bpi);
        btcusd = data.bpi.USD.rate_float;
        btceur = data.bpi.EUR.rate_float;
        btcgbp = data.bpi.GBP.rate_float;







      var input_sat, input_btc, input_usd, input_eur, input_gbp,
          output_sat, output_btc, output_usd, output_eur, output_yuan;







      $("#input_sat").keyup(function() {
          calc('sats');
      });

      $("#input_btc").keyup(function() {
          calc('btc');
      });

      $("#input_usd").keyup(function() {
          calc('usd');
      });


      $("#input_sat").change(function() {
          calc('sats');
      });

      $("#input_btc").change(function() {
          calc('btc');
      });

      $("#input_usd").change(function() {
          calc('usd');
      });

      calc();


      $("input").on("click", function () {
       $(this).select();
      });



      function calc(source){

        // /$("#satsusd").text(addCommas(btcusd100000000));


        if (source === undefined){

          input_sat = removeCommas($("#input_sat").val());
          console.log("-> " + input_sat);

          $("#input_sat").focus();

          output_sat = removeCommas(input_sat);
          output_btc = output_sat/100000000;
          output_usd = btcusd*output_btc;
          output_eur = output_btc*btceur;
          output_gdp = output_btc*btcgbp;





        } else{

          input_sat = removeCommas($("#input_sat").val());
          input_btc = removeCommas($("#input_btc").val());
          input_usd = removeCommas($("#input_usd").val());
          input_eur = removeCommas($("#input_eur").val());
          input_gbp = removeCommas($("#input_gbp").val());

          if (source == 'sats'){
              console.log('sats');
              output_sat = input_sat;
              output_btc = output_sat/100000000;
              output_usd = btcusd*output_btc;
              output_eur = output_btc*btceur;
              output_gdp = output_btc*btcgbp;
          } else if (source == 'btc'){
              console.log('btc');
              output_btc = input_btc;
              output_sat = output_btc*100000000;
              output_usd = btcusd*output_btc;
              output_eur = output_btc*btceur;
              output_gdp = output_btc*btcgbp;
          } else if (source == 'usd'){
              console.log('usd');
              output_usd = input_usd;
              output_sat = output_usd/(btcusd/input_usd)*100000000;
              output_btc = output_usd/(btcusd/input_usd);
              output_eur = output_btc*btceur;
              output_gdp = output_btc*btcgbp;
          }
        }


        output_sat = output_sat.toFixed(0);
        output_usd = output_usd.toFixed(2);
        output_eur = output_eur.toFixed(2);
        output_gdp = output_gdp.toFixed(2);




          $("#input_sat").val(addCommas(output_sat)).text(addCommas(output_sat));
          $("#input_btc").val(addCommas(output_btc)).text(addCommas(output_btc));
          $("#input_usd").val(addCommas(output_usd)).text(addCommas(output_usd));
          $("#input_eur").val(addCommas(output_eur)).text(addCommas(output_eur));
          $("#input_gbp").val(addCommas(output_gdp)).text(addCommas(output_gdp));


      }



      var satPerUSD = 1/(btcusd/1)*100000000;
      $("#satsusd").text( satPerUSD.toFixed(0) );


      function addCommas(x) {
          var parts = x.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
      }

      function removeCommas(x) {
        console.log('ddd' + x);
        if (typeof x === 'string' || x instanceof String){
          return parseFloat(x.replace(',', ''));
        }  else {
          return parseFloat(x);
        }

      }

});

});