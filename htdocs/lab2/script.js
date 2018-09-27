$(document).ready(function() {
	setTimeout(function() {
		$('#cityField').keyup(function() {
			var url =
				'http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=' +
				$('#cityField').val();
			$.getJSON(url, function(data) {
				var everything;
				everything = '<ul>';
				$.each(data, function(i, item) {
					everything += '<li> ' + data[i].city;
				});
				everything += '</ul>';
				$('#txtHint').html(everything);
			});
		});
		$('#weatherButton').click(function(evt) {
			$('#displayCity').html($('#cityField').val());
			evt.stopPropagation();
			evt.preventDefault();
			var myurl =
				'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7f055fef5aa7fae938d6d6faf0e4c972&q=';
			myurl += $('#cityField').val();
			$.ajax({
				url: myurl,
				dataType: 'json',
				success: function(parsed_json) {
					var location = parsed_json['name'];
					var weather = parsed_json['weather'][0]['main'];
					var temp = parsed_json['main']['temp'];
					var weather_icon = parsed_json['weather'][0]['icon'];
					var humidity = parsed_json['main']['humidity'];
					var temp_min = parsed_json['main']['temp_min'];
					var temp_max = parsed_json['main']['temp_max'];
					var wind_speed = parsed_json['wind']['speed'];
					everything =
						'<img src="http://openweathermap.org/img/w/' +
						weather_icon +
						'.png"/>';
					everything += '<span>Location: ' + location + '</span>';
					everything +=
						' <span>Weather: ' + weather + ' (' + temp + '&#8457;)' + '</span>';
					everything +=
						' <span>Low: ' +
						temp_min +
						'&#8457;</span> <span>High: ' +
						temp_max +
						'&#8457;</span>';
					everything += ' <span>Humidity: ' + humidity + '%' + '</span>';
					everything += ' <span>Wind: ' + wind_speed + ' mph' + '</span>';
					$('#weather').html(everything);
				}
			});
			$('#modal').iziModal('close');
		});
	}, 500);

	$('#stack-overflow-query').click(function() {
		var url =
			'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=' +
			$('#stack-overflow-topic').val();
		$.getJSON(url, function(data) {
			var list = $('#stack-overflow-results');
			var results = '';
			$.each(data.items, function(i, item) {
				results +=
					'<div class="card"> ' +
					'<a href="' +
					data.items[i].link +
					'"><img src="' +
					data.items[i].owner.profile_image +
					'">' +
					'<h4>' +
					data.items[i].title +
					'</h4>' +
					'<div class="stats"><div class="answers">Answers: ' +
					data.items[i].answer_count +
					'</div>' +
					'<div class="views">Views: ' +
					data.items[i].view_count +
					'</div></div>' +
					'<div class="tags">' +
					data.items[i].tags.join(', ') +
					'</div>' +
					'</a></div>';
			});
			list.html(results);
		});
	});

	$('#modal').iziModal();
});
