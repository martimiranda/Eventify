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


    var premiumLink = document.getElementById('PremiumApp');
    var backPremium = document.getElementById('backPremium');
    var premiumPage = document.getElementById('mainPremium');
    var mainPage = document.getElementById('main1');
    var footer = document.getElementById('footer');
    var header = document.getElementById('header');

    premiumLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

        premiumPage.style.display = "block";
        mainPage.style.display = "none";
        footer.style.pointerEvents = "none"; // Bloquear eventos en el footer
        header.style.pointerEvents = "none"; // Bloquear eventos en el header    
    });

    backPremium.addEventListener('click', function (event) {
        event.preventDefault();

        premiumPage.style.display = "none";
        mainPage.style.display = "block";
        footer.style.pointerEvents = "auto";
        header.style.pointerEvents = "auto"; 
    })

})