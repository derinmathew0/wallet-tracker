import React from 'react';
import WalletItemsList from './WalletItemsList';
import { connect } from 'react-redux';
import { fetchWalletItems } from './actions/WalletItemActions';
import PropTypes from 'prop-types'; 

class WalletItemsPage extends React.Component {
  
  componentDidMount() {
    this.props.fetchWalletItems();
  }

  render() {
    return (
      <div>
        <h1>Wallet List</h1>

         <WalletItemsList walletItems={this.props.walletItems}  /> 
      </div>
    );
  }
}

WalletItemsPage.propTypes = {
  walletItems: PropTypes.array.isRequired,
  fetchWalletItems: PropTypes.func.isRequired
  
}

function mapStateToProps(state) {
  return {
    walletItems: state.walletItems
  }
}

export default connect(mapStateToProps, { fetchWalletItems })(WalletItemsPage);
