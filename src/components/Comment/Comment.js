import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class Comment extends Component {

  state = {
    editting: false
  }

  handleEdit = () => {
    this.setState({editting: true})
  }

  handleSave = () => {
    this.setState({editting: false})
  }

  handleCancel = () => {
    this.setState({editting: false})
  }


  render(){

    const { comment, classes } = this.props
    const { editting } = this.state

    return (
      <div>
        {comment && <Card key={comment.id}>
          <CardContent>
            <TextField
            id="commentBody"
            label="Body"
            multiline
            rowsMax="10"
            disabled={!editting}
            value={comment.body}
            onChange={ () => {} /*handleChange('body')*/}
            margin="normal"
            fullWidth
          />
            <Typography color="textSecondary">
              Author: {comment.author}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {editting && <Button color="inherit" onClick={this.handleSave}> Save </Button> }
            {editting && <Button color="inherit" onClick={this.handleCancel}> Cancel </Button> }
            {!editting &&
              <Tooltip id="tooltip-detail" title="Edit">
                <IconButton
                aria-owns={null}
                aria-haspopup="false"
                onClick={this.handleEdit}
                color="inherit"
                >
                  <EditIcon/>
                </IconButton>
              </Tooltip>}
            <Tooltip id="tooltip-detail" title="Delete">
              <IconButton
              aria-owns={null}
              aria-haspopup="false"
              onClick={() => {}}
              color="inherit"
              >
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>}
      </div>
    )
  }
}

export default connect()(withStyles(styles)(Comment))