import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';


export const NoteListHeader = (props) => {
    return (
        <div className="">
            <button onClick={() => props.meteorCall()}>New Note</button>
        </div>
    );
}


NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}


export default createContainer(() => {   
    return {
        meteorCall: () => {
            Meteor.call('notes.insert')
        }
    };
}, NoteListHeader);