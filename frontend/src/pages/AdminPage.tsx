"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import axios from "axios"
import "./AdminPage.css"
import type { Menu, MenuItem } from "../types"

const API_URL = "http://localhost:5000/api"

interface MenuFormData {
  name: string
  description: string
}

interface MenuItemFormData {
  name: string
  description: string
  price: string
  menuId: string
}

const AdminPage = () => {
  const [menus, setMenus] = useState<Menu[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [newMenu, setNewMenu] = useState<MenuFormData>({ name: "", description: "" })
  const [newMenuItem, setNewMenuItem] = useState<MenuItemFormData>({
    name: "",
    description: "",
    price: "",
    menuId: "",
  })

  // Edit states
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    fetchMenus()
  }, [])

  useEffect(() => {
    if (selectedMenu) {
      fetchMenuItems(selectedMenu._id)
    }
  }, [selectedMenu])

  const fetchMenus = async () => {
    try {
      setLoading(true)
      const response = await axios.get<Menu[]>(`${API_URL}/menus`)
      setMenus(response.data)

      if (response.data.length > 0 && !selectedMenu) {
        setSelectedMenu(response.data[0])
      }
    } catch (err) {
      setError("Failed to fetch menus")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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

  const handleMenuChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value })
  }

  const handleMenuItemChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMenuItem({ ...newMenuItem, [e.target.name]: e.target.value })
  }

  const handleEditMenuChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingMenu) {
      setEditingMenu({ ...editingMenu, [e.target.name]: e.target.value })
    }
  }

  const handleEditMenuItemChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingMenuItem) {
      setEditingMenuItem({ ...editingMenuItem, [e.target.name]: e.target.value as any })
    }
  }

  const handleMenuSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/menus`, newMenu)
      setNewMenu({ name: "", description: "" })
      fetchMenus()
    } catch (err) {
      setError("Failed to create menu")
      console.error(err)
    }
  }

  const handleMenuItemSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedMenu) return

    try {
      const menuItemData = {
        ...newMenuItem,
        menuId: selectedMenu._id,
        price: Number.parseFloat(newMenuItem.price),
      }

      await axios.post(`${API_URL}/menu-items`, menuItemData)
      setNewMenuItem({ name: "", description: "", price: "", menuId: "" })
      fetchMenuItems(selectedMenu._id)
    } catch (err) {
      setError("Failed to create menu item")
      console.error(err)
    }
  }

  const handleUpdateMenu = async (e: FormEvent) => {
    e.preventDefault()
    if (!editingMenu) return

    try {
      await axios.put(`${API_URL}/menus/${editingMenu._id}`, editingMenu)
      setEditingMenu(null)
      fetchMenus()
    } catch (err) {
      setError("Failed to update menu")
      console.error(err)
    }
  }

  const handleUpdateMenuItem = async (e: FormEvent) => {
    e.preventDefault()
    if (!editingMenuItem) return

    try {
      const menuItemData = {
        ...editingMenuItem,
        price: Number.parseFloat(editingMenuItem.price.toString()),
      }

      await axios.put(`${API_URL}/menu-items/${editingMenuItem._id}`, menuItemData)
      setEditingMenuItem(null)
      if (selectedMenu) {
        fetchMenuItems(selectedMenu._id)
      }
    } catch (err) {
      setError("Failed to update menu item")
      console.error(err)
    }
  }

  const handleDeleteMenu = async (menuId: string) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await axios.delete(`${API_URL}/menus/${menuId}`)
        fetchMenus()
        if (selectedMenu && selectedMenu._id === menuId) {
          setSelectedMenu(null)
        }
      } catch (err) {
        setError("Failed to delete menu")
        console.error(err)
      }
    }
  }

  const handleDeleteMenuItem = async (menuItemId: string) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axios.delete(`${API_URL}/menu-items/${menuItemId}`)
        if (selectedMenu) {
          fetchMenuItems(selectedMenu._id)
        }
      } catch (err) {
        setError("Failed to delete menu item")
        console.error(err)
      }
    }
  }

  const startEditMenu = (menu: Menu) => {
    setEditingMenu({ ...menu })
  }

  const startEditMenuItem = (menuItem: MenuItem) => {
    setEditingMenuItem({ ...menuItem })
  }

  const cancelEditMenu = () => {
    setEditingMenu(null)
  }

  const cancelEditMenuItem = () => {
    setEditingMenuItem(null)
  }

  if (loading && !menus.length) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="admin-title">Menu Management</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="admin-grid">
          <div className="admin-section">
            <h2 className="section-title">Menus</h2>

            <form className="admin-form" onSubmit={handleMenuSubmit}>
              <div className="form-group">
                <label htmlFor="menuName">Menu Name</label>
                <input
                  type="text"
                  id="menuName"
                  name="name"
                  value={newMenu.name}
                  onChange={handleMenuChange}
                  required
                  placeholder="e.g., Drinks, Food, Brunch"
                />
              </div>

              <div className="form-group">
                <label htmlFor="menuDescription">Description</label>
                <textarea
                  id="menuDescription"
                  name="description"
                  value={newMenu.description}
                  onChange={handleMenuChange}
                  required
                  placeholder="Brief description of this menu"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Menu
              </button>
            </form>

            <div className="menu-list">
              <h3>Existing Menus</h3>
              {menus.length === 0 ? (
                <p className="no-items">No menus created yet.</p>
              ) : (
                <ul>
                  {menus.map((menu) => (
                    <li
                      key={menu._id}
                      className={`menu-list-item ${selectedMenu && selectedMenu._id === menu._id ? "active" : ""}`}
                    >
                      <div className="menu-list-content" onClick={() => setSelectedMenu(menu)}>
                        <h4>{menu.name}</h4>
                        <p>{menu.description}</p>
                      </div>
                      <div className="menu-list-actions">
                        <button className="btn-edit" onClick={() => startEditMenu(menu)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDeleteMenu(menu._id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {editingMenu && (
              <div className="edit-form-container">
                <h3>Edit Menu</h3>
                <form className="admin-form" onSubmit={handleUpdateMenu}>
                  <div className="form-group">
                    <label htmlFor="editMenuName">Menu Name</label>
                    <input
                      type="text"
                      id="editMenuName"
                      name="name"
                      value={editingMenu.name}
                      onChange={handleEditMenuChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="editMenuDescription">Description</label>
                    <textarea
                      id="editMenuDescription"
                      name="description"
                      value={editingMenu.description}
                      onChange={handleEditMenuChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Update Menu
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cancelEditMenu}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="admin-section">
            <h2 className="section-title">Menu Items</h2>

            {selectedMenu ? (
              <>
                <p className="selected-menu">
                  Selected Menu: <strong>{selectedMenu.name}</strong>
                </p>

                <form className="admin-form" onSubmit={handleMenuItemSubmit}>
                  <div className="form-group">
                    <label htmlFor="itemName">Item Name</label>
                    <input
                      type="text"
                      id="itemName"
                      name="name"
                      value={newMenuItem.name}
                      onChange={handleMenuItemChange}
                      required
                      placeholder="e.g., CINNAMON TOAST CRUNCH"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="itemDescription">Description</label>
                    <textarea
                      id="itemDescription"
                      name="description"
                      value={newMenuItem.description}
                      onChange={handleMenuItemChange}
                      required
                      placeholder="Brief description of this item"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="itemPrice">Price</label>
                    <input
                      type="number"
                      id="itemPrice"
                      name="price"
                      value={newMenuItem.price}
                      onChange={handleMenuItemChange}
                      required
                      step="0.01"
                      min="0"
                      placeholder="e.g., 16.00"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Menu Item
                  </button>
                </form>

                <div className="menu-items-list">
                  <h3>Existing Items in {selectedMenu.name}</h3>
                  {menuItems.length === 0 ? (
                    <p className="no-items">No items in this menu yet.</p>
                  ) : (
                    <ul>
                      {menuItems.map((item) => (
                        <li key={item._id} className="menu-item-list-item">
                          <div className="menu-item-list-content">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p className="item-price">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="menu-item-list-actions">
                            <button className="btn-edit" onClick={() => startEditMenuItem(item)}>
                              Edit
                            </button>
                            <button className="btn-delete" onClick={() => handleDeleteMenuItem(item._id)}>
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {editingMenuItem && (
                  <div className="edit-form-container">
                    <h3>Edit Menu Item</h3>
                    <form className="admin-form" onSubmit={handleUpdateMenuItem}>
                      <div className="form-group">
                        <label htmlFor="editItemName">Item Name</label>
                        <input
                          type="text"
                          id="editItemName"
                          name="name"
                          value={editingMenuItem.name}
                          onChange={handleEditMenuItemChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="editItemDescription">Description</label>
                        <textarea
                          id="editItemDescription"
                          name="description"
                          value={editingMenuItem.description}
                          onChange={handleEditMenuItemChange}
                          required
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="editItemPrice">Price</label>
                        <input
                          type="number"
                          id="editItemPrice"
                          name="price"
                          value={editingMenuItem.price}
                          onChange={handleEditMenuItemChange}
                          required
                          step="0.01"
                          min="0"
                        />
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                          Update Item
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cancelEditMenuItem}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <p className="no-menu-selected">Please select or create a menu first.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
