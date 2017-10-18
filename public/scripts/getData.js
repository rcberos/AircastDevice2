function temp10GetData($http, $scope){
	console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp10'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
			console.log('news query');

			console.log(item);
			var dum = item.tempSrc.source.split('/');
			console.log(dum);
			var source = dum[1];
			item.source = source;
			// for(var i=0; i< $scope.templates.length; i++){
			// 	console.log()
			// 	if($scope.templates[i].Template == 'temp10'){
			// 		console.log('NEWWWS');
			// 		var dum = $scope.templates[i].tempSrc.source.split('/');
			// 		source = dum[1];
			// 		console.log('source: '+source);
			// 	}
			// }

			$http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 10 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			// $scope.TemplateData[i].source = source;
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})

			
}


function temp11GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp11'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

	    var restaurantList = [];
	    var restaurantNameList = [];
	    var tempCount, counter = 0;

	    var config = {
	        'lat': 14.609695,
	        'long': 121.0747,
	        'zomatoConfig':  {
	            headers : {
	                'user-key': '1e3481187e26de091dfdb5f7f768312a',
	                'Accept': 'application/json;odata=verbose'
	            }   
	        }
	    };

	    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

	        fetchRestaurantData(config.url);


	        function fetchRestaurantData(url){

	            var currentTimeStamp = moment().unix() + 2592000;
	           $http.get(url,config.zomatoConfig)
	           .then(function(response) {

	                  if (response.data) {

	                    var restaurants = response.data.nearby_restaurants;

	                    for (var i = 0 ; i < restaurants.length; i++) {

	                      if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
	                        restaurantNameList.push(restaurants[i].restaurant.name);
	                        restaurantList.push(restaurants[i]);
	                      }
	                    }

	                      if (restaurantList.length < 100) {
	                        checkIfListReach50(restaurantList.length);
	                      }else{
	                      	saveData(restaurantList);
	                      }
	                      
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	       }

	        function checkIfListReach50(restaurantListLength){

	           var currentTimeStamp = moment().unix() + 2592000;
	           console.log(restaurantListLength);

	            config.lat += .01;

	            if (tempCount == restaurantListLength) {
	              config.long += 0.01;
	              counter++;
	            }else {
	              tempCount = restaurantListLength;
	              counter = 0;
	            }
	            if (counter > 5) {
	            	saveData(restaurantList);
	            }else {
	              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
	              fetchRestaurantData(url);
	            }

	        }

	        function saveData(dummy){

	        	 for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp11'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			localStorage.setItem('restaurant-position', 0);
		        			console.log('Get Data Temp Data 11');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}

	        }

			}
		})
				
}

function temp12GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp12'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1720841&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Cainta&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1720841&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp12'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})

			

}


function temp13GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp13'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp13'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}



function temp14GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp14'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('/api/twitter')
		              .then(function(response) {
		              		if (response.status == 200 && response.data.length == 5) {
			              		console.log(response);
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp14'){
										item.TempData = response.data;
										item.lastTweet = 0;
										item.lastArray = 0;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 14');
					        			console.log(item);
									}
								})
		              		}
		              })
		}
	})

			
}


function temp15GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp15'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/hugot.php')
		              .then(function(response) {
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp15'){
										item.TempData = response.data;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 15');
					        			console.log(item);
									}
								})
		              		
		              })
		}
	})

}

function temp16GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp16'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp16'){
									item.TempData = response.data;
									console.log("movies data: ");
									console.log(response.data);
									item.moviePosition = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 16');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}




function temp17GetData($http, $scope){
	// console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp17'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
			console.log('news query');

			console.log(item);
			var dum = item.tempSrc.source.split('/');
			console.log(dum);
			var source = dum[1];
			item.source = source;
			// for(var i=0; i< $scope.templates.length; i++){
			// 	console.log()
			// 	if($scope.templates[i].Template == 'temp10'){
			// 		console.log('NEWWWS');
			// 		var dum = $scope.templates[i].tempSrc.source.split('/');
			// 		source = dum[1];
			// 		console.log('source: '+source);
			// 	}
			// }

			$http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 17 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			// $scope.TemplateData[i].source = source;
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})
	
}

function temp18GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp18'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp18'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})
}



function temp20GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp20'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('/api/twitter')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp20'){
									item.TempData = response.data;
									item.lastTweet = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									// console.log('Get Data Temp Data 14');
				        			console.log(item);
								}
							})
		              })
		}
	})
}



function temp23GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp23'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

	    var restaurantList = [];
	    var restaurantNameList = [];
	    var tempCount, counter = 0;

	    var config = {
	        'lat': 14.609695,
	        'long': 121.0747,
	        'zomatoConfig':  {
	            headers : {
	                'user-key': '1e3481187e26de091dfdb5f7f768312a',
	                'Accept': 'application/json;odata=verbose'
	            }   
	        }
	    };

	    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

	        fetchRestaurantData(config.url);


	        function fetchRestaurantData(url){

	            var currentTimeStamp = moment().unix() + 2592000;
	           $http.get(url,config.zomatoConfig)
	           .then(function(response) {

	                  if (response.data) {

	                    var restaurants = response.data.nearby_restaurants;

	                    for (var i = 0 ; i < restaurants.length; i++) {

	                      if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
	                        restaurantNameList.push(restaurants[i].restaurant.name);
	                        restaurantList.push(restaurants[i]);
	                      }
	                    }

	                      if (restaurantList.length < 5) {
	                        checkIfListReach50(restaurantList.length);
	                      }else{
	                      	saveData(restaurantList);
	                      }
	                      
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	       }

	        function checkIfListReach50(restaurantListLength){

	           var currentTimeStamp = moment().unix() + 2592000;
	           console.log(restaurantListLength);

	            config.lat += .01;

	            if (tempCount == restaurantListLength) {
	              config.long += 0.01;
	              counter++;
	            }else {
	              tempCount = restaurantListLength;
	              counter = 0;
	            }

	            if (counter > 5) {
	            	saveData(restaurantList);
	            }else {

	              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
	              fetchRestaurantData(url);
	            }

	        }

	        function saveData(dummy){

	        	 for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp23'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			localStorage.setItem('restaurant-position', 0);
		        			console.log('Get Data Temp Data 23');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}

	        }

			}
		})
}


function temp22GetData($http, $scope){

		$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp22'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/hugot.php')
		              .then(function(response) {
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp22'){
										item.TempData = response.data;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 22');
					        			console.log(item);
									}
								})
		              		
		              })
		}
	})

}



function temp19GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp19'&&(!item.hasData||item.lastQuery < (Date.now()-360000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp19'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}


function temp24GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp24'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp24'){
									item.TempData = response.data;
									console.log(response.data);
									item.moviePosition = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 24');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}

function temp25GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp25'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/ikomai_guest.php')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp25'){
									item.TempData = response.data;
									console.log(response.data);
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 25');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}
