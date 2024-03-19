document.addEventListener("DOMContentLoaded", function () {
    paypal.Buttons().render('#paypal-button-container');


});

function getUserCurrentLocation(map, marker) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            var coords = {
                lat: latitude,
                lng: longitude,
            }
            console.log(coords);
            map.setCenter(coords);
            map.setZoom(8);
            marker.setPosition(coords);
        }, () => {
            alert("Ocurrió un error")
        })
    } else {
        alert("Tu navegador no dispone de geo")
    }
}


function initMap() {
    var argCoords = { lat: -33.61, lng: -63.61 };
    var map = new google.maps.Map(mapDiv, {
        center: argCoords,
        zoom: 6,
    });
    var marker = new google.maps.Marker({
        position: argCoords,
        map,
    });


    button.addEventListener('click', () => {
        getUserCurrentLocation(map, marker)
    })

}