import React from 'react';
import classnames from 'classnames';

class WalletItemForm extends React.Component {
  state = {
    _id: this.props.walletItem ? this.props.walletItem._id : null,
    description: this.props.walletItem ? this.props.walletItem.description : '',
    date: this.props.walletItem ? this.props.walletItem.date : '',
    incomeOrExpense: this.props.walletItem ? this.props.walletItem.incomeOrExpense : '',
    
    amount: this.props.walletItem ? this.props.walletItem.amount : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.walletItem._id,
      description: nextProps.walletItem.description,
      date: nextProps.walletItem.date,
      incomeOrExpense: nextProps.walletItem.incomeOrExpense,
      amount: nextProps.walletItem.amount,
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    }
     else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    // validation
    let errors = {};
    
    if (this.state.description === '') errors.description = "This field is required";
    if (this.state.date === '') errors.date = "This field is required";
    if (this.state.incomeOrExpense === '') errors.incomeOrExpense = "This field is required";
    if (this.state.amount === '') errors.amount = "This field is required";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, description, date,incomeOrExpense,amount } = this.state;
      this.setState({ loading: true });
      this.props.saveWalletItem({ _id, description, date,incomeOrExpense,amount })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new item</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.description})}>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            id="description"
          />
          <span>{this.state.errors.description}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.date})}>
          <label htmlFor="date">Date</label>
          <input
            name="date" type="date"
            value={this.state.date}
            onChange={this.handleChange}
            id="date"
          />
          <span>{this.state.errors.date}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.incomeOrExpense})}>
          <label htmlFor="incomeOrExpense">Income/Expense</label>
          <select  name="incomeOrExpense" value={this.state.incomeOrExpense} id="incomeOrExpense" onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          
          <span>{this.state.errors.incomeOrExpense}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.amount})}>
          <label htmlFor="amount">Amount</label>
          <input
            name="amount" type="number" min="1" step="any"
            value={this.state.amount}
            onChange={this.handleChange}
            id="amount"
          />
          <span>{this.state.errors.amount}</span>
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}


export default WalletItemForm;
