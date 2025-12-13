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
  isLoading,
  handleSubmit,
  validateEmailField,
  validatePasswordField,
  clearEmailError,
  clearPasswordError,
} = useAuthForm('signin')

function goToSignUp() {
  router.push({ name: 'sign-up' })
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