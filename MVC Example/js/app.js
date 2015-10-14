var app = {

    init: function() {
        // launch application
        console.log("Application Initialising...");

        // load data and setup user interface
        this.dataController.loadData();
        this.ui.setupUI();

        // detect window closing and save data
        window.addEventListener("beforeunload", this.dataController.saveData.bind(this.dataController));
    },

    ui: {

        formView: null,
        listView: null,

        setupUI: function() {
            console.log("Setting up user interface...");

            var pieAndMash = "YUM";

            // make form view
            this.formView = new PersonForm("detailsForm");
            this.formView.onformsave = this.saveNewUser.bind(this, pieAndMash);

            // make list view
            this.listView = new PersonList("detailsList", app.dataController.people);
        },

        saveNewUser: function(pieAndMash, details) {
            console.log(this, pieAndMash);
            var newPerson = new Person(details.surname, details.forename);
            app.dataController.addPerson(newPerson);
            this.listView.updateList(app.dataController.people);
        }
    },

    dataController: {

        people: [],

        addPerson: function(newPerson) {
            this.people.push(newPerson);
        },

        saveData: function() {
            if (typeof Storage !== "undefined") {
                // map data for storage
                var data = this.people.map(function(person) {
                    return person.modelData();
                });
                localStorage.data = JSON.stringify( data );
                console.log("Data saved");
            } else {
                console.log("Local Storage Not Available!");
            }
        },

        loadData: function() {
            if (typeof  Storage !== "undefined" && localStorage.data) {
                try {
                    var data = JSON.parse(localStorage.data);
                    this.people = data.map(function(personData) {
                        return new Person(personData);
                    });
                    console.log("Data loaded from Local Storage");
                } catch(e) {
                    console.warn("Problem loading local data - resetting!");
                    localStorage.data = "[]";
                }
            } else {
                console.log("Local Storage or Data not available");
            }
        }
    }
};

app.init();
