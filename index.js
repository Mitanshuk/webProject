function send(){
  window.confirm("You have to login first");
  if (confirm("Do you want to login"))
  {
    // window.location.href="loginpage.html"
    window.open("loginpage.html", "_blank");
  }
  else{
    txt = "You pressed Cancel!";
  }
}

function Random() {
  let maxNumber = -Infinity;

  for (let key in localStorage) {
    let t = key.slice(0, 5);
    if (t === "quote") {
      let number = parseInt(key.slice(5));
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    }
  }

  console.log("Maximum number of quotes present: " + maxNumber);

  if (maxNumber > 0) {
    var random_number = Math.floor(Math.random() * maxNumber) + 1;
    console.log(random_number)

    var keyname = "quote"+random_number
    var q = JSON.parse(localStorage.getItem(keyname)).quote
    var a = JSON.parse(localStorage.getItem(keyname)).author
    var by = JSON.parse(localStorage.getItem(keyname)).by

    console.log(q+" "+a+" "+by)

    $(document).ready(function() {
      $("button").click(function(){
        $("blockquote").text(q)
        $(".addBy").text("added by "+by)
        $(".author_div").text("~ "+a)
      });
    });
  } else {
    console.log("No quotes present in local storage");
  }
}


function add(){
  var quote=document.getElementById("quote").value;
  var author=document.getElementById("author").value;
  var d={
    quote:quote,
    author:author
  }
  console.log(d)
  data.push(d)
  var len = len+1
  console.log(data.length)
}

var userLogin = ""

function logout(){
  window.location.href = "index.html";
  localStorage.removeItem("userLogin");
  console.log(userLogin);
}



function login(){
  var username=document.getElementById("uname").value;
  var password=document.getElementById("pwd").value;
      // var userLogin = username;
      // console.log(userLogin)
  var isUserExists = false;
  var matchedPassword = false;
  Object.keys(localStorage).forEach(function(key) {
    var data = JSON.parse(localStorage.getItem(key));
    if (data.username == username) {
      isUserExists = true;
      if(data.password == password){
        matchedPassword = true;
      }
    }
  });
  if(isUserExists && matchedPassword){
    window.alert("User login succeed")
    var userLogin = username;
    console.log(userLogin)
    localStorage.setItem("userLogin",username)
    // window.location.href="addquote.html"
    window.open("addquote.html", "_blank");
  }
  else if(isUserExists && !matchedPassword){
    window.alert("Invalid usernam/password")
  }
  else{
    window.alert("User doesn't exist")
  }
}


function createAccount() {
  var username = document.getElementById("uname").value;
  var password = document.getElementById("epwd").value;
  var pwd = document.getElementById("cfpwd").value;

  if (username === "" || password === "" || pwd === "") {
        window.alert("Fields can't be blank");
        return;
  }

  var isUserExists = false;
  Object.keys(localStorage).forEach(function(key) {
        var data = JSON.parse(localStorage.getItem(key));
        if (data.username == username) {
               console.log(data);
               isUserExists = true;
        }
  });
  if (isUserExists) {
        window.alert("User already exists");
  }
  else if (pwd == password) {
        console.log(username + password);
        var data = { username: username, password: password };
        var id = new Date().getTime();
        localStorage.setItem(`data_${id}`, JSON.stringify(data));
        window.alert("Account Created");
        // window.location.href = "loginpage.html";
        window.open("loginpage.html", "_blank");
  }
  else{
        console.log("Password didn't matched");
  }
}


function add() {
  var quote = document.getElementById("quote").value;
  var author = document.getElementById("author").value;

  if (!quote || !author) {
    window.alert("Field can't be empty");
    return;
  }

  var userLogin = localStorage.getItem("userLogin")
  var d = {
    quote: quote,
    author: author,
    by: userLogin
  };

  let maxNumber = -Infinity;

  for (let key in localStorage) {
    let t = key.slice(0, 5);
    if (t === "quote") {
      let number = parseInt(key.slice(5));
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    }
  }

  var keyname = "quote" + (maxNumber + 1);
  localStorage.setItem(keyname, JSON.stringify(d));
  console.log(quote + " " + author + " " + userLogin);
  window.alert("new quote added successfully");
  form.reset()
}

function userData(){
  var userLogin = localStorage.getItem("userLogin");
  console.log(userLogin);
  document.getElementById("exampleModalLabel").innerHTML = "Hello " + userLogin + " !!!";
  var output = "";
  for (let key in localStorage) {
    let t = key.slice(0, 5);
    if (t === "quote") {
      // console.log(key);
      var text = localStorage.getItem(key);
      var obj = JSON.parse(text);
      if (obj.by == userLogin){
        console.log(obj);
        output += `<div><h6>${obj.quote}</h6><button class="btn btn-danger btn-sm" onclick="deleteQuote('${key}')">Delete</button><button class="btn btn-primary btn-sm mx-2" onclick="editQuote('${key}')">Edit</button></div><br />`;
      }
    }
  }
  document.getElementById('result').innerHTML = output;
}

function deleteQuote(key) {
  localStorage.removeItem(key);
  userData();
  window.alert("Quote deleted successfully")
}

function editQuote(key) {
  var text = localStorage.getItem(key);
  var obj = JSON.parse(text);
  var quote = obj.quote;
  var author = obj.author;
  var newQuote = prompt("Enter updated quote", quote);
  var newAuthor = prompt("Enter updated author", author);
  if (newQuote && newAuthor) {
    obj.quote = newQuote;
    obj.author = newAuthor;
    localStorage.setItem(key, JSON.stringify(obj));
    userData();
    window.alert("Quote updated successfully");
  }
}


function deactivate() {
  var userLogin = localStorage.getItem("userLogin");
  for (let key in localStorage) {
    let t = key.slice(0, 4);
    if (t === "data") {
      var text = localStorage.getItem(key);
      var obj = JSON.parse(text);
      if (obj.username == userLogin) {
        console.log(key + "user");
        localStorage.removeItem(key);
      }
    }
  }
  localStorage.removeItem("userLogin");
  // window.location.href = "index.html"
  window.open("index.html", "_blank");

}
