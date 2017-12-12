

/**
 * Created by Cyds on 9/6/2016.
 */
/*
 var userData = [];
 console.log(userData);
 */

(function() {

    var config = {
        apiKey: "AIzaSyCt8mAmPSERmFnEB15rbumFQ7obus8Wjo0",
        authDomain: "cyds-project.firebaseapp.com",
        databaseURL: "https://cyds-project.firebaseio.com",
        storageBucket: "cyds-project.appspot.com",
        messagingSenderId: "967491983681"
    };
    firebase.initializeApp(config);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const txtsignUpEmail = document.getElementById('signUpEmail');
    const txtsignUpPassword = document.getElementById('signUpPassword');
    var isUserNew;
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
//----------------------------------------------------------------googlelogin
    document.getElementById('googleLogin').addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }, false);

    //------------------------------------------------------------------------
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById('errormessage').innerText=e.message);
});

    document.getElementById("txtPassword").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("txtPassword").click();
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => document.getElementById('errormessage').innerText=e.message);
        }
    });

//add sign up event
    btnSignUp.addEventListener('click', e => {
        //get email and pass
        //TODO: check 4 real emailz
        const email = txtsignUpEmail.value;
    const pass = txtsignUpPassword.value;
    const auth = firebase.auth();
    isUserNew = true;

//sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById('errormessage').innerText=e.message);
});
    function newUserData() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref("newUsers/" + userId).set({
            first: firstName.value,
            last: lastName.value
        });
    }
//add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            if (isUserNew) {
                newUserData();
            }
            btnLogout.style.display="block";
            txtEmail.style.display="none";
            txtPassword.style.display="none";
            btnLogin.style.display="none";
            btnSignUp.style.display="none";
            txtsignUpEmail.style.display="none";
            txtsignUpPassword.style.display="none";
            firstName.style.display="none";
            lastName.style.display="none";
            googleLogin.style.display="none";

            const messList = document.getElementById('list');

            const userId = firebase.auth().currentUser.uid;

            const dbRefObject = firebase.database().ref().child('users/' + userId);

            /*
             dbRefObject.on('value', snap => {
             messList.innerText = JSON.stringify(snap.val(), null, 3);
             });
             */

            dbRefObject.on('child_added', snap => {
                const li = document.createElement('li');
            li.innerText = snap.val();
            li.id = snap.key;
            messList.appendChild(li);
        });

            dbRefObject.on('child_changed', snap=> {
                const liChanged = document.getElementById(snap.key);
            liChanged.innerText = snap.val();
        });

            dbRefObject.on('child_removed', snap=> {
                const liRemove = document.getElementById(snap.key);
            liRemove.remove();
        });

            const dbPush = document.getElementById('btnPushToDatabase');
            const dbValue = document.getElementById('database');
            dbPush.addEventListener('click', function(){
                const newPost = dbRefObject.push();
                newPost.set(dbValue.value);
            }, false);

        } else{

            console.log('not logged in');
    btnLogout.style.display="none";
    document.getElementById('userNav').style.display = 'none'
}
});

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    window.location.reload();
});




}());

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
];


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
/*var el = document.getElementById("outside");
 el.addEventListener("click",function() {
 posts.forEach(showBlogPost1);
 }, false);*/

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
//---------------------------------------------------------------------------------

var pageCount = 1;
var guitarInfoContainer = document.getElementById('guitar-info');
var btn = document.getElementById('AJAXbtn');
btn.addEventListener('click', function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/Cjgrubz/JSON/master/data-' + pageCount + '.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
    pageCount++;
    if (pageCount > 3) {
        btn.style.display='none';
    }
});

function renderHTML(data) {
    var htmlString = '';
    for (i = 0; i < data.length; i++) {
        htmlString += '<p>' + data[i].chord + ' chord ' + data[i].strings + ' strings ' + data[i].frets + ' frets '
    }
    guitarInfoContainer.insertAdjacentHTML('beforeend', htmlString)
}

