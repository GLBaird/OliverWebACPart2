/**
 * Person Class - Model for storing details of a person
 * @param {string|{surname:string, forename: string, date:number}} [data] Can be a surname string or a data object
 * @param {string} [forename] Forename string
 * @constructor
 */
function Person(data, forename){
    if (typeof data === "string") {
        this.surname = data;
    }
    if (typeof  forename === "string") {
        this.forename = forename;
    }

    // make model from existing data object
    if (typeof data === "object" && data != null) {
        this.setFromModelData(data);
    }
}

/**
 * Surname of a person
 * @type {string}
 */
Person.prototype.surname  = "Person";

/**
 * Forename of a person
 * @type {string}
 */
Person.prototype.forename = "New";

/**
 * Date person was added to system
 * @type {Date}
 */
Person.prototype.dateCreated = new Date();

/**
 * Get a formatted name in full - 'forename surname'
 * @returns {string}
 */
Person.prototype.getFullName = function() {
    return this.forename + " " + this.surname;
};

/**
 * Get a short date formatted - dd/mm/yyyy (localised)
 * @returns {string}
 */
Person.prototype.getFormattedDate = function() {
    return this.dateCreated.toDateString();
};

/**
 * Converts model into JSON object for storing and outputting as a string
 * @returns {{surname: string, forename: string, date: number}}
 */
Person.prototype.modelData = function() {
    return {
        surname: this.surname,
        forename: this.forename,
        date: Math.round( this.dateCreated.getTime() / 1000 )
    };
};

/**
 * Convert a JS Object into an instance of the model
 * Made for loading from string based JSON Stores
 * @param {{surname:string, forename: string, date:number}} data
 */
Person.prototype.setFromModelData = function(data) {
    this.surname = data.surname;
    this.forename = data.forename;
    this.dateCreated = new Date(data.date * 1000);
};