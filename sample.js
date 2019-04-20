// These are the sign in and sign up buttons
var signinbutton = document.getElementById("btnn");
var signupbutton = document.getElementById("signup-btnn");

// Firebase database reference
var database = firebase.database().ref();

 
// Sync object changes
var snapshotusersarr = database.on('value', function(snap) {
    console.log(snapshotToArray(snap));
});

// this adds the event listener to the sign in button.
// Event listener activated on click, uses func() and getInfo()
signupbutton.addEventListener("click", function() {
    console.log("inside event listener, username is: " + document.getElementById("signupusername").value);
    console.log("inside event listener, password is: " + document.getElementById("signuppassword").value);
    // getInfo();

 registernewuser();

});

/**
 * addEventListener() calls func()
 * func() handles 
 */
function registernewuser() {
    //textarea username and password input reference as string inputs
    var usernametext = document.getElementById("signupusername").value;
    var passwordtext = document.getElementById("signuppassword").value;

    // debug messages
    window.alert(usernametext);
    document.getElementById("paragraph3postemail").innerHTML = "I just got clicked";

    //var usersref = database.child("users");
    //var userref = usersref.child("user1");
    //var usernameref = userref.child("username");
    //var userpassref = userref.child("password");
    //usernameref.set(usernametext);
    //userpassref.set(passwordtext);
    console.log("func() DM: usernametext = " + usernametext + ", passwordtext = " +passwordtext + " at calling of createNewUser()");
    createNewUser(usernametext, passwordtext);
    isuniqueusername(usernametext);
}

/**
 * function createUser(_username, _password) creates a user with username and password
 * returns a user with username = _username and password = _password
 */
function createUser(_username, _password) {
    var user = new User();
    user.setUsername(_username);
    user.setPassword(_password);
    
}

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
 
 /** now we have an array. TO check if a username already exists,
  * simply iterate through the loop and check if the username matches any one of the 
  * users' usernames.
  */
 function isuniqueusername(username) {
     var bool = false;
     console.log(snapshotusersarr);
     for (var i = 0; i < snapshotusersarr.length ; i++) {
         console.log(snapshotusersarr[i]);
         var ithuser = snapshotusersarr[i]._username;
         bool = (ithuser == username) ? false : true;
     }
     return bool;
 }
 

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

/**
 * Request class is a request object. Requests display information about a user's requests.
 */
class Request {

    constructor() {
        this.fooditem = "none";
        this.drinkitem = "none";
        this.price = 0;
    }

    // Public getters and setters
    get fooditem() {
        return this._fooditem;
    }
    get drinkitem() {
        return this._drinkitem;
    }
    get price() {
        return this._price;
    }

    // setters
    set foodItem(fi) {
        this._fooditem = fi;
    }
    set drinkitem(di) {
        this._drinkitem = di;
    }
    set price(p) {
        this._price = p;
    }
}
/*
var requestsref = database.ref("requests");
requestsref.on('value', gotData, errData);

function gotData(data) {
    var requests = data.val();
    var keys = Object.keys(requests);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var initials = requests[k].initials;
        var request = requests[k].request
    }
}

function errData(err) {
    console.log("errData called with error")
    console.log(err);
}
*/