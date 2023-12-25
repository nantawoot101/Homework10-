const usersList = document.querySelector('.user-list');
const postInfo = document.querySelector('.post-info');

function makeElement(tag, attributes, content) {
  let output = document.createElement(tag);

  if (attributes) {
      for (let [attr_n, attr_v] of Object.entries(attributes)) {
          output.setAttribute(attr_n, attr_v);
      }
  }

  output.textContent = content;
  return output;
}

function fetchUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json());
      
}


function fetchPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json());
}

function Posts(posts) {
  postInfo.innerHTML = '';
  posts.forEach(post => {
      const postItem  = makeElement('div', { class: 'post' }, `
          ${post.title}
          ${post.body}
      `);
      postInfo.appendChild(postItem );
  });
}

function handleUserClick(event) {
  const userId = event.target.getAttribute('data-user-id');
  if (userId) {
      fetchPosts(userId)
          .then(Posts)
          .catch(error => {
              console.error('Error:', error);
          });
  }
}

fetchUsers()
  .then(data => {
      for (let user of data) {
          const li = makeElement('li', { 'data-user-id': user.id }, `${user.name} / ${user.email}`);
          usersList.append(li);
      }
  })
  .then(() => {
      document.querySelector('.user-list').addEventListener('click', handleUserClick);
  });