import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import TextField from 'material-ui/lib/TextField/TextField'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import Generation from '../service/generation'

export default React.createClass({
  getInitialState() {
    return {value: '', loading: false}
  },

  generate() {
    let generation = new Generation(parseInt(this.state.value))
    setTimeout(() => generation.downloadAnswers(), 500)
    setTimeout(() => generation.downloadQuestions(), 1000)
    setTimeout(() => this.setState({loading: false}), 1500)
  },

  handleClick() {
    this.setState({loading: true})
    setTimeout(() => this.generate(), 1000)
  },

  render() {
    return (
      <div>
        <AppBar title='Task Generator' />
        <Card initiallyExpanded style={{
          padding: '30px 40px 30px 40px',
          width: 600,
          margin: '80px auto 0'
        }}>
          {
            this.state.loading &&
            <RefreshIndicator
              size={40}
              style={{
              float: 'right',
              position: 'relative',
              boxShadow: 'none'
            }}
              top={0}
              left={0}
              status='loading'
            />
          }
          <CardHeader
            title='Generate test'
            titleStyle={{fontSize: '30px'}}
            style={{padding: 0, height: 50}} />
          <TextField
            hintText='Add number of variants'
            floatingLabelText='Number of variants'
            inputStyle={{marginLeft: 5}}
            hintStyle={{marginLeft: 5}}
            floatingLabelStyle={{marginLeft: 5}}
            value={this.state.value}
            fullWidth
            onChange={event => this.setState({value: event.target.value})} />
          <FlatButton
            secondary
            label='Generate'
            style={{width: '100%', marginTop: '15px'}}
            onClick={this.handleClick} />
        </Card>
        <div id='jxgbox' clasNames='jxgbox' style={{width: 600, height: 600, margin: '20px auto', display: 'none'}}>
        </div>
      </div>
    )
  }
})
