import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
const wikipedia = require("node-wikipedia");

if(Meteor.isServer) {

    Meteor.methods({
        //let wikipedia = require("node-wikipedia");
        "wikiexplore"(term) {
            check(term, String);
            console.log("backend: searching " + term);
            return new Promise((resolve, reject) => {
                wikipedia.page.data(term, { content: true }, resolve);
            });
        }
    });
}