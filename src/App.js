import './App.css';
import {useEffect} from 'react';
import {Switch,Route,BrowserRouter as Router, Redirect} from 'react-router-dom'
import SignIn from './screens/signIn/SignIn';
import SignUp from './screens/signUp/SignUp';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import MainDashboard from './screens/dashboard/Dashboard';

function App({checkUserSession,currentUser}) {
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignIn}/>
          {console.log("CURRENTUSER:",currentUser)}
          <Route exact={true} path="/" render={()=>currentUser?(<MainDashboard/>):(<SignIn/>)}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route 
          exact 
          path="/dashboard"
          render={()=>currentUser?
            (<MainDashboard />):(<Redirect to="/" />,console.log("Second One Is Called"))
          } 
         />

        </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
