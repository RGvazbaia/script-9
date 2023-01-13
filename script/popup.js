"use strict";
let mainDivBox = document.getElementById("mainDivBox");
let popup = document.getElementById("popup");
let popapContent = document.getElementById("content");
let closeIcon = document.getElementById("close");
let deleteBtn = document.createElement('i')

ajax("https://jsonplaceholder.typicode.com/posts", function (mosuliData) {
  mosuliData.forEach((item) => {
    createPost(item);
  });
});

function ajax(url, callback) {
  let requist = new XMLHttpRequest();
  requist.open("GET", url);
  requist.addEventListener("load", function () { 
    let mosuliData = JSON.parse(this.responseText);
    callback(mosuliData);   
  });

  requist.send();
}


function createNewPost(item) {
  let divbox = document.createElement("div");
  divbox.classList.add("posts");
  divbox.setAttribute("data-id", item.id);

  let h3 = document.createElement("h3");
  h3.innerText = item.id;

  let h2= document.createElement("h2");
  h2.innerText = item.title;

  divbox.appendChild(h3);
  divbox.appendChild(h2);

   
  divbox.addEventListener("click", function (event) {
    let id = event.target.getAttribute("data-id");
    popup.classList.add("active");
    let serverUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(serverUrl, function (mosuliData) {      
      popupDescription(mosuliData);
    });    
  });

  mainDivBox.appendChild(divbox);

  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    let serverUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
  });
}


