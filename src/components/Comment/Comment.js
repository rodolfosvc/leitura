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
import { saveComment, deleteComment, updateComment } from '../../actions'
import PropTypes from 'prop-types'

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class Comment extends Component {

  state = {
    editting: false,
    comment: this.props.initValue
  }

  onClickEdit = () => {
    this.setState({editting: true})
  }

  onClickSave = () => {
    const { comment } = this.state
    const { isAdd, afterSaveOrCancel } = this.props
    if(isAdd){
      //dispatch add new comment
      this.props.dispatch(saveComment(comment))
    }else{
      //dispatch update comment
      this.props.dispatch(updateComment(comment))
    }

    if(afterSaveOrCancel)
      afterSaveOrCancel()

    this.setState({editting: false})
  }

  onClickCancel = () => {
    const { afterSaveOrCancel, initValue } = this.props
    if(afterSaveOrCancel)
      afterSaveOrCancel()
    this.setState({ comment: initValue, editting: false})
  }

  onClickDelete = () => {
    const { comment } = this.state
    //dispatch delete comment
    this.props.dispatch(deleteComment(comment))
  }

  handleChange = propName => event => {
    const { comment } = this.state
    this.setState({
      comment: {
        ...comment,
        [propName]: event.target.value,
      }
    })
  }

  render(){

    const { classes, isAdd } = this.props
    const { comment, editting } = this.state

    return (
      <div>
        {comment && <Card key={comment.id}>
          <CardContent>
            <TextField
            id="commentBody"
            label="Body"
            multiline
            rowsMax="10"
            disabled={!isAdd && !editting}
            value={comment.body}
            onChange={ this.handleChange('body') }
            margin="normal"
            fullWidth
          />
            <Typography color="textSecondary">
              Author: {comment.author}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {(isAdd || editting) && <Button color="inherit" onClick={this.onClickSave}> {isAdd? 'Save' : 'Save Changes'} </Button> }
            {(isAdd || editting) && <Button color="inherit" onClick={this.onClickCancel}> Cancel </Button> }
            {!isAdd && !editting &&
              <Tooltip id="tooltip-detail" title="Edit">
                <IconButton
                aria-owns={null}
                aria-haspopup="false"
                onClick={this.onClickEdit}
                color="inherit"
                >
                  <EditIcon/>
                </IconButton>
              </Tooltip>}
            {!isAdd && !editting &&
              <Tooltip id="tooltip-detail" title="Delete">
                <IconButton
                aria-owns={null}
                aria-haspopup="false"
                onClick={this.onClickDelete}
                color="inherit"
                >
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>}
          </CardActions>
        </Card>}
      </div>
    )
  }
}

Comment.propTypes = {
	isAdd: PropTypes.bool.isRequired,
	initValue: PropTypes.object.isRequired,
	afterSaveOrCancel: PropTypes.func
}

export default connect()(withStyles(styles)(Comment))