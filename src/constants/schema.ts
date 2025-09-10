export const INPUT_SCHEMA = {
  require: 'Vui lòng nhập thông tin!',
  emailMalformed: 'Email không đúng định dạng!',
  confirmPassword: 'Mật khẩu không trùng khớp!',
  phoneMalformed: 'Số điện thoại không đúng định dạng',
  minLength: 'Mật khẩu phải 8 ký tự trở lên',
  memberPassword: 'Mật khẩu phải 8 ký tự trở lên, ít nhất 1 chữ in Hoa, 1 số, 1 chữ thường',
}

export const REGEX = {
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  MEMBERPASSWORD: /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/,
}
