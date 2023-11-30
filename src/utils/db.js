const KEY = 'new-year-data'

export function getData() {
  return JSON.parse(window.localStorage.getItem(KEY) || '[]')
}

export function setData(data) {
  window.localStorage.setItem(KEY, JSON.stringify(data))
}