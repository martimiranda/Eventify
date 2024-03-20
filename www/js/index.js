document.addEventListener("DOMContentLoaded", function () {
    paypal.Buttons().render('#paypal-button-container');

});

function getUserCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                const coords = { lat: latitude, lng: longitude };
                console.log(coords);
                resolve(coords);
            }, () => {
                reject("Error al obtener la ubicación");
            });
        } else {
            reject("El navegador no admite geolocalización");
        }
    });
}

// Inicializar mapa
function initMap() {
    var map = new google.maps.Map(mapDiv, {
        zoom: 3,
    });
    var marker = new google.maps.Marker({
        map,
    });


    getUserCurrentLocation()
        .then(coords => {
            map.setCenter(coords);
            map.setZoom(12);
            marker.setPosition(coords);

            // Llamar a la función getNearestCity con las coordenadas obtenidas
            getNearestCity(coords.lat, coords.lng)
                .then(nearestCity => {
                    console.log('La ciudad más cercana es: ' + nearestCity);
                    var cityInfo = document.getElementById("cityInput");

                    cityInfo.textContent = nearestCity;
                })
                .catch(error => {
                    console.error('Error al obtener la ciudad más cercana:', error);
                });
        })
        .catch(error => {
            console.error(error);
            // Usa coordenadas por defecto si hay un error al obtener la ubicación
            var defaultCoords = { lat: -33.61, lng: -63.61 };
            map.setCenter(defaultCoords);
            map.setZoom(6);
            marker.setPosition(defaultCoords);
        });


    var geocoder = new google.maps.Geocoder();

    var searchBar = document.getElementById('searchBar');

    var searching = false; // Variable de control para evitar múltiples búsquedas


    // Evento blur para buscar cuando el usuario sale del campo de entrada
    searchBar.addEventListener('blur', function () {
        var address = searchBar.value.trim(); // Eliminar espacios en blanco al principio y al final
        if (address !== '' && !searching) { // Verificar si el campo no está vacío y no se está realizando otra búsqueda
            searching = true; // Indicar que se está realizando una búsqueda
            geocodeAddress(address, geocoder, map);
        } else {
            searching = false;
        }
    });

    // Evento keydown para buscar cuando el usuario presiona la tecla Enter
    searchBar.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            var address = searchBar.value.trim(); // Eliminar espacios en blanco al principio y al final
            if (address !== '' && !searching) { // Verificar si el campo no está vacío y no se está realizando otra búsqueda
                searching = true; // Indicar que se está realizando una búsqueda
                geocodeAddress(address, geocoder, map);
            } else {
                searching = false;
            }
        }
    });

    function geocodeAddress(address, geocoder, map) {

        marker.setMap(null);

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                // Obtener la ubicación del primer resultado
                var location = results[0].geometry.location;
                map.setCenter(location); // Centrar el mapa en la ubicación obtenida
                map.setZoom(12); // Establecer el nivel de zoom del mapa
                var marker = new google.maps.Marker({
                    map: map,
                    position: location
                });

                var cityInfo = document.getElementById("cityInput");

                cityInfo.textContent = address;

            }
        });
    }


}

function getNearestCity(latitude, longitude) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(latitude, longitude);

        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    // Analizar los resultados para encontrar la ciudad más cercana
                    let nearestCity = null;
                    results[0].address_components.forEach(component => {
                        if (component.types.includes('locality')) {
                            nearestCity = component.long_name;
                        }
                    });
                    resolve(nearestCity);
                } else {
                    reject('No se encontraron resultados de geocodificación.');
                }
            } else {
                reject('Geocodificación fallida debido a: ' + status);
            }
        });
    });
}

