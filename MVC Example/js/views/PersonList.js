/**
 * Buils a list element view
 * @param {string|HTMLElement} element
 * @param {Person[]} [data]
 * @constructor
 */
function PersonList(element, data) {
    if (typeof element === "object") {
        this.listElement = element;
    } else if (typeof element === "string") {
        this.listElement = document.getElementById(element);
    } else {
        throw new Error("Element must be a string or HTMLElement");
    }

    if (this.listElement == null) {
        throw new Error("Element not found");
    }

    if ( Array.isArray(data) ) {
        this.updateList(data);
    }
}

/**
 * Dom Element where the list view is appended
 * @type {HTMLElement}
 */
PersonList.prototype.listElement = null;

/**
 * Draw lists element onto the dom with dataset
 * @param {Person[]} data
 */
PersonList.prototype.updateList = function(data) {
    this.listElement.innerHTML = "";

    var ul = document.createElement("ul");

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var person = data[i];

            if (person.constructor !== Person) {
                console.warn("Incorrect instance of a model - should be Person", person);
                continue;
            }

            var li = document.createElement("li");
            li.innerHTML = person.getFullName()+", "+person.getFormattedDate();

            ul.appendChild(li);
        }
    }

    this.listElement.appendChild(ul);
};