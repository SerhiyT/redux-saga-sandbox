export const getUserPosts = (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then((res) => res.json());
};
