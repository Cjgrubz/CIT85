/**
 * Created by Cyds on 10/20/2016.
 */
function storeNewUser() {
    var userNameInput = document.getElementById("createName").value; //this stores the element for username
    var userPassInput = document.getElementById("createPass").value; //this stores the element for user password
    var userPassInput2 = document.getElementById("retypePass").value;// 1 added second password form
    var arr = userPassInput.split("");
    if (userPassInput === userPassInput2 && arr.length > 5){//2 gave a minimum amount of characters needed for password
        user.name = userNameInput;
        user.pass = userPassInput;
        document.getElementById("createUserForm").style.display="none";
    } else{
        alert("passwords do not match!");//3 passwords must match
    }
    return false;
}

var user = {
    "name": "",
    "pass": ""
};

function loginUser () {
    var loginNameInput = document.getElementById("userName");
    var loginPassInput = document.getElementById("passWord");
    if (loginNameInput.value === user.name && loginPassInput.value === user.pass) {
        document.getElementById("loginForm").className = "not-visible";
        loginScreen();
    } else{
        alert("wrong password or username");
    }
    return false;
}

function loginScreen() {
    var dContent = "Welcome " + user.name + " Thanks for coming back" + "Our goal here is to put musicians together with other musicians to trade or sell music equipment";
    var el = document.getElementById("loginScreen");

    el.innerHTML = dContent;
    document.getElementById("loginScreen").className = "loginScreen";
}

//classwork blogPostArray below
var posts = [
    {
        title: "undertow",
        artist: "Tool",
        year: 1993,
        divId: "blog1"
    }
    ,
    {
        title: "opiate",
        artist: "Tool",
        year: 1992,
        divId: "blog2"
    }
    ,
    {
        title: "lateralus",
        artist: "Tool",
        year: 2001,
        divId: "blog3"
    }
    ,
    {
        title: "10,000 Days",
        artist: "Tool",
        year: 2006,
        divId: "blog4"
    }
]


function showBlogPost1(item, counter, array) {
    var newDiv = document.createElement("div");
    //  newDiv.classname = "flex-items Blog";
    var newContent = document.createTextNode(item.title);
    var newLine = document.createElement("br");
    var newArtist = document.createTextNode(item.artist);
    var newYear = document.createTextNode(item.year);
    var newdivId = document.createTextNode(item.divId);
    newDiv.appendChild(newContent);
    newDiv.appendChild(newArtist);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newdivId);
    newDiv.appendChild(newLine);
    document.getElementById('showBlog').appendChild(newDiv);

    console.log('i got here');
    /*  blogContent += '<div class="flex-items">' + posts[i].title + "<br>"
     + posts[i].artist + "<br>" + posts[i].year + "</div>";
     */



}


// add event listener to table
var el = document.getElementById("outside");
el.addEventListener("click",function() {
    posts.forEach(showBlogPost1);
}, false);