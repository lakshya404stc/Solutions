import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <div className='card m-auto p-3 container-fluid '><div className='list-group text-center'>
       <h4 className='category-head'>User Panel</h4>
       <NavLink to="/dashboard/user/dashboard" className="list-group-item list-group-item-action rounded">Dashboard</NavLink>
    </div>
    </div>
  )
}

export default Usermenu