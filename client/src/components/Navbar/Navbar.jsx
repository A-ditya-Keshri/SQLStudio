import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__container container">
                <h1 className="navbar__logo">Cipher<span>SQL</span>Studio</h1>
                <ul className="navbar__menu">
                    <li className="navbar__item"><a href="/" className="navbar__link">Home</a></li>
                    <li className="navbar__item"><a href="/assignments" className="navbar__link">Assignments</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
