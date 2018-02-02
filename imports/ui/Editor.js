import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends Component {

    state = {
        title: '',
        body: ''
    }

    handleBodyChange = (e) => {
        const body = e.target.value;
        this.setState({ body });
        this.props.call('notes.update', this.props.note._id, { body });
    }

    handleTitleChange = (e) => {
        const title = e.target.value;
        this.setState({ title });
        this.props.call('notes.update', this.props.note._id, { title });
    }

    //gets called right after the state or component gets changed
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }

    }

    handleRemoval = () => {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/');
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input value={this.state.title} placeholder={'Untitled Note'} onChange={this.handleTitleChange}/>
                    <textarea value={this.state.body} placeholder={'Your note here.'} onChange={this.handleBodyChange}></textarea>
                    <button onClick={this.handleRemoval}>Delete Note</button>
                </div>
            );
        } else {
            return (
                <p> {this.props.selectedNoteId ? 'Note not found.' : 'Create or click on a note!'} </p>
            );
        }
    }
}


Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
}


export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    };
}, Editor);