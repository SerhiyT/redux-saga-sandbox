export const getUserAlbums = (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then((res) => res.json())
}