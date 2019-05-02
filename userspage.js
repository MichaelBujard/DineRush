var usersref = firebase.database().ref("users");
var foodref = firebase.database().ref("Food");
var categoriesref = firebase.database().ref("category");

// To test, simply read and display user data.
usersref.once("value").then(snap => console.log(snap.val()));

// inputs the container div tag and the user key. Creates in <div> a <p> tag containing
// inner HTML "[user]: " and sets the id attribute to the same name.
// Adds header to container
function createuserheader(container, usersnapshot) {
    var header = document.createElement('p');
    var user = usersnapshot.key;
    header.setAttribute('id', user);
    header.innerHTML = user + ":";

    // Append header tag to container
    container.appendChild(header);
}

// function createuserdatalist(container, user) creates an unordered list of attribute
// id='[username]list' and adds user data to the list.
function createuserdatalist(container, usersnapshot) {
    var list = document.createElement('ul');
    var username = usersnapshot.child('username').val();
    var firstname = usersnapshot.child('firstName').val();
    var lastname = usersnapshot.child('lastName').val();
    var userli = document.createElement('li');
    var firstnameli = document.createElement('li');
    var lastnameli = document.createElement('li');

    var userid = username;
    var userliid = username + 'li';
    var firstnameliid = firstname + 'li';
    var lastnameliid = lastname + 'li';
    list.setAttribute("id", userid);
    userli.setAttribute("id", userliid);
    firstnameli.setAttribute('id', firstnameliid);
    lastnameli.setAttribute('id', lastnameliid);

    userli.innerHTML = username;
    firstnameli.innerHTML = firstname;
    lastnameli.innerHTML = lastname;

    list.appendChild(userli);
    list.appendChild(firstnameli);
    list.appendChild(lastnameli);
    container.appendChild(list);

    console.log(firstname);
    console.log(lastname);
    console.log(username);

    
}

// Now display the snapshot in a list in HTML file, "requests.html"
usersref.once("value").then(snap => {
    snap.forEach(function(snapshot) {
        var container = document.getElementById('container');
        var user = snapshot.key

        createuserheader(container, snapshot);
        createuserdatalist(container, snapshot);

        console.log(user + ": " + username + ", " + firstname + ", " + lastname);
        document.getElementById("users").innerHTML = user + ':';
        document.getElementById('username').innerHTML = username;
        document.getElementById('firstname').innerHTML = firstname;
        document.getElementById('lastname').innerHTML = lastname;
        // var username = snapshot.child("Aku11").val().username;
        // var password = 
        // console.log(username); 
    });
});

