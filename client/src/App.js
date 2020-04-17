import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import LoginEmail from "./components/login/LoginEmail";
import LoginOTP from "./components/login/LoginOTP";
import ShowProfile from "./components/profile/ShowProfile";
import UpdateProfile from "./components/profile/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import {history} from './history';
import {errorActions} from "./actions/error.actions";
import {connect} from "react-redux";
import "./App.css"
import Invitation from "./components/invitation/Invitation";

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear errors on location change
            this.props.deleteError();
        });
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container text-center">
                    <div className="jumbotron-card text-center">
                        <Router history={history}>
                            <Switch>
                                <Route path="/login" component={LoginEmail}/>
                                <Route path="/otp" component={LoginOTP}/>
                                <Route path="/profile/edit" component={UpdateProfile}/>
                                <ProtectedRoute path="/profile" component={ShowProfile}/>
                                <Route path='/invite/:referralCode' component={Invitation} />
                                <Redirect from="*" to="/login"/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}


const actionCreators = {
    deleteError: errorActions.deleteError
};

export default connect(mapState, actionCreators)(App);
