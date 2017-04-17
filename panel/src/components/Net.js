const server = 'http://localhost:9988/'
const dev_server = 'http://localhost:8888/'

export const post = (path, data) => {
  return fetch(`${server}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(r => r.json())
}

export const get = (path) => {
  return fetch(`${server}${path}`).then(r => r.json())
}
