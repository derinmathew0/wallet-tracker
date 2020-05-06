
import { SET_WALLET_ITEMS,ADD_WALLET_ITEM,WALLET_ITEM_FETCHED,WALLET_ITEM_UPDATED} from './action-types/walletItem-actions'
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setWalletItems(walletItems) {
  return {
    type: SET_WALLET_ITEMS,
    walletItems
  }
}

export function addWalletItem(walletItem) {
  return {
    type: ADD_WALLET_ITEM,
    walletItem
  }
}

export function walletItemFetched(walletItem) {
  return {
    type: WALLET_ITEM_FETCHED,
    walletItem
  }
}

export function walletItemUpdated(walletItem) {
  return {
    type: WALLET_ITEM_UPDATED,
    walletItem
  }
}

export function saveWalletItem(data) {
  return dispatch => {
    return fetch('/api/walletItems', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addWalletItem(data.walletItem)));
  }
}

export function updateWalletItem(data) {
  return dispatch => {
    return fetch(`/api/walletItems/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(walletItemUpdated(data.walletItem)));
  }
}



export function fetchWalletItems() {
  return dispatch => {
    fetch(`/api/walletItems`)
      .then(res => res.json())
      .then(data => dispatch(setWalletItems(data.walletItems)));
  }
}

export function fetchWalletItem(id) {
  return dispatch => {
    fetch(`/api/walletItems/${id}`)
      .then(res => res.json())
      .then(data => dispatch(walletItemFetched(data.walletItem)));
  }
}
