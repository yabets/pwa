
var db;
var request = indexedDB.open("Favorites");

request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  db = request.result;
  var store = db.createObjectStore("favorites", {keyPath: "name"});
  store.createIndex("name", "name", {unique: true});

};

request.onsuccess = function() {
  db = request.result;
};

var add = function(favorite){
    var tx = db.transaction("favorites", "readwrite");
    var store = tx.objectStore("favorites");

    store.put(favorite);
}
var remove = function(name){
    var tx = db.transaction("favorites", "readwrite");
    var store = tx.objectStore("favorites");

    store.delete(name.toLowerCase());
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


