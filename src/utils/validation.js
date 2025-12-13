export const getRequiredError = (value) => {
  if (value && value.trim().length > 0) return null
  return 'All fields are required'
}

export const getEmailError = (email) => {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return null
  return 'Incorrect Email'
}

export const getPasswordError = (password) => {
  if (password.trim().length >= 6) return null
  return 'Must be 6+ characters'
}