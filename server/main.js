import { Meteor } from 'meteor/meteor';
//to attach middleware
import { WebApp } from 'meteor/webapp';
//executes at load, registers to Methods
import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
    
});
