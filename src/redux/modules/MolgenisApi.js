import fetch from 'isomorphic-fetch'

const contentHeaders = {
  'Accept'       : 'application/json',
  'Content-Type' : 'application/json'
}

function callApi (server, uri, method, token) {
  const url = server.apiUrl + uri
  const settings = {
    method  : method,
    headers : contentHeaders
  }

  if (token) {
    // for cross-origin requests, use a molgenis token
    settings.headers = { ...contentHeaders, 'x-molgenis-token' : token }
  } else {
    // for same origin requests, use the JSESSIONID cookie
    settings.credentials = 'same-origin'
  }

  return fetch(url, settings)
    .then(response => response.json()
      .then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
}

export function get (server, uri, token) {
  return callApi(server, uri, 'get', token)
}

export function login (server, username, password) {
  return fetch(server.apiUrl + 'v1/login', {
    method  : 'post',
    headers : contentHeaders,
    body    : JSON.stringify({ username : username, password : password })
  }).then(response => response.json())
}

export function logout (server, token) {
  return fetch(server.apiUrl + 'v1/logout', {
    method  : 'get',
    headers : { ...contentHeaders, 'x-molgenis-token' : token }
  })
}

export default { login, logout, get, callApi }
