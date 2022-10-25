//Js code for login input mail and pwd .....
const loginUser = async (usn, pass) => {
  // e.preventDefault();
  data = { email: usn, password: pass };

  let response = await fetch("http://localhost:8080/logindata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status != 200) alert("Login in failed! for user " + usn);
    else {
      response.json().then((data) => {
        window.location.href =
          "http://localhost:5500/dashboard.html?user=" + data.id;
        // console.log(data.email);
      });
      // alert("Logged in!");
    }
  });
};

function validate() {
  var username = document.getElementById("mail");
  var password = document.getElementById("pwd");

  if (username.value.trim() == "") {
    alert("Please provide your EmailId");
    // username.style.border="solid 3px red"
  } else if (password.value.trim() == "") {
    alert("Please provide Password");
  } else if (password.value.trim().length < 8) {
    alert("password is too short");
  } else {
    loginUser(String(username.value), String(password.value));
  }
}

// Js code for sign up data submission
const submit = document.querySelector("#submit");
let client_name = document.getElementById("clientname");
let client_no = document.getElementById("clientno");
let client_mail = document.getElementById("clientmail");
let client_pwd = document.getElementById("clientpwd");
let client_rpwd = document.getElementById("clientrpwd");

const clearF = () => {
  client_mail.value = "";
  client_no.value = "";
  client_name.value = "";
  client_pwd.value = "";
  client_rpwd.value = "";
};

const adddata = async (e) => {
  e.preventDefault();
  if (!String(client_name.value).match(/^[a-z ]+$/i)) {
    alert("only alphabets allowed in the name input..");
    client_name.focus();
  } else if (!String(client_mail.value).match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
    alert("Email address is not valid");
    client_mail.focus();
  } else if (!String(client_no.value).match(/^[0-9]+$/i)) {
    alert("Please enter only numbers");
    client_no.focus();
  } else if (client_pwd.value != client_rpwd.value) {
    alert("Passwords do not match!");
    client_pwd.focus();
  } else {
    let response = await fetch("http://localhost:8080/getdata")
      .then((res) => res.json())
      .then((data) => console.log("this works " + JSON.stringify(data)));

    let response1 = await fetch("http://localhost:8080/adddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: client_name.value,
        number: client_no.value,
        email: client_mail.value,
        password: client_pwd.value,
        confirm_password: client_rpwd.value,
      }),
    })
      .then((response) => response.json())
      .then((data1) => console.log("this print" + JSON.stringify(data1)))
      .then(clearF());
    // e.preventDefault();
  }
};
submit.addEventListener("click", adddata);
