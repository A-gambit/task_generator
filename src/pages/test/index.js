import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/TextField/TextField'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import Test from '../../service/test'

const testKey = ['a', 'b', 'c', 'd']

export default React.createClass({
  getInitialState() {
    return this.getState()
  },

  getState() {
    return {
      task: new Test(),
      answers: ['', '', null, null, ''],
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
    const mark = this.state.answers.reduce((memo, answer, index) => {
      let correctAnswer = Array.isArray(this.state.task.tests[index].correct)
        ? this.state.task.tests[index].correct.join(' ')
        : this.state.task.tests[index].correctKey || this.state.task.tests[index].correct.toString()
      memo += correctAnswer == answer ? 1 : 0
      return memo
    }, 0)
    this.setState({mark})
  },

  componentDidMount() {
    this.state.task.draw()
  },

  render() {
    const canvasStyle = {
      width: 600,
      height: 600,
      border: 'none',
      margin: '40px auto'
    }
    let {system} = this.state.task.system
    let input = system.input
    return (
      <div>
        <Card initiallyExpanded style={{
          padding: '30px 40px 30px 40px',
          width: 800,
          margin: '80px auto'
        }}>
          <div style={{float: 'right', zIndex: 100, position: 'relative'}}>
            <CardTitle
              title={Number.isInteger(this.state.mark) && <span>Оцінка {this.state.mark}</span>}
              style={{paddingLeft: 0}} />
            <RaisedButton
              label='Змінити умову'
              secondary={true}
              onClick={this.newTest} />
          </div>
          <CardHeader
            title='Тест'
            titleStyle={{fontSize: '30px'}}
            style={{padding: 0, height: 50}} />
          <CardText style={{fontSize: 16}}>z = {input.objective}</CardText>
          {
            input.constraints.map((item, index) =>
              <CardText key={index} style={{paddingBottom: 10, paddingTop: 10, fontSize: 16}}>{index + 1}) {item}</CardText>)
          }
          <div id='jxgbox' className='jxgbox' style={canvasStyle} />
          {
            this.state.task.tests.map(({question , test, correct}, index) => (
              <div key={index}>
                <CardText key={index} style={!Array.isArray(test) ? {marginBottom: -10} : {}}>
                  {index + 1}) {question} {Array.isArray(correct) && '(Координати ввести через пробіл)'}
                </CardText>
                {
                  Array.isArray(test) && (
                    <RadioButtonGroup
                      name={question}
                      key={question}
                      valueSelected={this.state.answers[index]}
                      onChange={(event, value) => this.handleCheck(index, value)}
                      style={{paddingLeft: 16}}>
                      {test.map((item, i) =>
                        <RadioButton
                          style={{
                            block: {maxWidth: 250},
                            radioButton: {marginBottom: 16}
                          }}
                          key={`${index} ${i}`}
                          value={testKey[i]}
                          label={<span>{testKey[i]}) {item.toString()}</span>}/>)
                      }
                    </RadioButtonGroup>
                  )
                }
                {
                  !Array.isArray(test) &&
                  <TextField
                    hintText='Відповідь'
                    inputStyle={{marginLeft: 5, width: 150}}
                    style={{marginLeft: 16}}
                    hintStyle={{marginLeft: 5}}
                    value={this.state.answers[index]}
                    onChange={event => this.handleCheck(index, event.target.value)} />
                }
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
