
var db;
var request = indexedDB.open("Favorites");

request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  db = request.result;
  var store = db.createObjectStore("favorites", {keyPath: "name"});
  store.createIndex("name", "name", {unique: true});

  // Populate with initial data.
  store.put({name: "abenezer", gender: "male"});
  store.put({name: "yabets", gender: "male" });
  store.put({name: "tsega", gender: "unisex"});
};

request.onsuccess = function() {
  db = request.result;
};

var add = function(favorite){
    var tx = db.transaction("favorites", "readwrite");
    var store = tx.objectStore("favorites");

    store.put(favorite);

    tx.oncomplete = function() {
        // All requests have succeeded and the transaction has committed.
        console.log("Completed adding.");
        return true;
    };
}
var remove = function(name){
    var tx = db.transaction("favorites", "readwrite");
    var store = tx.objectStore("favorites");

    store.delete(name);

    tx.oncomplete = function() {
        // All requests have succeeded and the transaction has committed.
        console.log("Completed removing.");
        return true;
    };
}

var isFav = function(name){
    return new Promise((resolve, reject)=>{
        var tx = db.transaction("favorites", "readonly");
        var store = tx.objectStore("favorites");
        var index = store.index("name");

        var request = index.get(name.toLowerCase());

        request.onsuccess = function() {
            var matching = request.result;
            if (matching !== undefined) {
                // A match was found.
                resolve(true);
            } else {
                // No match was found.
                resolve(false);
            }
        };
        request.onerror = function(err){
            reject(err);
        }
    })
    
}

var allFavorites = function(){

    return new Promise((resolve,reject)=>{

        var tx = db.transaction("favorites", "readonly");
        var store = tx.objectStore("favorites");
        var index = store.index("name");

        var allNames = [];
        var request = index.openCursor();
        request.onsuccess = function() {
            var cursor = request.result;
            if (cursor) {
                // Called for each matching record.
                allNames.push({name: cursor.value.name.toLowerCase(), gender: cursor.value.gender})
                cursor.continue();
            } else {
                // No more matching records.
                resolve(allNames);
            }
        };
        request.onerror = function(err){
            reject(err);
        }
    })
    
}

export { allFavorites, remove, add, isFav };


