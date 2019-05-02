var requestsdbref = firebase.database().ref('Requests');
var fooddbref = firebase.database().ref('Food');
var Usersdbref = firebase.database().ref('Users');

// Global variables
var numRequests = 0;
var ArrayOfCurrentRequestIDs = [];

function createrequestheader(container, key) {
    var header = document.createElement('p');

    header.setAttribute('id', key);
    header.innerHTML = '#' + key + " :";

    // Append header tag to container
    container.appendChild(header);
}

// master function that takes the data snapshot and builds the
// list of requests with all the info.
function buildrequestlist(container, foodhashmap, key) {
    var list = document.createElement('ul');
    list.setAttribute('id', key);  
    // for this key, which is a requestid, get the hashmap
    // the hashmap looks like {address : 1024, Array[n],
    // fullName: 'Akrem Azzam', total: '$8.00', username: 'str'}

    // build an unordered list out of each hashmap kvp.

    Object.keys(foodhashmap)
    .map(k => {
        // for each key-value-pair in the hashmap,
        // add a bulleted list item to the hashmap
        // getorderaddress(key); // return the value associated with key 'address'
        //needs a way to check if hashmap[key] is an array
        var val = foodhashmap[k];
        var vallistitem = document.createElement('li');
        vallistitem.setAttribute('id', k);
        console.log("id of vallistitem : " + vallistitem.getAttribute('id'));
        //console.log(key);
        //console.log(val.val());

        if (!Array.isArray(val)){
            vallistitem.innerHTML = k + ": " + val;
            container.appendChild(vallistitem);
        } else {
            console.log('Item is an array');
            // Put a list of food items here
            // foods is the name of array of hashmap
            // console.log(key);

            // get the length of the array of food items
            var numFoodItems = val.length;

            /**
             * TODO:
             */
            // buildfoodslist(requestKey, foodsKey, foodslistitem); // write a function that simplifies this code

            var bool = (val.length < 2) ? "item" : 'items'; // if there's more than one food item in the array, make sure grammar's ok
            var foodspopuplink = document.createElement('a'); // the array of foods will be a 
            foodspopuplink.innerHTML = k + ' : ' + numFoodItems + ' ' + bool; 
            console.log('When we reach the foods array of food objects, key is : ' + key + ' and \'k\' is : ' + k);
            foodspopuplink.setAttribute('id', key) // set to id
            console.log('inside foods array of food objects, id of the link is : ' + foodspopuplink.getAttribute('id'));
            vallistitem.appendChild(foodspopuplink); // add link to the list item
            container.appendChild(vallistitem);

            // Loop over each food object (hashmap)
            val.forEach(hm => { // For each food object,
                Object.keys(hm)
                .map(k => {

                    var v = hm[k]; // Get the key 
                    console.log("inner hashmap of food val at key : " + k + " is : " + hm[k]);

                })
            });
        }
        
    });

    container.appendChild(list);
    // each request is a hashmap.
 // for each item in the hashmap, display all data
}

// now sort the unordered list with smallest number at top and largest number at bottom
// write a function that gets all the ids of the list and sorts them, then displays them according to the order in which it is sorted
function arrayOfRequestIDs(hashmapOfRequests) {
    var arr = [];
    Object.keys(hashmapOfRequests)
    .map(requestIDkey => {
        arr.push(requestIDkey);
    });
    return arr;
}

function numberOfRequests(hashmapOfRequests) {
    var num = 0;
    for (var i in hashmapOfRequests) {
        num++;
    }
    return num;
}

// now sort the array of requestIDs

requestsdbref.once('value').then(snap => {

    var container = document.getElementById('container');
    var requestval = snap.val(); // Hashmap of requests by id

    
    console.log(numberOfRequests(requestval));
    Object.keys(requestval)
    .map(key => {
        // store value as hashmap later

        // var hashmap =
        var hashmap = requestval[key]; // request data hashmap
        console.log(hashmap); // print hashmap of request data

        // Print each key
        createrequestheader(container, key);
        buildrequestlist(container, hashmap, key)
        // listrequestdata(container, key);



        console.log('key : ' + key + ' value is : ' + requestval[key])
    });
});