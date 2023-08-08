
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

// Enviar mensagem 
nomeUsuario = localStorage.getItem("nomeUsuario");

roomName = localStorage.getItem("roomName");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: nomeUsuario,
        message: msg,
        like:0

});
document.getElementById("msg").value = "";
}
// Obter os nomes das salas já gravadas no Firebase: 
function getData(){ 
  firebase.database().ref("/"+roomName).on('value', function(snapshot) { 
      document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";
      row = name_with_tag + message_with_tag +like_button + span_with_tag;       
      document.getElementById("output").innerHTML += row;
  } });  }); 
}
  
  // Chamar a função 
  getData();
// Dar like nas mensagens 
function updateLike(message_id){
  console.log("Clicou no botão curtir: " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(roomName).child(message_id).update({
like: updated_likes
  });


}
// Fazer o logout 
function logout(){
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("roomName");
    window.location = "index.html";
}  

