document.addEventListener('DOMContentLoaded', function () {
  const profile = document.getElementById('user_profile');
  const logout = document.getElementById('user_logout');
  const form = document.getElementById('user_register');
  const emailInput = document.getElementById('useremail');
  const passwordInput = document.getElementById('userpassword');
  profile.style.display='none';
  logout.style.display='none';
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định
    const email = emailInput.value;
    const password = passwordInput.value;
    const emailPattern = /^[^\s@]+@gmail\.com$/i;
    if (!emailPattern.test(email)) {
      alert('Chỉ chấp nhận email có định dạng là @gmail.com!');
      return;
    }

    if (password === '') {
      alert('Vui lòng nhập mật khẩu!');
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự !");
      return;
    }
    // Gửi biểu mẫu đăng ký nếu thông tin hợp lệ
    // Thêm code xử lý gửi biểu mẫu tại đây
    form.submit();

  });

});