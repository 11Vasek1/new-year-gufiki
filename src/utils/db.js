const KEY = 'new-year-data'

export function getAnyData(){
  let arr = getData();

  if (!arr || arr.length === 0) {
    arr = Array(25).fill(false);
  }

  return arr;
}

function getData() {
  return JSON.parse(window.localStorage.getItem(KEY) || '[]')
}

export function setData(data) {
  window.localStorage.setItem(KEY, JSON.stringify(data))
}