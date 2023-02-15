// connects handlebar post comment button with route 
async function commentFormHandler(event) {
    event.preventDefault();

    const commentBody = document.querySelector('#comment').value.trim();
    const blogId = document.querySelector('input[name="blog-id"]').value;

    if (commentBody) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                blogId,
                commentBody
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            console.log("Unable to post")
            alert("You cannot view this");
        }
    }
}

document.querySelector('.makecomment-form').addEventListener('submit', commentFormHandler);
