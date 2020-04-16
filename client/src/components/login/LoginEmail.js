import React from 'react';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions'

class LoginEmail extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            email: ''
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

        const {email} = this.state;
        if (email) {
            this.props.login(email);
        }
    }

    render() {
        const {email} = this.state;
        const {error} = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" required={true} name="email" value={email}
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
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapState, actionCreators)(LoginEmail);
