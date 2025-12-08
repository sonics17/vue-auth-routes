<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  id: String,
  type: String,
  label: String,
  error: String
})

const model = defineModel()
const emit = defineEmits(['blur', 'focus',])

const isPasswordVisible = ref(false)

const inputFieldType = computed(() => {
  if (props.type !== 'password') return props.type
  return isPasswordVisible.value ? 'text' : 'password'
})

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="input-field">
    <label :for="id" class="input-field__label label">{{ label }}</label>
    <div class="input-container">
      <input
      :id="id"
        :type="inputFieldType"
        :autocomplete="type === 'password' ? 'current-password' : 'email'"
        class="input-field__input input"
        v-model="model"
        @blur="emit('blur')"
        @focus="emit('focus')"
      />
      <i 
        v-if="type === 'password'"
        class="eye-icon"
        :class="{'eye-icon--open': !isPasswordVisible, 'eye-icon--closed': isPasswordVisible}"
        @click="togglePasswordVisibility"
      ></i>
    </div>
    <div class="error-container">
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input {
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--ui-color-dull-green);
  border-radius: 8px;
  transition: outline ease-in .1s;
}

.input:focus {
  outline: 2px solid var(--ui-color-dull-green);
}

.input[autocomplete="current-password"] {
  padding-right: calc(1rem + 24px);
}

.input:-webkit-autofill {
  -webkit-text-fill-color: var(--text-color-primary);
}

.input-container:has(.input[autocomplete="current-password"]) {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  cursor: pointer;
  transition: filter ease-in-out .2s;
}

.eye-icon--open {
  content: url('/images/eye-open.svg');
}

.eye-icon--closed {
  content: url('/images/eye-closed.svg');
}

.eye-icon:hover {
  filter: brightness(80%);
}

.error-container {
  min-height: 1.5rem;
}
</style>