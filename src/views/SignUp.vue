<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import AuthCard from '@/components/AuthCard.vue';
import { useAuthForm } from '@/composables/useAuthForm';

const router = useRouter()

const {
  email,
  password,
  emailError,
  passwordError,
  submitErrorMessage,
  showSuccessSignUpMessage,
  authWithEmail,
  handleSubmit,
  validateEmailField,
  validatePasswordField,
  clearEmailError,
  clearPasswordError,
} = useAuthForm('signup')

function goToSignIn() {
  router.push({ name: 'sign-in' })
}
</script>

<template>
  <AuthCard>
    <div class="auth-header">
      <h1 class="auth-header__title title">Artificial Intelligence giving you travel recommendations</h1>
      <p v-if="showSuccessSignUpMessage" class="info-message">
        Your account has been successfully created! 
        <RouterLink :to="{ name: 'sign-in' }" class="login-link">Login</RouterLink>.
      </p>
      <p v-else class="auth-header__text regular-text">Create your account</p>
    </div>

    <form v-if="!showSuccessSignUpMessage" novalidate @submit.prevent class="auth-form">
      <fieldset class="auth-form__container">
        <Input 
          id="email"
          type="email"
          label="Email"
          :error="emailError"
          v-model="email"
          @blur="validateEmailField"
          @focus="clearEmailError" 
        />

        <Input 
          id="password" 
          type="password" 
          label="Password" 
          :error="passwordError" 
          v-model="password"
          @blur="validatePasswordField" 
          @focus="clearPasswordError" 
        />

        <div class="auth-footer">
          <div class="error-message-container">
            <div v-if="submitErrorMessage" class="error-message">
              {{ submitErrorMessage }}
            </div>
          </div>

          <div class="auth-actions">
            <Button variant="primary" @click="handleSubmit">Sign Up</Button>
            <Button variant="secondary" @click="goToSignIn">Login</Button>
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

  .login-link {
    color: var(--text-color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
  }

  .login-link:hover {
    text-decoration: underline;
  }

  @media(max-width: 415px) {
    .auth-actions {
      flex-direction: column;
    }
  }
</style>