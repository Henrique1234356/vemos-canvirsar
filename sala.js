// Adicionar os seus links do Firebase 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2hdCKzM9JZh-gKi36Y-IZjAJ8l-sLu6U",
  authDomain: "watzap2-973b9.firebaseapp.com",
  databaseURL: "https://watzap2-973b9-default-rtdb.firebaseio.com",
  projectId: "watzap2-973b9",
  storageBucket: "watzap2-973b9.appspot.com",
  messagingSenderId: "366810705698",
  appId: "1:366810705698:web:a4a596ce5fed7b1ce47f7b",
  measurementId: "G-X70ZZ2WK7C"
};
firebase.initializeApp(firebaseConfig);
nomeUsuario = localStorage.getItem("nomeUsuario");
document.getElementById("nomeUsuario").innerHTML = "bem-vindo(a), " + nomeUsuario;
function addRoom(){
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionando nome da sala"
  });
  localStorage.setItem("roomName", roomName);
  window.location = "mensagem.html";
}
// Obter os nomes das salas já gravadas no Firebase: 
function getData() {  
  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key;
      roomName = childKey;
      console.log("Nome da sala: " + roomName);
      row = "<div class='roomName' id="+ roomName+" onclick='redirectToRoomName(this.id)' >#"+ roomName +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}

// Chamar a função 
getData();

// Redirecionar para a sala escolhida 
function redirectToRoomName(name){
  localStorage.setItem("roomName", name);
  window.location = "mensagem.html";
}

// Fazer o logout 
function logout(){
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("roomName");
  window.location = "index.html";

}