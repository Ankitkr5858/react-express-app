import React from 'react';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions'

class LoginOTP extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            otp: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const {otp} = this.state;
        if (otp) {
            this.props.loginWithOTP(otp);
        }
    }

    render() {
        const {otp} = this.state;
        const {error} = this.props;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>OTP</h2>
                <p>We have sent you an email with One Time Password. Please, enter it below in order to login.</p>
                {error && <div className="alert alert-danger">{error}</div>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="otp">One Time Password</label>
                        <input type="text" className="form-control" required={true} name="otp" value={otp}
                               onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const {error} = state.errorReducer;
    return {error};
}

const actionCreators = {
    loginWithOTP: userActions.loginWithOTP,
    logout: userActions.logout
};

export default connect(mapState, actionCreators)(LoginOTP);
