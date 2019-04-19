import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

if(Meteor.isServer) {
    import wikipedia from "node-wikipedia";
    Meteor.methods({
        "wikiexplore"() {
            return new Promise((resolve, reject) => {
                wikipedia.page.data(term, { content: true }, resolve);
            });
        }
    });
}