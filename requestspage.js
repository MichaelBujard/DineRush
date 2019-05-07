var requestsdbref = firebase.database().ref('Requests');
var fooddbref = firebase.database().ref('Food');
var Usersdbref = firebase.database().ref('Users');

// Global variables
var numRequests = 0;




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
/*
requestsdbref.once('value').then(snap => {

    var container = document.getElementById('container');
    var requestval = snap.val(); // Hashmap of requests by id

    
    arrayOfCurrentRequestIDs = arrayOfRequestIDs(requestval);
    arrayOfCurrentRequestIDs.sort;
    console.log(arrayOfCurrentRequestIDs.sort(function(a, b) {
        return b-a
    }));

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
*/
////////////////////////////////////


function removeKeyAndData(key) {
    //requestsdbref.child(key);
    alert('clicking on a list item will remove it from the list. Continue?');
    document.getElementById(key).remove();
    var dataid = key + '-ul';
    document.getElementById(dataid).remove();
    
    requestsdbref.child(key).remove();
    // remove the data value of this, remove the corresponding list item, and remove the corresponding header

}


function addRequestKeyToContainer(container, key) {
    var header = document.createElement('p');

    header.setAttribute('id', key);
    header.innerHTML = '#' + key + " :";

    // Append header tag to container
    container.appendChild(header);
    header.addEventListener('click', function() {
        removeKeyAndData(key);
    });
}

// function addFoodNameToListItem(FoodName)

    /**
     * function request returns true if the id of the sorted array of ids matches the id of the hashmap key we loop through
     * @param {*} id 
     * @param {*} hashmap 
     */
    function requestMatches(id, hashmap) {
        for (var i = 0, keys = Object.keys(hashmap), ii = keys.length; i < ii; i++) {
            if (id === keys[i]){
                return true;
            }
        }
        return false;
    }
    
    /**
     * if id matches id of the ith key of hashmap, push the hashmap to the array.
     * @param {*} id 
     * @param {*} hashmap 
     * @param {*} array 
     */
    function pushmatchingrequest(id, hashmap, array) {
        if (requestMatches(id, hashmap)) { // If a request in the hashmap has a key that matches with the id,
            var request = getobjectwithkey(id, hashmap); // Store the request object that matches with the id in a variable
            array.push(request); // push the request that matches with the sorted key in the array of request ids to the array of request objects
        }
    }
    
    /**
     * if the key parameter matches a key in the hashmap of requests, then get the request that matches with said key. Otherwise, print error
     * @param {*} key 
     * @param {*} hashmap 
     */
    function getobjectwithkey(key, hashmap) {
        for (var i in hashmap) {
            // console.log('var i = ' + i + ' in hashmap = ' + hashmap);
            // console.log('key = ' + key + ', i = ' + i);
            if (key == i){
                return hashmap[i];
            }
        }
        console.log("ERROR: key input does not match with a key-value pair entry in hashmap input");
        return null;
    }
    
    /**
     * build a sorted list of IDs given the array of IDs sorted and the hashmap
     * @param {*} array 
     * @param {*} hashmap 
     */
    function buildSortedRequestList(array, hashmap) {
        var requestobjarr = []; // an array to hold request objects sorted by id in ascending order
        array.forEach(id => {
            // push hashmap with key that matches sorted id to requestobjarr []
            pushmatchingrequest(id, hashmap, requestobjarr);
        });
        return requestobjarr;
    }
    
    /**
     * sort the array of request keys (term keys/IDs used interchangeably, but mean different things)
     * @param {*} array 
     */
    function ourarraysort(array) {
        array.sort(function(a, b) {
            return a - b
        });
    }



/**
 * inputs a key and outputs an unordered list with id='objectKey'
 * @param {*} objectKey 
 */
    function createListWithIDKey(key) {
        var id = key + '-ul';
        var objectDataEntry = document.createElement('ul');
        objectDataEntry.setAttribute('id', id);
        return objectDataEntry;
    }

    /**
     * appends the key value pair to the list
     * @param {*} list 
     * @param {*} key 
     * @param {*} value 
     */
    function appendKVPToList(list, key, value) {
        var id = key + '-li';
        listItem = document.createElement('li');
        listItem.setAttribute('id', id);
        listItem.innerHTML = key + ' : ' + value;
        list.appendChild(listItem);
    }


function getFoodName(food) {
    for (var i in food) {
        if (i == 'productName'){
            return food[i];
        }
    }
    console.log("ERROR: key input does not match with a key-value pair entry in hashmap input");
    return null;
}

