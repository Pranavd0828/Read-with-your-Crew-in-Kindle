import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';

const Layout = () => {
    return (
        <div className="container">
            <div className="screen-content">
                <Outlet />
            </div>

            <nav className="bottom-nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <BookOpen />
                    <span>Library</span>
                </NavLink>

                <NavLink
                    to="/streak"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <Users />
                    <span>Crew</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Layout;
