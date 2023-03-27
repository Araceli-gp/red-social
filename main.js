$(document).ready(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyB2yJ0qYoEbQFcFjyV2IQnm7aKo3kfON-8",
    authDomain: "light-d6705.firebaseapp.com",
    projectId: "light-d6705",
    storageBucket: "light-d6705.appspot.com",
    messagingSenderId: "201259592460",
    appId: "1:201259592460:web:cf6d62b1450170aeb53729"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  console.log(app);

  const auth = firebase.auth();

  var provider = new firebase.auth.GoogleAuthProvider();

  /*-----------------------------
     iniciar sesion con google
  -----------------------------*/

  //boton de google
  $("#google").click(function (e) {
    e.preventDefault();
    // console.log("google")

    //ingresar con google
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Ingresaste con Google");
        window.location.href = "inicio.html";
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Hubo un error", errorCode, errorMessage);
      });

  });

  /*----------------------------------------
  registrar usuario con correo y contraseña
  ------------------------------------------*/
  $("#registrar").click(function() {
    //datos del registro
    var nombre = $("#reg-nombre").val();
    var apellido = $("#reg-apellido").val();
    var email = $("#reg-email").val();
    var password = $("#reg-contraseña").val();
    //console.log(nombre, apellido, email, password); //funciona 

    //codigo de firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log("se registro");
        window.location.href = "index.html";
        addNombre(nombre)

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });

  })
  /*--------------------------------------
  iniciar sesion con correo y contraseña
  ----------------------------------------*/
  $("#ingresar").click(function() {
    //variables
    let email = $("#in-email").val();
    let pass = $("#in-contraseña").val();

    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log("ingresaste");;
        window, location.href = "inicio.html"
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  })

  /*----------------
     cerrar sesion
  ----------------*/
  $("#cerrar").click(function () {
    //console.log("se ha cerrado sesion");

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("cerraste sesion");
      window, location.href = "index.html";
    }).catch((error) => {

      //console.log("Hubo un error");
    });

  })

  //==========================================
    //AÑADIR NOMBRE DE USUARIO
  //==========================================
  function addNombre(nombre) {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: nombre,
    }).then(() => {
      // Update successful
      // ...
      console.log("registro");
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // An error occurred
      // ...
      console.log(errorCode, errorMessage);
    });
  }

});



//boton up
const $buttonup = document.getElementById("bup");
window.addEventListener("scroll", (e) => {
  let y = document.documentElement.scrollTop;
  if (y === 0) {
    $buttonup.classList.add("hide");
    $buttonup.classList.remove("active");
  } else if (y >= 200) {
    $buttonup.classList.add("active");
    $buttonup.classList.remove("hide");
  }
})

document.addEventListener("click", (e) => {
  if (e.target.matches(".fa-chevron-up")) {
    window.scrollTo({
      scrollbehavior: "smoth",
      top: 0
    });
  }
});
