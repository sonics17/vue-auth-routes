<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import AuthCard from '@/components/AuthCard.vue';
import { supabase } from '@/lib/supabaseClient';
import { getRequiredError, getEmailError, getPasswordError } from '@/utils/validation';

const router = useRouter()

const email = ref('')
const password = ref('')

const emailError = ref(null)
const passwordError = ref(null)
const submitErrorMessage = ref('')

const isLoading = ref(false)

function goToSignUp() {
  router.push({ name: 'sign-up' })
}

function goToPosts() {
  return router.push({ name: 'posts'})
}

async function signInWithEmail() {
  isLoading.value = true

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    await goToPosts()
  } catch (error) {
    submitErrorMessage.value = 'Invalid email or password'
  } finally {
    isLoading.value = false
  }
}

function validateEmailField() {
  emailError.value = getEmailError(email.value)
}

function validatePasswordField() {
  passwordError.value = getPasswordError(password.value)
}

function handleSubmit() {
  if (isLoading.value) return

  submitErrorMessage.value = null
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
    signInWithEmail()
  } else {
    submitErrorMessage.value = 'Please correct the errors above'
  }
}
</script>

<template>
  <AuthCard>
    <div class="auth-header">
      <h1 class="auth-header__title title">Artificial Intelligence giving you travel recommendations</h1>
      <p class="auth-header__text regular-text">Please login to your account</p>
    </div>

    <form novalidate @submit.prevent class="auth-form">
      <fieldset :disabled="isLoading" class="auth-form__container">
        <Input 
          id="email" 
          type="email" 
          label="Email" 
          :error="emailError" 
          v-model="email" 
          @blur="validateEmailField" 
          @focus="emailError = null; submitErrorMessage = null" 
        />

        <Input 
          id="password" 
          type="password" 
          label="Password" 
          :error="passwordError" 
          v-model="password"
          @blur="validatePasswordField"
          @focus="passwordError = null; submitErrorMessage = null" 
        />

        <div class="auth-footer">
          <div class="error-message-container">
            <div v-if="submitErrorMessage" class="error-message">
              {{ submitErrorMessage }}
            </div>
          </div>

          <div class="auth-actions">
            <Button :variant="isLoading ? 'blocked' : 'primary'" @click="handleSubmit">
              Login
            </Button>

            <Button :variant="isLoading ? 'blocked' : 'secondary'" @click="goToSignUp">
              Sign Up
            </Button>
          </div>
        </div>

      </fieldset>

    </form>
  </AuthCard>
</template>

<style scoped>
  .auth-header__title {
    margin-bottom: 1rem;
  }

  .auth-header__text {
    color: var(--text-color-secondary);
    margin-bottom: 2rem;
  }

  .auth-form__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .auth-actions {
    display: flex;
    gap: 1.5rem;
  }

  .error-message-container {
    min-height: 1.5rem;
    margin-bottom: .5rem;
  }

  @media(max-width: 415px) {
    .auth-actions {
      flex-direction: column;
    }
  }
</style>