document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('user_register');
  const userposition1 = document.getElementById('userposition1');
  const userposition2 = document.getElementById('userposition2');
  const usernameInput = document.getElementById('username');
  const username_signInput=document.getElementById('username_sign');
  const emailInput = document.getElementById('useremail');
  const passwordInput = document.getElementById('userpassword');
  const confirmPasswordInput = document.getElementById('confirm_password');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định
    const user_position=userposition1.value;
    const user_position1=userposition2.value;
    const username = usernameInput.value;
    const username_sign=username_signInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const emailPattern = /^[^\s@]+@gmail\.com$/i;
    if(userposition1.checked===false && userposition2.checked===false){
        alert("Vui lòng chọn bạn là ứng viên hay nhà tuyển dụng");
        return;
    }
    if (specialCharacters.test(username)) {
      alert('Vui lòng nhập tên thật của bạn !');
      return;
    }
    if(/\d/.test(username)){
        alert("Tên không được chứa sô !");
        return;
    }
    function removeAccents(input) {
      // Mã xử lý loại bỏ dấu
      // ...
    
      return input;
    }
    
    function isNameWithoutAccentsAndNoSpaces(input) {
      const nameWithoutAccents = removeAccents(input);
      const regex = /^[a-zA-Z]+$/; // Chỉ chấp nhận các ký tự a-z, A-Z
    
      return regex.test(nameWithoutAccents);
    }
    // Kiểm tra xem tên người dùng đã nhập có chứa dấu và khoảng trắng không
    if(!isNameWithoutAccentsAndNoSpaces(username_sign)) {
      alert("Vui lòng nhập tên viết liền không dấu !");
      return;
    }
    if (!emailPattern.test(email)) {
      alert('Chỉ chấp nhận email có định dạng là @gmail.com!');
      return;
    }

    if (password === '') {
      alert('Vui lòng nhập mật khẩu!');
      return;
    }
    if(password.length<8){
        alert("Mật khẩu phải có ít nhất 8 ký tự !");
        return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu và mật khẩu xác nhận không khớp!');
      return;
    }
    // Gửi biểu mẫu đăng ký nếu thông tin hợp lệ
    // Thêm code xử lý gửi biểu mẫu tại đây
    form.submit();
    
  });
 
});