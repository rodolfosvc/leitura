const api = 'http://localhost:3001'

/*let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)*/

const headers = {
  'Accept': 'application/json',
  'Authorization': 'leituraProject'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

 export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.post)

/*export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())*/