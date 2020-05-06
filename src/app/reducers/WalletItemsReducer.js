import { SET_WALLET_ITEMS, ADD_WALLET_ITEM, WALLET_ITEM_FETCHED, WALLET_ITEM_UPDATED } from '../actions/action-types/walletItem-actions';

export default function WalletItemsReducer(state = [], action = {}) {
  switch(action.type) {
    case ADD_WALLET_ITEM:
      return [
        ...state,
        action.walletItem
      ];

    

    case WALLET_ITEM_UPDATED:
      return state.map(item => {
        if (item._id === action.walletItem._id) return action.walletItem;
        return item;
      });

    case WALLET_ITEM_FETCHED:
      const index = state.findIndex(item => item._id === action.walletItem._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.walletItem._id) return action.walletItem;
          return item;
        });
      } else {
        return [
          ...state,
          action.walletItem
        ];
      }

    case SET_WALLET_ITEMS:
      return action.walletItems;
    default: return state;
  }
}
