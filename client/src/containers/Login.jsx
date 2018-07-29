import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { login } from '../store/actions/user.actions';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

class Login extends React.Component {
  
  state = {
    errors: {},
  };
  
  componentDidMount() {
    const { user } = this.props;
    if (user.loggingIn || user.loggedIn) {
      this.props.history.push('/protected');
    }
  }
  
  submit = values => {
    this.props.login(values.email, values.password)
    .then((result) => {
      if (result.status !== 200) {
        const errors = result.data.errors ? result.data.errors : {};
        errors.summary = result.message;
        this.setState({errors});
      }
    });
  }
  
  render() {
    return (
      <LoginForm
        onSubmit={this.submit}
        errors={this.state.errors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
