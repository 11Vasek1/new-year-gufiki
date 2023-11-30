import './cards.scss';
import Card from '../Card/Card.jsx';
import json from '../recepcies.json';
import { useLayoutEffect, useEffect, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import { getData, setData } from '../utils/db';

function Cards() {

  const startStatuses = Array(25).fill(false);
  const [statuses, setStatuses] = useState(startStatuses);
  const [lines, setLines] = useState({
    hArr: [],
    vArr: [],
    dArr: [],
  })

  const createCallback = (index) => {
    return (value) => {
      const newArr = [...statuses];
      newArr[index] = value;
      setStatuses(newArr);
      setData(newArr)
    };
  };

  useLayoutEffect(() => {
    const arr = getData();
    if (arr.length !== 0) {
      setStatuses(arr)
    }
  }, [])

  useLayoutEffect(()=>{
    const hArr = [];
    const vArr = [];
    const dArr = [];

    for (let i = 0; i < 25; i += 5) {
      const sum = statuses[i] + statuses[i + 1] + statuses[i + 2] + statuses[i + 3] + statuses[i + 4];
      if (sum === 5) { hArr.push(1) } else { hArr.push(0) }
    }

    for (let i = 0; i < 5; i++) {
      const sum = statuses[i] + statuses[i + 5] + statuses[i + 10] + statuses[i + 15] + statuses[i + 20];
      if (sum === 5) { vArr.push(1) } else { vArr.push(0) }
    }

    {
      const sum = statuses[0] + statuses[6] + statuses[12] + statuses[18] + statuses[24];
      if (sum === 5) { dArr.push(1) } else { dArr.push(0) }
    }

    {
      const sum = statuses[4] + statuses[8] + statuses[12] + statuses[16] + statuses[20];
      if (sum === 5) { dArr.push(1) } else { dArr.push(0) }
    }

    setLines({
      hArr,
      vArr,
      dArr,
    })
  }, [statuses])

  // console.log(hArr, vArr);

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
      <Canvas h={lines.hArr} v={lines.vArr} d={lines.dArr} />
    </div>
  );
}

export default Cards;
