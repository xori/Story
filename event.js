
function Event (title, description, changes) {
  this.title = title || "An Event";
  this.description = description || "";
  this.changes = changes || {};
}

var self = Event.prototype;

self.getFilename = function() {
  return this.title.toLowerCase().trim().replace(/\s+/,'-') + ".json";
}

module.exports = Event
