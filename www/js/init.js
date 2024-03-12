(function ($) {
    $(function () {

    }); // end of document ready
})(jQuery); // end of jQuery name space


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

    // Inicializar las tabs
    var options = { "swipeable": true };
    var el = document.querySelector('#tabs-swipe-demo');
    var instance = M.Tabs.init(el, options);

}

document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);


    tabs.forEach(function (tab) {
        tab.addEventListener('shown', function () {
            M.updateTextFields(); // Actualizar los campos de texto si es necesario
            M.AutoInit(); // Volver a inicializar los elementos de Materialize en la pestaña activa
        });
    });
})