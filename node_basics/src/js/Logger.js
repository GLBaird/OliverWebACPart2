var Logger = {

    sayHello: function() {
        console.log("Hi there from logger!");
        $("body").append("<p>HI from Logger</p>");
    }

};

module.exports = Logger;