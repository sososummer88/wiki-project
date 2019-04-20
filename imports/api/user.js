import { Meteor } from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const UserHis = new Mongo.Collection("userHisTable");

if (Meteor.isServer) {
    Meteor.publish("userhistory", function(userid) {
        return UserHis.find({_id: userid});
    });
}

Meteor.methods({
    "history.insert"(hist) {
        check(hist, String);

        if (Meteor.isServer) {
            if (!Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }
            UserHis.insert({
                userid: Meteor.userId(),
                history: hist
            });
        }
    },
});
