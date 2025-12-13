import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import { getRequiredError, getEmailError, getPasswordError } from '@/utils/validation';

export function useAuthForm(type) {
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const emailError = ref(null)
  const passwordError = ref(null)
  const submitErrorMessage = ref('')
  const isLoading = ref(false)
  const showSuccessSignUpMessage = ref(false)

  function goToPosts() {
    return router.push({ name: 'posts'})
  }

  function validateEmailField() {
    emailError.value = getEmailError(email.value)
  }

  function validatePasswordField() {
    passwordError.value = getPasswordError(password.value)
  }

  async function authWithEmail() {
    isLoading.value = true
    submitErrorMessage.value = null

    try {
      if (type === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        await goToPosts()
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })
        if (error) throw error
        showSuccessSignUpMessage.value = true
      }
    } catch (error) {
      submitErrorMessage.value = type === 'signin' ? 'Invalid email or password' : 'Something went wrong'
    } finally {
      isLoading.value = false
    }
  }

  function handleSubmit() {
    if (isLoading.value) return

    submitErrorMessage.value = null
    emailError.value = null
    passwordError.value = null
    let isValid = true

    if (getRequiredError(email.value) || getRequiredError(password.value)) {
      isValid = false
      submitErrorMessage.value = 'All fields are required'
      return
    }

    validateEmailField()
    validatePasswordField()

    if (emailError.value || passwordError.value) {
      isValid = false
    }

    if (isValid) {
      authWithEmail()
    } else {
      submitErrorMessage.value = 'Please correct the errors above'
    }
  }

  function clearEmailError() {
    emailError.value = null
    submitErrorMessage.value = null
  }

    function clearPasswordError() {
    passwordError.value = null
    submitErrorMessage.value = null
  }

  return {
    email,
    password,
    emailError,
    passwordError,
    submitErrorMessage,
    isLoading,
    showSuccessSignUpMessage,

    authWithEmail,
    handleSubmit,
    validateEmailField,
    validatePasswordField,
    clearEmailError,
    clearPasswordError,
    goToPosts
  }
}
