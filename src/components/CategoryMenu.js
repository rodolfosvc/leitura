import React from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'

const CategoryMenu = ({categories}) => {
  return (
    <MenuList component="nav">
      {categories && categories.map(c =>
        <MenuItem key={c.name}>
          <ListItemText inset primary={c.name}/>
        </MenuItem>)
      }
    </MenuList>
  )
}

export default CategoryMenu