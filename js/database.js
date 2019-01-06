var dbPromised = idb.open("exports-db", 1, function(upgradeDb) {
  var matchesObjectStore = upgradeDb.createObjectStore("matches");
  matchesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(match) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("matches", "readwrite");
      var store = tx.objectStore("matches");
      console.log(match);
      store.add(match.match, match.match.id);
      return tx.complete;
    })
    .then(function() {
      console.log("Match berhasil di simpan.");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("matches", "readonly");
        var store = tx.objectStore("matches");
        return store.getAll();
      })
      .then(function(matches) {
        resolve(matches);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("matches", "readonly");
        var store = tx.objectStore("matches");
        return store.get(id);
      })
      .then(function(match) {
        resolve(match);
      });
  });
}

function deleteById(id) {
  idData = parseInt(id)
  dbPromised
  .then(function(db) {
      var tx = db.transaction("matches", "readwrite");
      var store = tx.objectStore("matches");
      store.delete(idData);
      return tx.complete;
  }).
  then(function(){
    console.log("terhapus")
  })
  // console.log(id)
}