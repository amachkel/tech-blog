const editButtonHandler = async (event) => {
  event.preventDefault();
  console.log('edit btn function called');
  const title = document.querySelector('#edit-title').value.trim();
  const content = document.querySelector('#edit-content').value.trim();
  if (title && content) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to update post');
    }
  }
};
document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editButtonHandler);
