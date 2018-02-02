import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

//presentational component with no props
export default () => {

    return (
        <div>
            <PrivateHeader title="Notes" />
            <div className="page-content">
                <div className="page-content__sidebar">
                    <NoteList />
                </div>
             
                <div className="page-content__main">
                    <Editor />
                </div>
                

            </div>
        </div>
    );
}

