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

function goToSignUp() {
  router.push({ name: 'sign-up' })
}

function goToPosts() {
  router.push({ name: 'posts'})
}

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (data.user) {
    goToPosts()
  } else {
    submitErrorMessage.value = 'Invalid email or password'
  }
}

function validateEmailField() {
  emailError.value = getEmailError(email.value)
}

function validatePasswordField() {
  passwordError.value = getPasswordError(password.value)
}

function handleSubmit() {
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
          <Button variant="primary" @click="handleSubmit">
            Login
          </Button>

          <Button variant="secondary" @click="goToSignUp">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  </AuthCard>
</template>