export const getRequiredError = (value) => {
  if (value && value.trim().length > 0) return null
  return 'All fields are required'
}

export const getEmailError = (email) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return 'Incorrect Email'
}

export const getPasswordError = (password) => {
  if (password.trim().length >= 6) return null
  return 'Must be 6+ characters'
}