import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {userActions} from "../../actions/user.actions";

class ShowProfile extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                <h2>User profile</h2>
                <dl>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>

                    <dt>First name</dt>
                    <dd>{user.firstName}</dd>

                    <dt>Last name</dt>
                    <dd>{user.lastName}</dd>

                    <dt>You can invite your friends by the following link:</dt>
                    <dd>{`${window.location.origin}/invite/${this.props.user.referralCode}`}</dd>

                    <div className="btn-group" role="group">
                        <Link className="btn btn-primary" to="/profile/edit">Edit Profile </Link>
                        <button className="btn btn-secondary" onClick={this.onLogout}>Logout</button>
                    </div>
                </dl>
            </div>
        );
    }
}

function mapState(state) {
    const {user} = state.authenticationReducer;
    return {user};
}

const actionCreators = {
    logoutAndRedirect: userActions.logoutAndRedirect
};

export default connect(mapState, actionCreators)(ShowProfile);
