"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./MenuPage.css"
import type { Menu, MenuItem } from "../types"

const API_URL = "http://localhost:5000/api"

const MenuPage = () => {
  const { slug } = useParams<{ slug?: string }>()
  const [menus, setMenus] = useState<Menu[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get<Menu[]>(`${API_URL}/menus`)
        setMenus(response.data)

        // Set active menu based on slug or default to first menu
        if (response.data.length > 0) {
          const menuToActivate = slug ? response.data.find((menu) => menu.slug === slug) : response.data[0]

          if (menuToActivate) {
            setActiveMenu(menuToActivate)
            fetchMenuItems(menuToActivate._id)
          }
        }
      } catch (err) {
        setError("Failed to fetch menus")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [slug])

  const fetchMenuItems = async (menuId: string) => {
    try {
      setLoading(true)
      const response = await axios.get<MenuItem[]>(`${API_URL}/menu-items/menu/${menuId}`)
      setMenuItems(response.data)
    } catch (err) {
      setError("Failed to fetch menu items")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleMenuClick = (menu: Menu) => {
    setActiveMenu(menu)
    fetchMenuItems(menu._id)
  }

  if (loading && !menus.length) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="container">
          <h1 className="menu-title">MENU</h1>
          <p className="menu-description">
            Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the
            "Order Online" button located below the menu.
          </p>
        </div>
      </div>

      <div className="menu-content container">
        <div className="menu-tabs">
          {menus.map((menu) => (
            <button
              key={menu._id}
              className={`menu-tab ${activeMenu && activeMenu._id === menu._id ? "active" : ""}`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.name}
            </button>
          ))}
        </div>

        {activeMenu && (
          <div className="menu-items-container">
            <h2 className="menu-category-title">
              {activeMenu.name === "DRINKS" ? "BRUNCH COCKTAILS" : activeMenu.name}
            </h2>

            {menuItems.length === 0 ? (
              <p className="no-items">No items in this menu yet.</p>
            ) : (
              <div className="menu-items">
                {menuItems.map((item) => (
                  <div key={item._id} className="menu-item">
                    <div className="menu-item-header">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <div className="menu-item-dots"></div>
                      <span className="menu-item-price">${item.price}</span>
                    </div>
                    <p className="menu-item-description">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuPage
