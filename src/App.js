import './App.css';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom'
import SignIn from './screens/signIn/SignIn';
import SignUp from './screens/signUp/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact={true} path="/" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
