import React, { Component } from 'react';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import './style.scss';

const continentOptions = [
	'Asia',
	'Africa',
	'North America',
	'South America',
	'Antarctica, Europe',
	'Australia',
];

const initialState = {
	name: '',
	price: '',
	continent: '',
	description: '',
};

class ToursForm extends Component {
	state = [...initialState];

	handleChangeValueInState = ({ target: { name, value } }) => {
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const newTour = {
			...this.state,
			id: Math.round(Math.random() * 1000000),
		};

		this.props.onAddFunc(newTour);
		this.setState(initialState);
		this.props.onClose();
	};

	render() {
		const { visible, onClose } = this.props;
		const { name, price, continent, description } = this.state;

		return (
			<Rodal visible={visible} onClose={onClose} height={600}>
				<div>
					<h4>Tours form</h4>

					<form onSubmit={this.handleSubmit}>
						<input
							type='radion'
							name='name'
							className='default-input'
							placeholder='tour name...'
							value={name}
							onChange={this.handleChangeValueInState}
						/>
						<input
							type='radion'
							name='name'
							className='default-input'
							placeholder='tour price...'
							value={price}
							onChange={this.handleChangeValueInState}
						/>

						<select
							className='default-input'
							name='continent'
							value={continent}
							onChange={this.handleChangeValueInState}>
							<option value='' disabled></option>
							{continentOptions.map((el) => (
								<option value={el}>{el}</option>
							))}
						</select>

						<textarea
							column={10}
							rows={3}
							type='text'
							name='description'
							className='default-input'
							placeholder='tour description...'
							value={description}
							onChange={this.handleChangeValueInState}
						/>

						<button type='submit'>Add</button>
					</form>
				</div>
			</Rodal>
		);
	}
}

export default ToursForm;
