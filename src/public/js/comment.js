window.addEventListener('DOMContentLoaded', () => {
    // Show bài viết khi nhấn vào nut bình luận
    const commentButtons = document.querySelectorAll('.comment-action');
    commentButtons.forEach(commentButton => {
        // Add event listener for each button
        commentButton.addEventListener('click', function (e) {
            const post = commentButton.parentNode.querySelector('.action-comment-post');
            post.style.display = 'flex';
        });
    });
    //Thóat khỏi bài viết
    const exitButtons = document.querySelectorAll('.fa-circle-xmark');
    exitButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const parent = button.parentNode.parentNode;
            parent.style.display = 'none';
        })
    });
    commentCountLists = document.querySelectorAll('.comment-count-list');
    commentCountLists.forEach(commentCount => {
        commentCount.addEventListener('click', () => {
            const postComment = commentCount.parentNode.querySelector('.list-post-comment-real-real');
            if (postComment.style.display === 'block') {
                postComment.style.display = 'none';
            } else {
                postComment.style.display = 'block';
            };
        })
    });
    const dontHaveAccount = document.getElementById('user_position').textContent;
    const formLogin = document.getElementById('post_action_if_do_not_have_account');
    let socket = io();
    const listCommentButtons = document.querySelectorAll('.fa-paper-plane');
    listCommentButtons.forEach((commentButton) => {
        commentButton.addEventListener("click", function (e) {
            if (dontHaveAccount === 'Position') {
                formLogin.style.display = 'flex';
            } else {
                const commentArea = commentButton.parentNode.querySelector('.content-comment');
                if (commentArea.value != '') {
                    const postID = commentButton.parentNode.querySelector('.id-post').value;
                    const avatarLink = commentButton.parentNode.querySelector('.avatarSender').value;
                    const sendComment = commentButton.parentNode.querySelector('.content-comment').value;
                    const sender = commentButton.parentNode.querySelector('.sender').value;
                    socket.emit('Send Comment', {
                        postID: postID,
                        avatarLink: avatarLink,
                        sendComment: sendComment,
                        sender: sender
                    });
                    socket.on('Sever send comment', function (data) {
                        const divComment = commentButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.list-post-comment-real-real');
                        console.log(divComment);
                        const divCommentOther = commentButton.parentNode.parentNode.parentNode.querySelector('.list-comment-reals');
                        const pName = document.createElement('p');
                        pName.textContent = data.sender;
                        const pContent = document.createElement('p');
                        pContent.textContent = data.sendComment;
                        const imgAvatar = document.createElement('img');
                        imgAvatar.src = '../' + data.avatarLink;
                        const divCommentChild = document.createElement('div');
                        divCommentChild.appendChild(pName);
                        divCommentChild.appendChild(pContent);
                        divCommentChild.classList.add('text-area');
                        const divCommentFather = document.createElement('div');
                        divCommentFather.appendChild(imgAvatar);
                        divCommentFather.appendChild(divCommentChild);
                        divCommentFather.classList.add('list-comment');
                        divComment.appendChild(divCommentFather);
                        divCommentOther.appendChild(divCommentFather);
                        commentArea.value = '';
                    });
                }
            }
        });
    });

});
