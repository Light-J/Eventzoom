import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../helpers/formatCurrency';
import styles from './CurrencyInput.module.css';

class CurrencyInput extends Component {
	static propTypes = {
		amount: PropTypes.number.isRequired,
		setAmount: PropTypes.func.isRequired,
		className: PropTypes.string,
	};

	state = {
		showFocus: false,
	};


	realInput = React.createRef();


	onFocusMain = () => {
		this.realInput.current.focus();
		this.setState({ showFocus: true });
	}

	onBlur = () => {
		if (this.state.showFocus) {
			this.setState({ showFocus: false });
		}
	}

	onChange = (e) => {
		if (e.target.value.match(/^[0-9]*$/)) {
			this.props.setAmount(Number(e.target.value));
		}
	}

	render = () => <span>
		<input
			type="text"
			className={`${this.props.className} ${this.state.showFocus ? styles.fakeFocus : null}`}
			onFocus={this.onFocusMain} value={formatCurrency(this.props.amount)}
			onChange={() => {}}
		/>
		<div style={{ width: 0, overflow: 'hidden', height: 0 }}>
			<input type="text" ref={this.realInput} onBlur={this.onBlur} value={this.props.amount} onChange={this.onChange}/>
		</div>
	</span>
}


export default CurrencyInput;
