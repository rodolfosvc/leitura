import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = {
  formControl: {
    minWidth: 120
  }
}

class MaterialUISelect extends Component {

  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  changeCategorie = event => {
      this.props.post.categorie = event.target.value;
  }

  render() {

    const { open } = this.state
    const { post , classes, categories } = this.props

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="categorieSelect">Categorie</InputLabel>
        <Select
          open={open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={post.categorie}
          onChange={this.changeCategorie}
          inputProps={{
            name: 'categorie',
            id: 'categorieSelect',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            categories && categories.map(
              c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)
          }
        </Select>
      </FormControl>
    )
  }
}

  function mapStateToProps ({categories }) {
    return { categories }
  }

export default connect(mapStateToProps)(withStyles(styles)(MaterialUISelect))