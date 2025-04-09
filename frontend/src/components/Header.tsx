"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string): string => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo-container">
          <div className="logo-text">
            <span className="logo-deep">DEEP</span>
            <span className="logo-net">NET</span>
            <span className="logo-soft">SOFT</span>
          </div>
        </Link>

        <div className={`mobile-menu-button ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/")}`} onClick={closeMenu}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/menu")}`} onClick={closeMenu}>
                MENU
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className={`nav-link ${isActive("/admin")}`} onClick={closeMenu}>
                ADMIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
