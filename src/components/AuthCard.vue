<script setup>
import Logo from './ui/Logo.vue';
</script>

<template>
  <div class="auth">
    <div class="auth-card-wrapper">
      <div class="auth-card__logo">
        <Logo class="logo" />
      </div>
      <div class="auth-card__content">
        <slot></slot>
      </div>
      <div class="auth-card__image">
        <img src="/images/bg.svg" alt="Travelizer Hippie Car">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  background-color: var(--ui-color-deep-green);
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
  box-sizing: border-box;
}

.auth-card-wrapper {
  display: grid;
  grid-template: min-content auto / 3fr 4fr;
  grid-template-areas: "logo image"
                       "content image";
  border-radius: 24px;
  overflow: hidden;
}

.auth-card__logo {
  grid-area: logo;
  background-color: #fff;
  padding: 3rem 2.5rem 0 2.5rem;
  --logo-color: #355B3E;
}

.auth-card__content {
  grid-area: content;
  background-color: #fff;
  padding: 3.5rem 2.5rem;
}

.auth-card__image {
  grid-area: image;
  background-color: #F5DBC4;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2.5rem;
  box-sizing: border-box;
}

.auth-card__image img {
  width: 100%;
  height: 100%;
  max-width: 500px;
  object-fit: contain;
  object-position: center;
}

@media(max-width: bp.$breakpoint-mobile) {
  .auth {
    padding: 0;
    justify-content: stretch;
    width: 100%;
  }

  .auth-card-wrapper {
    width: 100%;
    border-radius: unset;
    overflow: auto;
  }

  .auth-card-wrapper {
    grid-template: auto / 100%;
    grid-template-areas: "logo"
                         "image"
                         "content";
  }

  .auth-card__logo {
    background-color: var(--ui-color-deep-green);
    --logo-color: #fff;
    --logo-text--color: #fff;

    padding: 2rem 0;
    margin: 0 auto;
  }

  .auth-card__image img {
    max-width: 300px;
  }

  .auth-card__image, .auth-card__content {
    padding: 1.5rem;
  }
}
</style>