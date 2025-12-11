<template>
  <button class="button" :class="`button--${variant}`">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.button {
  display: block;
  padding: 1rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--ui-color-bright-green);
  background-color: var(--ui-color-bright-green);
  box-sizing: border-box;
  cursor: pointer;
  transition: all ease-in .2s;
}

.button--primary {
  background-color: var(--ui-color-bright-green);
  color: #fff;
}

.button--secondary {
  background-color: #fff;
  color: var(--ui-color-bright-green);
}

.button:hover {
  opacity: 0.9;
}

.button--secondary:hover {
  background-color: #cae7dd;
}

.button:active {
  transform: translateY(1px);
}

.button:focus {
  outline: 2px solid var(--ui-color-bright-green);
}

.button--blocked {
  pointer-events: none;
  opacity: 0.8;
  outline: none;
  background-color: rgb(210, 210, 210);
  border: 1px solid darkgrey;
}
</style>