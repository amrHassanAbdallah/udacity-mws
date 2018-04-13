/*
importScripts('/js/idb.js');
*/

/*const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
    // Handle errors.
};
const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
        customerData.forEach(function(customer) {
            customerObjectStore.add(customer);
        });
    };

    db.transaction("customers").objectStore("customers").get("444-44-4444").onsuccess = function(event) {
        alert("Name for SSN 444-44-4444 is " + event.target.result.name);
    };
    console.log(customerData,"hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee teeeeeeeeeeeeeeeeeeeeessssssssssssssssssst");

};*/


var store = {
    db: null,

    init: function () {
        if (store.db) {
            return Promise.resolve(store.db);
        }
        return idb.open('resturant-data', 1, function (upgradeDb) {
            upgradeDb.createObjectStore('data', {autoIncrement: true, keyPath: 'id'});
        }).then(function (db) {
            return store.db = db;
        });
    },

    outbox: function (mode) {
        return store.init().then(function (db) {
            return db.transaction('data', mode).objectStore('data');
        })
    }
};


/*storeData = ( dbTable='reviews', Data = "test" ,dbName = "restaurant-static") => {
        idb.open(dbName, 1, function (upgradeDb) {
            upgradeDb.createObjectStore(dbTable, {autoIncrement: true, keyPath: 'id'});
        }).then(function (db) {
            let transaction = db.transaction(dbTable, 'readwrite');
            console.log("data will be stored",Data);
            return transaction.objectStore(dbTable).put(Data);
        }).catch(function (err) {
            console.log(err);
        });
    };
storeFavoriteUrl = (FavoriteData = "favorite",dbName = "restaurant-static")=>{
    idb.open(dbName, 1, function(upgradeDb) {
        upgradeDb.createObjectStore(dbfavoritesTable, { autoIncrement : true, keyPath: 'id' });
    }).then(function(db) {
        var transaction = db.transaction('favorite', 'readwrite');
        return transaction.objectStore(dbfavoritesTable).put(message);
    }).then(function() {
        // register for sync and clean up the form
    }).catch(function (err) {
        console.log(err);
    });
};*/

/*storeReview = (FavoriteData)=>{
    idb.open(dbName, 1, function(upgradeDb) {
        upgradeDb.createObjectStore(dbfavoritesTable, { autoIncrement : true, keyPath: 'id' });
    }).then(function(db) {
        var transaction = db.transaction(dbfavoritesTable, 'readwrite');
        return transaction.objectStore(dbfavoritesTable).put(message);
    }).then(function() {
        // register for sync and clean up the form
    }).catch(function (err) {
        console.log(err);
    });
};*/
