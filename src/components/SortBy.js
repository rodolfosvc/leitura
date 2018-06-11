import React, { Component } from 'react'
import SortIcon from '@material-ui/icons/Sort'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

class SortBy extends Component {

  state = {
    sortByElem: null
  }

  handleMenu = event => {
    this.setState({ sortByElem: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ sortByElem: null });
  }

  render() {

    const { sortByElem } = this.state
    const openMenu = Boolean(sortByElem);

    return (
      <div>
        <IconButton
              aria-owns={openMenu ? 'sortBy' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
          <SortIcon/>
        </IconButton>
        <Menu
            id="sortBy"
            anchorEl={sortByElem}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Vote Score</MenuItem>
            <MenuItem onClick={this.handleClose}>Data Criação</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default SortBy