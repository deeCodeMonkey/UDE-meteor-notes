import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const currentPagePrivacy = Session.get('currentPagePrivacy');
    console.log('currentPagePrivacy', currentPagePrivacy);
    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    //watch for note selected and update URL to note
    const selectedNoteId = Session.get('selectedNoteId');

    //when note selected, nav closes
    Session.set('isNavOpen', false);

    //if note selected, update url
    if (selectedNoteId) {
        browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
});

Tracker.autorun(() => {
    //related to mobile presentation of menu bar
    const isNavOpen = Session.get('isNavOpen');
    //to show css class. parameters- class and bool. if bool true then add class. if bool false then remove class.
    document.body.classList.toggle('is-nav-open', isNavOpen);
});


Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    Session.set('isNavOpen', false);
    ReactDOM.render(routes, document.getElementById('app'));
});