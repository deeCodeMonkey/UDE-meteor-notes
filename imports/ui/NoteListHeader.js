import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';


export const NoteListHeader = (props) => {
    return (
        <div className="item-list__header">
            <button className="button" onClick={() => props.meteorCall()}>Create Note</button>
        </div>
    );
}


NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}


export default createContainer(() => {   
    return {
        meteorCall: () => {
            Meteor.call('notes.insert', (err, res) => {
                if (res) {
                    Session.set('selectedNoteId',res);
                }
            })
        },
        Session
    };
}, NoteListHeader);