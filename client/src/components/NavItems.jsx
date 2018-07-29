import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavLinkItem = (props) => (
    <NavLink exact to={props.to} activeStyle={{fontWeight: 'bold'}}>{props.label}</NavLink>
);

const NavItems = ({ children, user }) => {
    const { loggedIn, email } = user;
    
    return (
        <div>
            <div>
                <NavLinkItem to="/" label="Home" />&mdash;
                { loggedIn &&
                <span>
                    <NavLinkItem to="/protected" label="Protected" />&mdash;
                    <span>Logged in as {email}</span>&mdash;
                    <Link to="/logout">Logout</Link>
                </span>
                }
                { !loggedIn &&
                <span>
                    <NavLinkItem to="/login" label="Login" />&mdash;
                    <NavLinkItem to="/signup" label="Signup" />
                </span>
                }
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default NavItems;
