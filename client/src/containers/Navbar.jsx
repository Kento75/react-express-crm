import NavItems from '../components/NavItems.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps)(NavItems));
