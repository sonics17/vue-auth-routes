<script setup>
import { onMounted, ref } from 'vue';
import MainLayoutWithBlur from '@/components/layouts/MainLayoutWithBlur.vue';
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';
import PostCard from '@/components/PostCard.vue';
import Logo from '@/components/ui/Logo.vue';
import { getPostImageUrl } from '@/utils/images';

const posts = ref([])
const errorMessage = ref(null)
const isLoading = ref(true)

async function fetchPosts() {
  errorMessage.value = null
  isLoading.value = true

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts.value = await response.json()
  } catch {
    errorMessage.value = 'Failed to load posts :c'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <MainLayoutWithBlur>
    <div class="logo-container">
      <Logo />
    </div>
    
    <div v-if="isLoading" class="spinner-container">
      <Spinner class="spinner" />
    </div>

    <div v-else class="posts">
      <PostCard 
        v-for="(post, index) in posts"
        :key="index"
        :id="post.id"
        :title="post.title"
        :image-url="getPostImageUrl(post.id)"
        class="posts__item"
      />
    </div>

    <div v-if="errorMessage" class="error-message-container">
      <span>{{ errorMessage }}</span>
      <Button @click="fetchPosts" class="retry-button">Retry</Button>
    </div>
  </MainLayoutWithBlur>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0 2rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
}

.spinner-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 14rem;
  gap: 2.5rem 1.5rem;
  align-items: start;
}

.error-message-container {
  background-color: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 1rem;
}

.error-message-container span {
  text-align: center;
}

.retry-button {
  max-width: fit-content;
}

@media(max-width: bp.$breakpoint-mobile) {
  .error-message-container {
    padding: 1rem 2rem;
  }

  .posts {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>