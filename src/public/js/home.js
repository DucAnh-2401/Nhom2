window.addEventListener('DOMContentLoaded', () => {
    const user_login = document.getElementById('user_login');
    const user_register_new = document.getElementById('user_register_new');
    const user_profile = document.getElementById('user_profile');
    const user_logout = document.getElementById('user_logout');
    const usernameTopRight = document.getElementById('username_top_right').textContent;
    if (usernameTopRight === 'Profile') {
        user_profile.style.display = 'none';
        user_logout.style.display = 'none';
    } else {
        user_login.style.display = 'none';
        user_register_new.style.display = 'none';
    }
});
