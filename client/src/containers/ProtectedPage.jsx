/* global fetch:false */
import React from 'react';
import Protected from '../components/Protected.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isLoggedInOrLoggingIn: state.user.loggedIn || state.user.loggingIn,
    };
};

class ProtectedPage extends React.Component {
    
    state = {
        secretData: {}
    };

    componentDidMount() {
        if (!this.props.isLoggedInOrLoggingIn) {
            return this.props.history.push("/login");
        }
        if (this.props.user.loggedIn) {
            this.getSecretData(this.props.user.token);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (!this.props.user.loggedIn && nextProps.user.loggedIn) {
            this.getSecretData(nextProps.user.token);
        }
    }
    
    getSecretData = (token) => {
        fetch("/api/protected", {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json',
            },
            method: 'GET',
        })
        .then(res => res.json())
        .then((result) => {
            if (result.status === 200) {
                this.setState({
                    secretData: result.data
                });
            }}
        );
    }

    render() {
        return (<Protected secretData={this.state.secretData} />);
    }
}

export default connect(mapStateToProps)(ProtectedPage);
