//global object created to allow us to use this everywhere on the client side
 maps = {
    // map object
    map: null,
 
    // mapbox markers objects
    markers: [],
 
    // mapbpx lat lng objects
    latLngs: [],
 
    // our formatted marker data objects
    //will be use to keep track of what has been loaded and not loaded
    markerData: [],

    //initialize the map. important: use session var to know if we already init so that map is rendered everytime we receive new data on the wire
    initialize: function(lat, lng) {
        console.log("Initializing Maps...");
        var mapNode = $("#map_canvas")[0];
        var mapOptions = {
            infoControl: true, //will use to show reatime CO2 offsets
            accessToken: 'pk.eyJ1Ijoiem9yb3N0YW5nIiwiYSI6Im5nM1VzUTgifQ.05dq1c1AqclDOBiIJ6Dgog',
            center: new L.LatLng(lat, lng),
            zoom: 12,
            zoomControl: false
        };
        this.map = new L.mapbox.map(mapNode,'zorostang.him49njf',mapOptions);
    },
    //add a marker given our formatted marker data object
    addDriverMarker: function (marker) {
        var driverIcon = L.AwesomeMarkers.icon({
            icon: 'beer',
            prefix: 'fa',
            markerColor: 'black',
            iconColor: 'yellow'
        });
        var mLatLng = new L.LatLng(marker.lat,marker.lng);
        var mMarker = new L.Marker(
            //mapbox options object
            mLatLng, {
            id: marker.id,
            icon: driverIcon, 
            clickable: true,
            draggable: false,
            keyboard: true,
            title: marker.fname, 
            alt: 'Driver', //alt atribute for the icon img
            opacity: 1.0,
            zIndexOffeset: 100,
            riseOnHover: true,
            riseOffset: 250, //zIndex of riseOnHover
        }).addTo(this.map);
        
        this.latLngs.push(mLatLng);
        this.markers.push(mMarker);
        this.markerData.push(marker);
        return mMarker;
    },
    //function to calc the bounding box, the area of the map to center on
    calcBounds: function() {
        var bounds = new L.LatLngBounds();
        for (var i=0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },
    //check if a marker already exists. returns the markerId that matches val, otherwise returns 'undefined'
    markerExists: function(key, val) {
        var result = false;
        _.each(this.markers, function(element, index, list) {
            if (element.options[key] == val) {
                result = true;
            }  
        });
        return result;
        
    },
    drawRoute: function(path, options) {
        var polyline = L.polyline(path, options).addTo(this.map)
    }
}