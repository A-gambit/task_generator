import React from 'react'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import Menu from 'material-ui/lib/svg-icons/navigation/menu'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'


export default React.createClass({
  getInitialState() {
    return {open: false}
  },

  handleToggle() {
    this.setState({open: !this.state.open})
  },

  handleClose() {
    this.setState({open: false})
  },

  navigate(path = '') {
    document.location = document.location.pathname + `#/${path}`
    this.handleClose()
  },

  nav() {
    return (
      <div>
        <IconButton
          iconStyle={{fill: '#fff', color: '#fff'}}
          onTouchTap={this.handleToggle}>
          <Menu />
        </IconButton>
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={() => this.navigate()}>Генератор тестів</MenuItem>
          <MenuItem onTouchTap={() => this.navigate('test_1')}>Тест 1</MenuItem>
          <MenuItem onTouchTap={() => this.navigate('test_2')}>Тест 2</MenuItem>
        </LeftNav>
      </div>
    )
  },


  render() {
    return (
      <AppBar
        title='Task Generator'
        iconElementLeft={this.nav()}
      />
    )
  }
})