import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

//presentational component with no props
export default () => {

    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
             
                <NoteList />

                <Editor />

            </div>
        </div>
    );
}

