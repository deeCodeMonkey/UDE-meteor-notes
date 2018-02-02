import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

//stateless functional component (no state or life-cycle method)
export const PrivateHeader = (props) => {

    const navImageSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";

    return (
        <div className="header">
            <div className="header__content">
                <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
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
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired,
    handleNavToggle: PropTypes.func.isRequired
}


//to get data in presentational component above
export default createContainer(() => {
    //fetch data
    return {
        handleLogout: () => {
            Accounts.logout();
        },
        isNavOpen: Session.get('isNavOpen'),
        handleNavToggle: () => {
            Session.set('isNavOpen',
            !Session.get('isNavOpen'))
        }
    };
    //render data
}, PrivateHeader);

//export default PrivateHeader;