import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/TextField/TextField'
import RadioButton from 'material-ui/lib/radio-button'
import Colors from 'material-ui/lib/styles/colors'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import DoneIcon from 'material-ui/lib/svg-icons/action/check-circle'
import ErrorIcon from 'material-ui/lib/svg-icons/action/highlight-off'
import Test from '../../service/test'


export default React.createClass({
  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      task: new Test(),
      answers: ['', ''],
      correct: [false, false],
      mark: null
    }
  },

  newTest() {
    const state = this.getState()
    this.setState(state)
    state.task.draw()
  },

  handleCheck(index, value) {
    this.setState(({answers}) => {
      answers[index] = value
      return {answers}
    })
  },

  handleClick() {
    const {mark, correct} = this.state.answers.reduce((memo, answer, index) => {
      let correctAnswer = Array.isArray(this.state.task.tests[index].correct)
        ? this.state.task.tests[index].correct.join(' ')
        : this.state.task.tests[index].correctKey || this.state.task.tests[index].correct.toString()
      let check = correctAnswer == answer
      memo.correct.push(check)
      memo.mark += check ? 1 : 0
      return memo
    }, {correct: [], mark: 0})
    this.setState({mark, correct})
  },

  componentDidMount() {
    this.state.task.draw()
  },

  showIcon(index) {
    const style = {
      top: 5,
      position: 'relative',
      marginLeft: 3
    }
    return (
      this.state.correct[index]
      ? <DoneIcon style={style} color={Colors.green500} />
      : <ErrorIcon style={style} color={Colors.red500} />
    )
  },

  render() {
    const canvasStyle = {
      width: 550,
      height: 550,
      border: 'none',
      margin: '50px 0'
    }
    let {system} = this.state.task.system
    let input = system.input
    return (
      <div>
        <Card initiallyExpanded style={{
          padding: '30px 40px 30px 40px',
          width: 1150,
          margin: '80px auto'
        }}>
          <div style={{
            float: 'right',
            zIndex: 100,
            position: 'relative',
            width: 550
          }}>
            <CardTitle
              title={(
                <span style={{
                  opacity: Number.isInteger(this.state.mark) ? 1 : 0,
                  marginLeft: 32
                }}>
                  Оцінка {this.state.mark}
                </span>
              )}
              style={{paddingLeft: 0}} />
            <RaisedButton
              label='Змінити умову'
              secondary={true}
              onClick={this.newTest}
              style={{marginLeft: 32}} />
            <div id='jxgbox' className='jxgbox' style={canvasStyle} />
          </div>
          <CardHeader
            title='Тест №1'
            titleStyle={{fontSize: '30px'}}
            style={{padding: 0, height: 50, marginLeft: 17}} />
          <CardText style={{fontSize: 16}}>z {system.func.type} = {input.objective}</CardText>
          {
            input.constraints.map((item, index) =>
              <CardText
                key={index}
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  fontSize: 16,
                  display: 'inline-block'
                }}>{index + 1}) {item}</CardText>)
          }
          {
            this.state.task.tests
              .filter((x, index) => index < 2)
              .map(({question , test, correct}, index) => (
                <div key={index}>
                  <CardText
                    key={index}
                    style={!Array.isArray(test) ? {marginBottom: -10, fontSize: 16} : {fontSize: 16}}>
                    {index + 1}) {question} {Array.isArray(correct) && '(Координати ввести через пробіл)'}
                    {
                      Number.isInteger(this.state.mark)
                      ? this.showIcon(index)
                      : <span style={{height: 24, width: 24, opacity: 0, position: 'relative', display: 'inline-block', top: 5}} />
                    }
                  </CardText>
                  <TextField
                    hintText='Відповідь'
                    inputStyle={{marginLeft: 5, width: 150}}
                    style={{marginLeft: 16}}
                    hintStyle={{marginLeft: 5}}
                    value={this.state.answers[index]}
                    onChange={event => this.handleCheck(index, event.target.value)} />
                </div>
              ))
          }
          <FlatButton
            secondary
            label='submit'
            style={{width: '100%', marginTop: '15px'}}
            onClick={this.handleClick} />
        </Card>
      </div>
    )
  }
})
