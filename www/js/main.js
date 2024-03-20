$(document).ready(function(){
    
    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight"); 
                } else {
                label.removeClass("highlight");   
                }   
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight"); 
            } 
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });
    $("#register").click(function(){
     register();
     
    });
    $("#login").click(function(){
        login();
        
       });
    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});
function errormessage(message){
    $("#errormessageRegister").html(message);
}
function respuesta(res) {
    console.log(res);
  }
function passRobusta(pass) {
    var tieneLetrasMinusculas = /[a-z]/.test(pass);
    var tieneLetrasMayusculas = /[A-Z]/.test(pass);
    var tieneNumeros = /\d/.test(pass);
    var tieneCaracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

    if (tieneLetrasMinusculas && tieneLetrasMayusculas && tieneNumeros && tieneCaracteresEspeciales) {
        return true; 
    } else {
        return false; 
    }
}
function register(){
     var date = $("#dateregister").val();
     var name = $("#nameregister").val();
     var surname = $("#surnameregister").val();
     var email = $("#emailregister").val();
     var pass1 = $("#passregister1").val();
     var pass2 = $("#passregister2").val();
     var ok = true;

   
     if(date.trim()=='' || name.trim()=='' || surname.trim()=='' || email.trim()==''  || pass1.trim()=='' || pass2.trim()==''){
        ok = false;
        errormessage("Ningun campo puede estar vacio");
        return;
     }
     if(!esMayorDeEdad(date)){
        ok = false;
        errormessage("Para registrarte necesitas ser mayor de edad");
        return;
     }
     if(/\d/.test(name)){
        ok = false;
        errormessage("El nombre no puede contener numeros");
        return;
     }
     if(/\d/.test(surname)){
        ok = false;
        errormessage("El apellido no puede contener numeros");
        return;
     }
     if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        ok = false;
        errormessage("El email que has proporcionado no es válido");
        return;
     }
     if(pass1.length < 8 || pass2.length < 8){
        ok = false;
        errormessage("La contraseña no puede contener menos de 8 carácteres");
        return;
     }
     if(pass1!==pass2){
        ok = false;
        errormessage("Las contraseñas no coinciden");
        return;
     }
     if(!passRobusta(pass1)){
        ok = false;
        errormessage("La contraseña no es lo suficientemente robusta, debe contener como minimo una letra mayúscula, una minúscula, un número y un caracter especial");
        return;
     }
     if(ok){

        //LLAMADA A SERVIDOR

      var parametros = {
        "type":"register",
        "username": username,
        "name": name,
        "surname": surname,
        "email": email,
        "password": pass1,
      };

      $.ajax({
        url: "https://eventify.ieti.site/register/",
        type: "POST",
        headers: {
            "Authorization": "Token d75ebfca0ec3f92c5979a49854718d974127019b"
        },
        data: parametros,
        success: function(response) {
            respuesta(response);
        }
    });

    
   
       }
}
function esMayorDeEdad(fechaNacimientoString) {
    
    var fechaNacimiento = new Date(Date.parse(fechaNacimientoString));
    
    
    var fechaActual = new Date();
    
    
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    
    if (edad > 18 || (edad === 18 && (fechaActual.getMonth() > fechaNacimiento.getMonth() || (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() >= fechaNacimiento.getDate())))) {
        return true;
    } else {
        return false;
    }
}

function login(){
    var email = $("#emaillogin").val();
    var pass = $("#passlogin").val();
    if(email.trim()!='' && pass.trim()!=''){
        var parametros = {
            "user": email,
            "password": pass,
          };
    
          $.ajax({
            url: "https://eventify.ieti.site/login/",
            type: "POST",
            headers: {
                "Authorization": "Token d75ebfca0ec3f92c5979a49854718d974127019b"
            },
            data: parametros,
            success: function(response) {
                respuesta(response);
            },
            error: function(xhr, textStatus, errorThrown) {
                // Manejar errores de respuesta
                if (xhr.status === 404) {
                    $("#errormessageLogin").html("Contraseña o correo electrónico incorrectos");
                } else {
                    $("#errormessageLogin").html("Algo no tenia que haber pasado");
                }
            }
        });
    }
    else{
        $("#errormessageLogin").html("Los campos no pueden estar vacios");
    }

}
