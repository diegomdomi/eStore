import React, { useState,useEffect,useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import  Context  from '../../Context/index'
import { Link } from 'react-router-dom'
import './darkMode.css'
import './store.css'

const NavBarStore = () => {
  const [theme, setTheme] = useState('light');
const userRegister = useContext(Context)
const userLoged= userRegister.users.email

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  

  return (
    <div className={`App ${theme}`}>
      <nav >
        <div className="nav-wrapper">
          <Link to="/store" className="brand-logo center">e-STorE</Link>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><Link to="/store">Store</Link></li>
          </ul>
          <ul>
            <li className="right hide-on-med-and-down" >
            <button className="btn btn-primary" onClick={toggleTheme}style={{margin:"15px"}}>
              {theme==="light" ? (<div><FontAwesomeIcon icon={faMoon}/></div>): (<div><FontAwesomeIcon icon={faSun}/></div>)}
            </button>
            </li>
            <li className="right hide-on-med-and-down">Hello! {userLoged}</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBarStore