
/******************************************************************************************
 * REQUESTS
 * Request class is a request object. Requests display information about a user's requests.
 * 
 */
class Request {

    constructor() {
        this.username = "empty";
        this.fullname = "empty";
        this.address = "empty";
        this.total = 0;
        this.foods = [];
    }

    // Public getters and setters
    get username() {
        return this._fooditem;
    }
    get fullname() {
        return this._drinkitem;
    }
    get address() {
        return this._price;
    }
    get total() {
        return this._total;
    }
    get foods() {
        return this._foods;
    }

    // setters
    set username(fi) {
        this._fooditem = fi;
    }
    set fullname(di) {
        this._drinkitem = di;
    }
    set address(p) {
        this._price = p;
    }
    set total(t) {
        this._total = t;
    }
    set foods(arr) {
        this._foods = arr;
    }
}

var requestsreference = firebase.database().ref("requests");

requestsreference.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function(error) {
    console.log("error: " + error.code);
});

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