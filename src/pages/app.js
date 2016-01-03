import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'

export default React.createClass({
  componentWillMount() {

  },

  handleClick() {
    console.log('generate')
  },

  render() {
    return (
      <div>
        <AppBar
          title='Task Generator'
          iconElementRight={<FlatButton label='Generate' onClick={this.handleClick} />} />
      </div>
    )
  }
})
