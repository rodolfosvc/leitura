import React, { Component } from 'react'
import SortIcon from '@material-ui/icons/Sort'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'

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
	const { style } = this.props
    const openMenu = Boolean(sortByElem)
    return (
      <div className={style}>
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

SortBy.propTypes = {
	style: PropTypes.string
}

export default SortBy