/**
 * append an unordered list to the list item that denotes the 'foods' list has begun
 * fill the unordered list with the names of the foods.
 * @param {*} val is the array of food items
 * @param {*} requestListItemOfTitleFoods is the list item to which we append the list of food data
 */
    function buildUnorderedListOfFoodNames(val, arrayFoods) {
        console.log('buildUnorderedListOfFoodNames(val, arrayFoods) : inputs : ' + val + ' , ' + arrayFoods);
        val.forEach(food => {
        // console.log('in buildUnorderedListOfFoodNames(key, val, listOfFoods, requestListItemOfTitleFoods). ' +
        // val + ' = val, ' + requestListItemOfTitleFood + ' = requestListItemOfTitleFoods');
        var ul = document.createElement('ul'); // this is the unordered list of food items. Each food name entry
        // has an unordered list containing all the info about the food.
        var ulOfFoodNameHeader = document.createElement('li'); // this is where we put the name of the food entry
        var idul = 'id-of-ul-of-li-of-foodname'; // this is the id of the unordered list of food items
        var idulOfFoodNameHeader = 'id-of-ul-beneath-foodname-header'; // this is the id of the header of the list
        ul.setAttribute('id', idul);
        ulOfFoodNameHeader.setAttribute('id', idulOfFoodNameHeader);

        console.log('inside buildUnorderedListOfFoodNames(), food is : ' + food);
        ulOfFoodNameHeader.innerHTML = getFoodName(food); // get the name of the food item in the list<Food>
        console.log('innerHTML : ' + ulOfFoodNameHeader.innerHTML);
        ul.appendChild(ulOfFoodNameHeader);
        arrayFoods.appendChild(ul);
        });

    }

/**
 * builds another list element with a <p> tag inside it containing text "foods : {some} item/s"
 * appends it to the list of user data. I
 * @param {*} k is the key 'foods'
 * @param {*} v is the array of food objects
 * @param {*} list is the list of request data
 */
    function setupFoodsList(k, v, list) {
        var li = document.createElement('li');
        var pfoodsheader = document.createElement('p');
        var idli = k + '-li';
        var idp = k + '-p';
        console.log(idli);
        console.log(idp);
        li.setAttribute('id', idli);
        pfoodsheader.setAttribute('id', idp);
        
        var item = (v.length < 2) ? 'item' : 'items';
        pfoodsheader.innerHTML = k + ' : ' + v.length + ' ' + item;
        li.appendChild(pfoodsheader);
        list.appendChild(li);
        buildUnorderedListOfFoodNames(v, li);

    }

    /**
     * create list-item
     * for each food item, build a <div> tag 
     * @param {*} k 
     * @param {*} v 
     * @param {*} list 
     */
function createNestedFoodList(k, v, list) {
    setupFoodsList(k, v, list);

}

    /**
     * for each kvp in hashmap, append the data therein to the list as a list item
     * hashmap is a single food item
     * @param {*} list 
     * @param {*} objectHashmap 
     */
    function appendRequestDataToList(list, hashmap) {
        for (var i = 0, keys = Object.keys(hashmap), ii = keys.length; i < ii; i++) {
            var key = keys[i];
            // console.log(key);
            var val = hashmap[key];
            if (key !== 'foods') {
                appendKVPToList(list, key, val);
            } else {
                // we now have a bulleted point. Now, we need to build an unordered list inside this list item.
                // We do this by creating an unordered list and appending it to the <li id='id'> tag.
                // this could go in a separate function
                createNestedFoodList(key, val, list);
            }
        }
        return list;
    }

/**
 * add request data to the container. Create an unordered list and give it an id='objectKey'
 * for each data entry, add user data to the list as a list item
 * 
 * @param {*} container 
 * @param {*} objectHashmap 
 * @param {*} objectKey 
 */
    function addRequestObjectDataToContainer(container, objectHashmap, objectKey) {
        console.log(objectKey);
        var list = createListWithIDKey(objectKey);
        list = appendRequestDataToList(list, objectHashmap)
        container.appendChild(list);
        list.addEventListener('click', function() {
            removeKeyAndData(objectKey);
        });

    }
    
    /**
     * adds the request key and associated value to the list as a single list.
     * @param {*} request 
     * @param {*} container 
     */
    function addRequestToContainer(key, request, container) {
        // add the request to the container in the webpage
        console.log(key); // undefined
        addRequestKeyToContainer(container, key);
        addRequestObjectDataToContainer(container, request, key);
    }
    
    /**
     * build the vertical queue of requests sorted by key and add it to the div tag of id='container'
     * @param {*} sortedrequestarray 
     */
    function buildRequestHtmlList(sortedrequestarray, requestkeysarray) {
        var container = document.getElementById('container'); // Get the container to add to the list
        var counter = 0;
        sortedrequestarray.forEach(requestObject => {
            var requestObjectKey = requestkeysarray[counter];
            addRequestToContainer(requestObjectKey, requestObject, container);
            counter++;
        });
        // loop through the sorted request array
        // add the requests in order to the container
    }

var arr = []; // the array field that will store the request IDs
    requestsdbref.once('value').then(snap => {
        // for each item in the array of requestIDs, loop through the hashmap of requests ans add to webpage the request of matching ID
        var requestshashmap = snap.val();
        arr = arrayOfRequestIDs(requestshashmap);
        ourarraysort(arr);

        // Now array is sorted. Now, for each item in the array, loop through the hashmap IDs and add each ID to the list in the HTML in order
        var sortedrequestarray = buildSortedRequestList(arr, requestshashmap);
        buildRequestHtmlList(sortedrequestarray, arr);
    });