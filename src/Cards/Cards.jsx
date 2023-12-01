import './cards.scss';
import Card from '../Card/Card.jsx';
import json from '../recepcies.json';
import { useState } from 'react';
import Canvas from '../Canvas/Canvas';
import { getAnyData, setData } from '../utils/db';

function Cards() {
  const [statuses, setStatuses] = useState( getAnyData() );

  const createCallback = (index) => {
    return (value) => {
      const newArr = [...statuses];
      newArr[index] = value;
      setStatuses(newArr);
      setData(newArr)
    };
  };

  const cardList = json.recepcies.map((info, index) => (
    <Card
      title={info.title}
      key={index}
      callback={createCallback(index)}
      isActive={statuses[index]}
    />
  ));
  return (
    <div className='cards'>
      {cardList}
      <Canvas statuses = {statuses} />
    </div>
  );
}

export default Cards;
