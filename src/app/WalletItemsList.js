import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function WalletItemsList({ walletItems }) {
  console.log('walletItems', walletItems)
  const [allWalletItems, setWalletItems] = useState([]);

  useEffect(() => {
    createArray();
  }, [walletItems]);

  const createArray = () => {
    let sortedWalletItems= [...walletItems].sort((a, b) => (b._id > a._id) ? 1 : -1)
    setWalletItems(sortedWalletItems);
  };

  const emptyMessage = (
    <p>There are no items yet in your collection.</p>
  );

  const walletItemsList = (
    <table className="ui celled table">
      <thead>
        <tr><th>Description</th>
          <th>Date</th>
          <th>Income/Expense</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr></thead>
      <tbody>

        {
        
        allWalletItems.map(walletItem =>
          <tr key={walletItem._id}>
            <td data-label="Description">{walletItem.description}</td>
            <td data-label="Date">{walletItem.date}</td>
            <td data-label="Income/Expense">{walletItem.incomeOrExpense}</td>
            <td data-label="Amount">{walletItem.amount}</td>
            <td data-label="Amount"><Link to={`/walletItem/${walletItem._id}`} className="ui basic button green">Edit</Link></td>
            
          </tr>
        )}

      </tbody>
    </table>
    
  );


  return (
    <div>

      {walletItems.length === 0 ? emptyMessage : walletItemsList}
    </div>
  );
}

WalletItemsList.propTypes = {
  walletItems: PropTypes.array.isRequired,

}
