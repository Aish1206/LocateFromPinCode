mainApp.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
         scope.directiveCtrlCalled = false;
          angular.extend(scope.options, {
        directiveFunction: function(x){
            var Lat = x.Latitude;
            var Long = x.Longitude;
            var State = x.State;
            var City = x.City;
            var City_lat_long = City+", "+Lat+", "+Long;
        setMarker(map, new google.maps.LatLng(Lat, Long), State, City_lat_long);
          scope.directiveCtrlCalled = true;   
          
        }
      });
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(35.79, -105.99),
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        // show the map and place some markers
        initMap();
        
        setMarker(map, new google.maps.LatLng(35.79, -105.99), 'New Mexico', 'Santa Fe, 35.79, -105.99');
        
        
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link,
        scope: { options: '='}
    };
});