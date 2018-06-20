import React from 'react'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  voteScore: {
    paddingTop: 14,
    paddingLeft: 5
  }
}

const voteOption = {
    up: 'upVote',
    down: 'downVote'
}

const VoteScore = ({voteFunc, elem, classes}) => {
  return (
    <Grid container spacing={0}>
      <Grid item>
        <Tooltip id="tooltip-detail" title="Like">
          <IconButton
          aria-owns={null}
          aria-haspopup="false"
          aria-label="Like"
          color="inherit"
          onClick={() => voteFunc(voteOption.up)}
          >
            <ThumbUp/>
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip id="tooltip-detail" title="Dislike">
          <IconButton
          aria-owns={null}
          aria-haspopup="false"
          aria-label="Dislike"
          color="inherit"
          onClick={() => voteFunc(voteOption.down)}
          >
            <ThumbDown/>
          </IconButton>
        </Tooltip>
      </Grid>
     <Grid item className={classes.voteScore}>
        <Typography color="textSecondary">
          {`Vote Score: ${elem.voteScore}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(VoteScore)