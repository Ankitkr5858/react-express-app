import React from 'react';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions'
import LoginEmail from '../login/LoginEmail';

class Invitation extends React.Component {
    constructor(props) {
        super(props);
        const { referralCode } = this.props.match.params;
        this.props.persistReferralCode(referralCode);
    }

    render() {
        return <LoginEmail />
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    persistReferralCode: userActions.persistReferralCode
};

export default connect(mapState, actionCreators)(Invitation);
