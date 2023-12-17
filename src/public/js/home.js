const option_management = document.getElementById('option_management');
const user_position = document.getElementById('user_position');
const user_position_content = user_position.innerHTML;
const user_login = document.getElementById('user_login');
const user_register_new = document.getElementById('user_register_new');
const user_logout = document.getElementById('user_logout');
const user_profile = document.getElementById('user_profile');
if (user_position_content == 'Admin') {
    option_management.style = 'display:block';
} else {
    option_management.style = 'display:none';
}
if (user_position_content == 'Position') {
    user_logout.style.display = 'none';
    user_profile.style.display = 'none';
} else {
    user_login.style.display = 'none';
    user_register_new.style.display = 'none';
}