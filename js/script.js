

$( document ).ready(function() {
	Inputmask().mask(document.querySelectorAll("input"));

	var $currency_inputs = $(".value-input"),
		$btc_input = $(".bitcoin"),
		currency,
		btc_max_stock = 21000000

	$.getJSON( "https://api.coindesk.com/v1/bpi/currentprice.json", function( data ) {

		var RateToBTC = {
			sat: 100000000,
			btc: 1,
			usd: data.bpi.USD.rate_float,
			eur: data.bpi.EUR.rate_float,
			gbp: data.bpi.GBP.rate_float
		};

		calcConversion();



		function calcConversion(source_val, source_currency){

			var	btc_input_value = parseFloat($btc_input.val().replace(/,/g, '')).toFixed(8);
			
			//set BTC max if user is editing BTC input 
			if( btc_input_value > btc_max_stock ){
				btc_input_value = btc_max_stock
				$btc_input.val(btc_max_stock)
			}


			// Get convertion to BTC from the current currency

			if(source_currency == "sat"){
				$btc_input.val( parseFloat(source_val / RateToBTC[source_currency]).toFixed(8) );
			} 
			else if(source_currency == "btc"){
				btc_input_value = btc_input_value;
			}
			else if(source_currency == "usd" || source_currency == "eur" || source_currency == "gbp"){
				console.log(RateToBTC[source_currency])
				$btc_input.val(  parseFloat(source_val) / parseFloat(RateToBTC[source_currency]) );
			}	

			// Updates BTC value
			btc_input_value = parseFloat($btc_input.val().replace(/,/g, '')).toFixed(8);
			
			// Updates all inputs depending on its rate to BTC
			$(".value-input:not('.active, .bitcoin')").each(function(){
				currency = $(this).data("currency");
				$(this).val( RateToBTC[currency] * btc_input_value );
			})

		};	
		
		$currency_inputs.keyup(function(e) {
			
			var source_val = parseFloat($(this).val().replace(/,/g, '')).toFixed(8),
				source_currency = $(this).data("currency");		
			
			$(this).addClass("active");
			calcConversion( source_val, source_currency );
				
		})

		$currency_inputs.blur(function() {
			$(this).removeClass("active");
		});

	})	

})
