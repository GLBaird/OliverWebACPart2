function PersonForm(element) {
    if (typeof  element === "object") {
        this.formElement = element;
    } else if (typeof element === "string") {
        this.formElement = document.getElementById(element);
    } else {
        throw new Error("element should be a string or HTMLElement");
    }

    if (this.formElement == null) {
        throw new Error("element must not be null or you must have an element with id");
    }

    // build the form
    var form = document.createElement("form");

    // make input elements
    this._surnameInput = document.createElement("input");
    this._surnameInput.placeholder = "Enter surname";
    this._forenameInput = document.createElement("input");
    this._forenameInput.placeholder = "Enter forename";

    form.appendChild( this._surnameInput );
    form.appendChild( document.createElement("br") );
    form.appendChild( this._forenameInput );
    form.appendChild( document.createElement("br") );

    var resetButton = document.createElement("input");
    resetButton.type = "reset";
    resetButton.value = "Clear";

    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Save";

    form.appendChild(resetButton);
    form.appendChild(submitButton);

    // add form to page
    this.formElement.innerHTML = "";
    this.formElement.appendChild(form);

    // listen for form being submitted
    function handleFormSubmit(e) {
        e.preventDefault();

        // check data is valid!
        this._surnameInput.style.background = this.getSurname() === "" ? "red" : "";
        this._forenameInput.style.background = this.getForename() === "" ? "red" : "";

        if (this.getForename() === "" || this.getSurname() === "") {
            alert("You need to complete the form!");
            return;
        }

        // check callback is a function and pass details on
        if ( typeof this.onformsave === "function" ) {
            this.onformsave({ surname: this.getSurname(), forename: this.getForename() });
            this.setForename("");
            this.setSurname("");
        } else {
            console.warn("You should have an event handler for this form submission");
        }
    }
    this.formElement.addEventListener("submit", handleFormSubmit.bind(this));
}

/**
 * The HTML Element where the form will be created
 * @type {HTMLElement}
 */
PersonForm.prototype.formElement = null;

/**
 * Callback handler for form being saved
 * @type {function|null}
 */
PersonForm.prototype.onformsave = null;

/**
 * HTMLElement for <input surname>
 * @type {HTMLInputElement}
 * @private
 */
PersonForm.prototype._surnameInput = null;

/**
 * HTMLElement for <input forename>
 * @type {HTMLInputElement}
 * @private
 */
PersonForm.prototype._forenameInput = null;

// Getters and Setters

/**
 * Get current value of surname from form
 * @returns {string}
 */
PersonForm.prototype.getSurname = function() {
    return this._surnameInput.value;
};

/**
 * Get current value of forename from form
 * @returns {string}
 */
PersonForm.prototype.getForename = function() {
    return this._forenameInput.value;
};

/**
 * Update input element with new surname value
 * @param {string} surname
 */
PersonForm.prototype.setSurname = function(surname) {
    this._surnameInput.value = surname;
};

/**
 * Update input element with new forename value
 * @param {string} forename
 */
PersonForm.prototype.setForename = function(forename) {
    this._forenameInput.value  = forename;
};