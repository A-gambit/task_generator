import React from 'react'
import Header from '../components/header'


export default React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
})