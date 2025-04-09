export interface Menu {
    _id: string
    name: string
    description: string
    slug: string
    createdAt: string
    updatedAt: string
  }
  
  export interface MenuItem {
    _id: string
    name: string
    description: string
    price: number
    menuId: string
    createdAt: string
    updatedAt: string
  }
  