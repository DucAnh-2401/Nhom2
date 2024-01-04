window.addEventListener('DOMContentLoaded', () => {
    const post_form = document.getElementById('post_form');
    const username = document.getElementById('user_name');
    const post_action_if_have_account = document.getElementById('post_action_if_have_account');
    const post_form_destroy = document.getElementById('post_form_destroy');
    const post_action_if_do_not_have_account = document.getElementById('post_action_if_do_not_have_account');
    const button_destroy_if_dont_want_create_account = document.getElementById('button_destroy_if_dont_want_create_account');
    const username_content = username.innerHTML;
    post_form.addEventListener('click', function () {
        if (username_content == 'Profile' || username_content == "") {
            post_action_if_do_not_have_account.style.display = 'flex';
        } else {
            post_action_if_have_account.style.display = 'flex';
        }
    })
    post_form_destroy.addEventListener('click', function () {

        post_action_if_have_account.style.display = 'none';
    })
    button_destroy_if_dont_want_create_account.addEventListener('click', function () {
        post_action_if_do_not_have_account.style.display = 'none';
    })
    //Ẩn những trường không có giá trị trên bài đăng
    // Lấy danh sách tất cả trường
    const content_container = document.querySelectorAll('.content_container');

    // Lặp qua từng trường thông tin
    content_container.forEach(container => {
        //Lấy giá trị của ô input 
        const content = container.querySelector('span').textContent;
        // Kiểm tra giá trị của ô input
        if (content === '') {
            // Nếu không có giá trị, ẩn ô input
            container.classList.add('hidden');
        } else {
            // Nếu có giá trị, hiển thị ô input
            container.classList.remove('hidden');
        }
    });
});