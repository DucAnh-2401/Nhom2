window.addEventListener('DOMContentLoaded', () => {
    const update_profile_button = document.getElementById("update_profile_button");
    const update_profile_detail = document.getElementById("update_profile_detail");
    const exit_update_profile = document.getElementById("exit_update_profile");
    update_profile_button.addEventListener('click', function () {
        update_profile_detail.style.display = "flex";
    })
    exit_update_profile.addEventListener("click", function () {
        update_profile_detail.style.display = "none";
    })
    const update_profile_username = document.getElementById('update_profile_username');
    const change_username = document.getElementById('change_username');
    change_username.addEventListener('click', function () {
        update_profile_username.readOnly = false;
        update_profile_username.focus();
    })
    update_profile_username.addEventListener("input", function () {
        this.size = this.value.length;
    });
    //Chọn ảnh 
    const update_profile_user_avatar = document.getElementById("update_profile_user_avatar");
    const update_profile_user_avatar_input = document.getElementById("update_profile_user_avatar_input");
    update_profile_user_avatar_input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                update_profile_user_avatar.src = e.target.result;
            };

            reader.readAsDataURL(this.files[0]);
        }
    });
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
    //Thay đổi thông tin tài khoản
    const update_account = document.getElementById('update_account_button');
    const update_account_form = document.getElementById('update-account-form');
    const cacel_change_password = document.getElementById('cacel-change-password');
    const form_change_password = document.getElementById('form-change-password');
    const inputPasswordNew = document.getElementById('inputPasswordNew').value;
    const inputPasswordNewVerify = document.getElementById('inputPasswordNewVerify').value;
    //const submit_form=document.getElementById('submit-form-change-password');
    //Hiện form thay đổi mật khẩu
    update_account.addEventListener('click', function () {
        update_account_form.style.display = "flex";
    })
    //Ẩn form thay đổi mật khẩu 
    cacel_change_password.addEventListener('click', function () {
        update_account_form.style.display = 'none';
    })
    //Kiểm tra mật khẩu mới và mật khẩu xác nhận đã trùng khớp chưa 
    form_change_password.addEventListener('submit', function (event) {
        event.preventDefault();
        if (inputPasswordNew !== inputPasswordNewVerify) {
            alert('Mật khẩu xác nhận không khớp với mật khẩu mới!');
            return;
        }
        form_change_password.submit();
    })
    //ẩn hiện chat box
    const userName=document.getElementById('username_top_right').textContent;
    const chatBox = document.getElementById('chat-box');
    const exitChatButton = document.getElementById('exit-chat-button');
    const requestChatButton = document.getElementById('chat-with-you');
    requestChatButton.addEventListener('click', () => {
        if(userName!=='Profile'){
            chatBox.style.display = 'block';
        }    
    });
    exitChatButton.addEventListener('click', () => {
        chatBox.style.display = 'none';
    })
    const messageIcon = document.querySelector('.messenger-icon');
    const nameTop = document.getElementById('username_top_right').textContent;
    const nameLeft = document.getElementById('user-name-real').textContent;
    if (nameTop === nameLeft) {
        messageIcon.style.display = 'block';
    }
    messageIcon.addEventListener('click', () => {
        chatBox.style.display = 'block';
    });
});