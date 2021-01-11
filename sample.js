// These are the sign in and sign up buttons
var signinbutton = document.getElementById("btnn");
var signupbutton = document.getElementById("signup-btnn");

// Firebase database reference
var database = firebase.database().ref();

function registeraction() {
    var usernametext = document.getElementById("signupusername").value;
    var passwordtext = document.getElementById("signuppassword").value;

    var ref = firebase.database().ref("users");
    
    ref.once("value").then(function(snapshot) {
        var a = snapshot.child(usernametext).exists(); // a is now either true or false
        // var b = snapshot.child("_username").val().exists();
        console.log(snapshot.child(usernametext));
        // console.log(snapshot.child("_username").val());
        if (a) {
            alert("Username is alread taken. Please try again")
        }
        else {
            createNewUser(usernametext, passwordtext);
        }
    });
}

// Let's try this array implementation again.
// var datainputs = []; // an empty array to put the data into
// var ref = database.child('users'); // This is the database reference
/*
ref.once('value', function(snapshot) {
    console.log(snapshot);

    datainputs.push({
        username: snapshot.val()._username,
        password: snapshot.val()._password
    });
});
console.log(datainputs);
console.log(datainputs[0]);
console.log(datainputs.pop());
//checks if username is unique
database.child('users').once('value', gotusers);
function gotusers(snapshot){
    var arr = [];
    snapshot.forEach(userSnapshot => {
        var username = userSnapshot.key;
        var password = userSnapshot.val()._password;
        // now add these to an array of username and password pairs, or something
        arr.push(username);
        arr.push(password);
    })
    return arr;
}
*/


/*
function childAddedSoAddStuffToArray(scope) {
    var ref = database.child('users');
    var inputs = [];
    ref.once('child_added', function(snap) {
        scope.evalAsync(function() {
            var inputs = snap.val();
            DataTransferItem._
        })
    })
}
*/
// var usersandpasswords = gotusers();
// console.log(usersandpasswords);

//var snapshotusersarr;
// Sync object changes
/*
var snapshotusers = database.child('user').on('value', function(snap) {
    snapshotusersarr = snapshotToArray(snap);
});
console.log(snapshotusersarr);
*/

// this adds the event listener to the sign in button.
// Event listener activated on click, uses func() and getInfo()
signupbutton.addEventListener("click", function() {
    console.log("inside event listener, username is: " + document.getElementById("signupusername").value);
    console.log("inside event listener, password is: " + document.getElementById("signuppassword").value);
    // getInfo();

    registeraction();

});

//console.log("uniqueun DM: " + isuniqueusername("Alan"));


/**
 * function newUser(_username) returns true if user of username _username exists,
 * false otherwise
 *
function newUser(_username, _password) {
    var userref = database.child("users").child(_username);
    var passwordref = database.child("users").child(_password);
    return !((userref == "") && (passwordref == ""));
}
*/

// Laying out HTML webpages for where you will store the food items
// ^^If Greg Weigel wants to help.


/**
 * User object (class) to push to database
 */
class User {
    // Setup
    constructor() {
        this.password = 'empty';
        this.username ='emptyusername';
        this.firstname = 'emptyfirstname';
        this.email = 'emptyemail';
        this.address = 'emptyaddress';
        this.city = 'emptycity';
        this.zipcode = 'emptyzipcode';
        this.streetnumber = 'emptystreetnumber';
    };

    //setters

    set email(email) {
        this._email = email;
    };
    set username(username) {
        this._username = username;
    };
    set password(password) {
        this._password = password;
    };
    set firstname(firstname) {
        this._firstname = firstname;
    };
    set email(email) {
        this._email = email;
    };
    set address(address) {
        this._address = address;
    };
    set city(city) {
        this._city = city;
    };
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    };
    set streetnumber(streetnumber) {
        this._streetnumber = streetnumber;
    };

    //getters
    get firstname() {
        return this._firstName;
    };
    get username() {
        return this._userName;
    };
    get address() {
        return this._address;
    };
    get email() {
        return this._email;
    };
    get password() {
        return this._password;
    };
    get city() {
        return this._city;
    };
    get zipcode() {
        return this._zipcode;
    };
    get streetnumber() {
        return this._streetnumber;
    };
}

/*
// Create an array from the snapshot of the user
function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
}
*/
 
 /** now we have an array. To check if a username already exists,
  * simply iterate through the loop and check if the username matches any one of the 
  * users' usernames.
  */
 /*
 function isuniqueusername(username) {
     var bool = false;
     console.log(snapshotToArray(snap));
     for (var i = 0; i < snapshotusersarr.length ; i++) {
         console.log(snapshotusersarr[i]);
         var ithuser = snapshotusersarr[i]._username;
         bool = (ithuser == username) ? false : true;
     }
     return bool;
 }
*/

/**
 * function createNewUser(_username, _password) pushes new user
 * with login info to the database to a unique location.
 * return void
 * @param {string} _username 
 * @param {string} _password 
 */
function createNewUser(_username, _password) {
    console.log("createNewUser() DM: parameter values are " + _username + ", " + _password);
    var usersref = database.child("users");
    var user = new User();
    console.log("constructor() DM: new user field values are : " + user._username);

    user.username = _username;
    user.password = _password;
    console.log("createNewUser() DM: after setting username = "+user._username + " and password, " + user._password);

    //isuniqueusername(user._username);
    //console.log("createNewUser(params) DM: return value of isuniqueusername(): " + isuniqueusername());


    // Put a new user in the database with path root//users//[this user's username]
    usersref = database.child("users").child(user._username);
    usersref.set(user);
    console.log("inside createNewUser(_username, _password) : "+user._username);
}
