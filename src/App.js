import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import rootStore from './Stores/RootStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
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
            <div className="w-100 w-two-thirds-l black center f5-l f6-m f7 bl-l br-l bn pb5-l pb4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/roles" component={Roles} />
                <Route path="/employees" component={Employees} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;