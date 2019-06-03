import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import rootStore from './Stores/RootStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NewEmployee from './Pages/NewEmployee';
import NewRole from './Pages/NewRole';
import Header from './Components/Header';
import RoleList from './Pages/RoleList'
import EmployeeList from './Pages/EmployeeList'
import Roles from './Pages/Roles';
import Employees from './Pages/Employees';
import Footer from './Components/Footer';
import NoMatch from './Pages/NoMatch';

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <Provider rootStore={rootStore}>
          <div className="black">
            <Header />
            <div className="w-100 w-two-thirds-l black center bl-l br-l bn pb5-l pb4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/new-employee" component={NewEmployee} />
                <Route path="/roles" component={Roles} />
                <Route path="/employees" component={Employees} />
                <Route path="/new-role" component={NewRole} />
                <Route path="/role-list" component={RoleList} />
                <Route path="/employee-list" component={EmployeeList} />
                <Route component={NoMatch} />
              </Switch>
              {/* <Route path="/edit-role/:id" component={EditRole} /> */}
            </div>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;