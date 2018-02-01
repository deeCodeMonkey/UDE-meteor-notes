import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

//stateless functional component (no state or life-cycle method)
export const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() =>
                    props.handleLogout()
                }>Logout</button>
            </div>
        </div>
    );
}


PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}


//to get data in presentational component above
export default createContainer(() => {
    //fetch data
    return {
        handleLogout: () => {
            Accounts.logout();
        }
    };
    //render data
}, PrivateHeader);

//export default PrivateHeader;