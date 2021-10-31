// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB4AEiZyenkODSzGidD4Igf7cXWwyHS2v8",
    authDomain: "login-58320.firebaseapp.com",
    projectId: "login-58320",
    storageBucket: "login-58320.appspot.com",
    messagingSenderId: "47727001221",
    appId: "1:47727001221:web:25d3261d434ac0eafeb3ec",
    measurementId: "G-17LWJBTJ2V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth =firebase.auth();

//Cadastro/SignUp seccao/funcao
function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);

    //tratando a informacao
    promise.catch(e=>alert(e.message));
    alert("Cadastrado com Sucesso");
}

//Inicializacao/SignIn funcao

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));

}

//Finalizacao//SignOut funcao

function signOut(){
    auth.signOut();
    alert("Logout do Sistema com sucesso");
}

//activar usuario para a pagina inicial
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        var email = user.email;
        alert("Active user"+email);
    }else{
        alert("User activo nao encontrado")
    }

})