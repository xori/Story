var json = require('./json'),
    fs = require('fs'), path = require('path'),
    args = require('minimist')(process.argv.slice(2)),
    Event = require('./event'),
    L = console.log, W = console.warn, E = console.error;

function Story(folder) {
  folder = folder || '.';
  this.eventsFile = path.join(folder,'events.js');
  this.eventsFolder = path.join(folder,'events');

  if(!fs.existsSync(this.eventsFile)) {
    W("`events.js` file could not be found. Creating new one in", path.resolve(folder));
    this.db = {
      events : [], arcs : []
    }
    json.serialize(this.db, this.eventsFile);
  } else {
    var _db = json.parse(this.eventsFile);
    this.db = _db;
  }
  if(!fs.existsSync(this.eventsFolder)) {
    W("`events` folder could not be found. Creating new one in", path.resolve(folder))
    fs.mkdirSync(this.eventsFolder);
  }
  L("We made it.")

  parse(this);
}

var self = Story.prototype;

self.addEvent = function(event, position) {

}

self.serialize = function() {
  var events = this.db.events;
  for(var i in events) {
    var event = events[i];
    json.serialize(event,
      path.join(this.eventsFolder, event.getFilename())
    );
    output[i] = event.description; //todo max length 80
  }
}

module.exports = Story;

/** Look for all of the events listed in 'story'
 * @param {Story} story
 *    A Story instance variable with a valid 'db' and 'eventsFolder' field
 * @returns void
 *    Turns all of the proxies in 'story.db.events' into full objects.
 *    Also turns any full objects that were in the proxies to files.          */
function parse(story) {
  var eventsList = fs.readdirSync(story.eventsFolder).map(function(item){
    if(!item.match(/^-/)) return item;
  });
  var problemChild = [];
  var events = story.db.events
  for(var i = 0; i < events.length; i++) {
    var event = events[i][1];
    event.title = events[i][0];
    if(event instanceof String) { // already parsed Event
      var filename = event.title.toLowerCase().replace(/\s+/,'-') + ".json";
      var fullEventIndex = eventsList.indexOf(filename)
      if(fullEventIndex != -1) {
        // if the file is in the event folder then we need to parse it and
        // replace the proxy with the full obj.
        events[i] = json.parse(
          path.join(story.eventsFolder, eventsList[fullEventIndex])
        );
        eventsList.remove(fullEventIndex);
      } else //todo possible rename
        problemChild.push({event:i,desc:event});
    } else { // needs to be parsed
      var nEvent = new Event(event.title, event.description || event.desc, event.changes);
      json.serialize(nEvent,
        path.join(story.eventsFolder, nEvent.getFilename())
      );
      events[i] = nEvent;
    }
  }

  // Now populate the arcs.
  // todo
  // var arcs = story.db.arcs;
  // for(var i - 0; i < arcs.length; i++) {
  //   var arc = arcs[i];
  //   if(arc instanceof String) {
  //
  //   } else {
  //
  //   }
  // }

  E("Bad Events", problemChild);
}
