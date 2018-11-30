import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        const { isLoggedIn } = this.props
        
        if (isLoggedIn) {
            return (
                <div className='header navbar navbar-light'>
                    <div className='header__navbar navbar-nav'>
                        <NavLink className='nav-item nav-link' activeClassName='active' to='/vote'>Vote</NavLink>
                        <NavLink className='nav-item nav-link' activeClassName='active' to='/stats'>Stats</NavLink>
                        <a href='javascript:;' className='nav-item nav-link' onClick={this.props.onLogout}>Logout</a>
                    </div>        
                </div>
            )
        }
       
        return (
            <div className='header navbar navbar-light'>
                <div className='header__navbar navbar-nav'>
                    <NavLink className='nav-item nav-link' activeClassName='active' to='/vote'>Vote</NavLink>
                    <NavLink className='nav-item nav-link' activeClassName='active' to='/login'>Login</NavLink>
                </div>        
            </div>
        )
    }
}

Header.defaultProps = { isLoggedIn: false };
