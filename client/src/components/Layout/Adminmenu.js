import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='card m-auto p-3 container-fluid '><div className='list-group text-center'>
       <h4 className='category-head'>Admin Panel</h4>
       <NavLink to="/dashboard/admin/dashboard" className="list-group-item list-group-item-action rounded">Dashboard</NavLink>
       <NavLink to="/dashboard/admin/display-users" className="list-group-item list-group-item-action rounded">Display Users</NavLink>
    </div>
    </div>
  )
}

export default Adminmenu