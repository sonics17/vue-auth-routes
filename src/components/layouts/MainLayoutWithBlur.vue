<template>
<div class="main-wrapper">
  <div class="blurred-background-layer"></div>
  <div class="content-layer">
    <slot></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.main-wrapper {
  background-color: #355B3E; 
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.blurred-background-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 800px;
  background-image: url('/images/bg.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #F5DBC4;
  filter: blur(30px);
  z-index: 1;
}

.content-layer {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  padding: 2rem 4rem; 
  box-sizing: border-box;
}

@media(max-width: bp.$breakpoint-mobile) {
  .blurred-background-layer {
    background-size: cover;
  }

  .content-layer {
    padding: 1.5rem;
  }
}
</style>