import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveWalletItem, fetchWalletItem, updateWalletItem } from './actions/WalletItemActions';
import WalletItemForm from './WalletItemForm';

class WalletItemFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchWalletItem(match.params._id);
    }
  }

  saveWalletItem = ({_id, description, date,incomeOrExpense,amount }) => {
    if (_id) {
      return this.props.updateWalletItem({  _id, description, date,incomeOrExpense,amount }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.saveWalletItem({  description, date,incomeOrExpense,amount }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/walletItems" /> :
          <WalletItemForm
          walletItem={this.props.walletItem}
          saveWalletItem={this.saveWalletItem}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      walletItem: state.walletItems.find(item => item._id === match.params._id)
    }
  }

  return { walletItem: null };
}

export default connect(mapStateToProps, { saveWalletItem, fetchWalletItem, updateWalletItem })(WalletItemFormPage);
