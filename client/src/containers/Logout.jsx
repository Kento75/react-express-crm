import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user.actions';

class Logout extends React.Component {
  
  componentDidMount() {
    this.props.logout();
  }
  
  render() {
    return <div />;
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
