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

  getSortByValue = (value) => {
    const { options } = this.props
    return Object.keys(options).find( k => {
      return options[k].VALUE === value
    })
  }

  handleMenu = event => {
    this.setState({ sortByElem: event.currentTarget });
  }

  handleClose = event => {
    const { options, onChange } = this.props
    const key = this.getSortByValue(event.target.value)
    if(key){
      const { PROP, ASC } = options[key]
      const sortByInfo = {
        property: PROP,
        ascending: ASC
      }
      onChange(sortByInfo)
    }
    this.setState({ sortByElem: null });
  }

  render() {

    const { sortByElem } = this.state
    const { style, options } = this.props
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
            <MenuItem value={options.SCORE_ASC.VALUE} onClick={this.handleClose}>{options.SCORE_ASC.TEXT}</MenuItem>
            <MenuItem value={options.SCORE_DESC.VALUE} onClick={this.handleClose}>{options.SCORE_DESC.TEXT}</MenuItem>
            <MenuItem value={options.DATE_ASC.VALUE} onClick={this.handleClose}>{options.DATE_ASC.TEXT}</MenuItem>
        </Menu>
      </div>
    )
  }
}

SortBy.propTypes = {
	style: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func
}

export default SortBy