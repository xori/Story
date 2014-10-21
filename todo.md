# TODO #

The current format of `events.js` is the format that I need to follow. I can't
use an `{ }` because the order of the inside objects isn't guarenteed.

### The Format

    events: [
      ["Event Title", "The short description."],
      ["A New Event", {
        description: "Some Description",
        changes: {
          characters : '+Evan'
        }
      }],
      ["Final Event", "The showdown of a lifetime."]
    ]

### Tasks

- [ ] Parse events file to database; the db's format should resemble:

    this.db = {
      events : {
        id : event,
        "A New Event": {title:"A New Event",description:"Some Description",changes:{...}}
      },
      stream : [
        event-id, event-id2, event-id3
      ]
    }

- [ ] Support Arcs
- [ ] Support Renaming Events
  - Use their descriptions as a secondary key to find original event
  - Allow for renaming in their `events/flat-file-event.json`
- [ ] Changes API Review

    // additions
    changes : {
      character : {
        evan : {
          ambitions : [],
          burdens : [],
          status : "Normal Human"
        }
      }
    }

    // deletions
    changes : {
      character : '-evan'
    }
    // or
    changes : {
      character : {
        evan : {
          ambitions : ['-Power', '-Get the Girl'],
          burdens : '+Lives at Stake' // add item to list
          status : "Demi God" // set item to string
        }
      }
    }
