import React from 'react';
// import AccountCircle from '@material-ui-icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import { withStyles } from 'material-ui/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (handleChange, value, id, userId) => {
    console.log(handleChange)
    typeof handleChange === "function" && handleChange(this.props.data.id, value, id, userId)
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { handlers, data,btnDisabled } = this.props;
    const listItems = this.props.items.map(link => (
      <MenuItem onClick={() => this.handleClose(handlers.handleChange, link.value, data.serviceId, link.userId)}>{link.display}</MenuItem>
    ));

    return (
      <div>
        <Button

          id={this.props.data.id}
          aria-controls={this.props.data.id}
          className={this.props.data.classes}
          aria-haspopup="true"
          onClick={this.handleMenu}>
          {this.props.data.value}
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
	  style={{"pointerEvents":btnDisabled?true:""}}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}>
          {listItems}
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
