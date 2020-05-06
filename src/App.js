import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import WalletItemsPage from './app/WalletItemsPage';
import WalletItemFormPage from './app/WalletItemFormPage';
import './App.css';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">
        
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/walletItems" label="WalletItems" />
          <ActiveLink activeOnlyWhenExact to="/walletItems/new" label="Add New WalletItem" />
        </div>

        <Route exact path="/walletItems" component={WalletItemsPage} />
        <Route path="/walletItems/new" component={WalletItemFormPage} />
        <Route path="/walletItem/:_id" component={WalletItemFormPage} />
      </div>
    );
  }
}

export default App;
