document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');
    const themeToggle = document.getElementById('themeToggle');

    // Load comments from local storage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Function to save comments to local storage
    function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    // Function to render comments
    function renderComments() {
        commentList.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <h5>${comment.name} <small class="text-muted">${new Date(comment.timestamp).toLocaleString()}</small></h5>
                <p>${comment.text}</p>
                <button class="btn btn-sm btn-outline-primary edit-comment" data-index="${index}">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-comment" data-index="${index}">Delete</button>
            `;
            commentList.appendChild(commentElement);
        });
    }

    // Handle comment submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const commentText = document.getElementById('comment').value;

        if (name && commentText) {
            const newComment = {
                name: name,
                text: commentText,
                timestamp: new Date().getTime()
            };
            comments.push(newComment);
            saveComments();
            renderComments();
            commentForm.reset();
        }
    });

    // Handle comment editing and deleting
    commentList.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-comment')) {
            const index = e.target.getAttribute('data-index');
            const comment = comments[index];
            document.getElementById('name').value = comment.name;
            document.getElementById('comment').value = comment.text;
            comments.splice(index, 1);
        } else if (e.target.classList.contains('delete-comment')) {
            const index = e.target.getAttribute('data-index');
            comments.splice(index, 1);
            saveComments();
            renderComments();
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('bi-moon', 'bi-sun');
        } else {
            icon.classList.replace('bi-sun', 'bi-moon');
        }
    });

    // Initial render
    renderComments();
});