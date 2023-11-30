// import React from 'react';
import './card.scss';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function Card({ title, callback, isActive }) {

  return (
			<div
				className={`card ${isActive ? 'card_active' : ''}`}
				// onClick={open}
				onClick={(event) => {
					event.preventDefault();
					callback(!isActive);
				}}
			>
				<div className='card__content'>
					<h3 className='card__title sm-title'>{title}</h3>
				</div>
			</div>
		);
}

export default Card;
