const commentButtons = document.querySelectorAll('.comment-action');
const dontHaveAccount=document.getElementById('user_position').textContent;
const formLogin=document.getElementById('post_action_if_do_not_have_account');
commentButtons.forEach(commentButton => {
    // Add event listener for each button
    commentButton.addEventListener('click', function (e) {
        if(dontHaveAccount===null || dontHaveAccount==='Position'){
            formLogin.style.display='flex';
        }else{
            const post = commentButton.parentNode.querySelector('.action-comment-post');
            post.style.display = 'flex';
            const submitButton=commentButton.parentNode.parentNode.querySelector('.fa-paper-plane');
            const idPost=commentButton.parentNode.parentNode.querySelector('.id-post');
            const form = commentButton.parentNode.querySelector('.form-action-comment');
            submitButton.addEventListener('click',()=>{
                idPost.value=commentButton.dataset.id;
                form.submit();
            })

        }
    });
})
const exitButtons= document.querySelectorAll('.fa-circle-xmark');
exitButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        const parent = button.parentNode.parentNode;
        parent.style.display='none';
    })
});



