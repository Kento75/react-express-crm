import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../components/SignUpForm.jsx';
import { signup } from '../store/actions/user.actions';

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, password) => dispatch(signup(username, password))
  };
};

class SignUp extends React.Component {
  
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
    this.props.signup(values.email, values.password)
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
      <SignUpForm
        onSubmit={this.submit}
        errors={this.state.errors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
