// function to connect to new post handlebar 
const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create blog');
        }
    }
};

const bloglist = document.querySelector('.blog-list');
const newpost = document.querySelector(".newpostbtn");
const postcard = document.querySelector(".makepostcard");
const cancelbtn = document.querySelector(".cancelbtn");

document
    .querySelector('.makepost-form')
    .addEventListener('submit', newFormHandler);


// function to show or hide new posts when not creating one. when creating a post, it will reveal posts you have made
function unhide() {
    postcard.style.display = "flex";
    console.log("create posts unhidden")
    if (bloglist) {
        bloglist.style.display = "none";
    };
};

function hide() {
    postcard.style.display = "none";
    if (bloglist) {
        bloglist.style.display = "flex";
    };
}

newpost.addEventListener('click', unhide);
cancelbtn.addEventListener('click', hide)