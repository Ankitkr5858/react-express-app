import React from 'react';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions'

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);

        const {invitedByReferralCode} = props;
        this.state = {
            user: Object.assign({invitedByReferralCode}, this.props.user)
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({user: {...this.state.user, [name]: value}});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateProfile(this.state.user);
    }

    render() {
        const {user} = this.state;
        const {error} = this.props;

        return (
            <div>
                <h2>Update Profile</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" required={true} name="firstName"
                               value={user.firstName || ''} onChange={this.handleChange}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" required={true} name="lastName"
                               value={user.lastName || ''} onChange={this.handleChange}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="invitedByReferralCode">Referral code</label>
                        <input type="text" className="form-control" name="invitedByReferralCode"
                               value={user.invitedByReferralCode || ''} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const {user} = state.authenticationReducer;
    const {error} = state.errorReducer;
    const {invitedByReferralCode} = state.referralCodeReducer;

    return {user, error, invitedByReferralCode};
}

const actionCreators = {
    updateProfile: userActions.updateProfile
};

export default connect(mapState, actionCreators)(UpdateProfile);
