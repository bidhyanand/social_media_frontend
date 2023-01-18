// to validate the email field
export function validateEmail(email) {
  if (
    email === "" ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  ) {
    return false;
  }
  return true;
}

// to validate the password field
export function validatePassword(password) {
  if (
   ! password === "" || password.length <6 || password.length > 15
  ) {
    return false;
  }
  return true;
}
