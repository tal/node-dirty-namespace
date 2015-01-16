var Dirty = require('dirty');

function DirtyNamespace(db, ns) {
  this.ns = ns + ':';

  if (db instanceof Dirty || db instanceof DirtyNamespace) {
    this.db = db;
  } else {
    this.db = new Dirty(db);
  }
}

DirtyNamespace.prototype = {
  get path() {
    return this.db.path;
  },
  set path(path) {
    this.db.path = path;
    return this.db.path;
  },
  get: function(key) {
    return this.db.get(this.ns + key);
  },
  set: function(key, val, cb) {
    return this.db.set(this.ns + key, val, cb);
  },
  size: function() {
    return this.db.size();
  },
  rm: function(key, cb) {
    return this.db.rm(this.ns + key, cb);
  },
  close: function() {
    return this.db.close();
  },
  on: function() {
    return this.db.on.apply(this.db, arguments);
  },
  forEach: function(cb) {
    var self = this;

    return this.db.forEach(function(key, value) {
      if (key.slice(0, self.ns.length) === self.ns) {
        var newKey = key.slice(self.ns.length);
        return cb(newKey, value);
      }
    });
  }
};

module.exports = DirtyNamespace;
