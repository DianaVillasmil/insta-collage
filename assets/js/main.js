function login() {
	if (document.getElementById('form').checkValidity() && validarPass()){
		window.location = "collage.html";
	} else {
		alert('Email o contraseña inválidos');
	}
}

function validarPass() {
	return (document.getElementById('password').value != "123456" && document.getElementById('password').value.length >= 6);
}