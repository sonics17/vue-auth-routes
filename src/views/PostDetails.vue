<script setup>
import MainLayoutWithBlur from '@/components/layouts/MainLayoutWithBlur.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPostImageUrl, FALLBACK_IMAGE } from '@/utils/images'
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';

const route = useRoute()
const postId = route.params.id

const postData = ref({})
const userData = ref({})

const currentPostImage = ref(getPostImageUrl(postId))

const errorMessage = ref(null)
const isLoading = ref(true)

async function fetchPostData(postId) {
  isLoading.value = true
  errorMessage.value = null

  try {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    postData.value = await postResponse.json()

    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.value.userId}`)
    userData.value = await userResponse.json()

    currentPostImage.value = getPostImageUrl(postId)
  } catch {
    errorMessage.value = 'Failed to load the post :c'
  } finally {
    isLoading.value = false
  }
}

function handleImageError() {
  currentPostImage.value = FALLBACK_IMAGE
}

onMounted(async () => {
  fetchPostData(postId)
})
</script>

<template>
  <MainLayoutWithBlur>
    <div class="post-wrapper">
      <Spinner v-if="isLoading" class="spinner" />
      <div v-else class="post-container">
        <div v-if="errorMessage" class="error-message-container">
          <span>{{ errorMessage }}</span>
          <Button @click="fetchPostData" class="retry-button">Retry</Button>
        </div>

        <div v-else class="post">
          <img v-if="currentPostImage"
            :src="currentPostImage"
            class="post__image"
            @error="handleImageError"
          >
          <div class="post__content">
            <p class="post__author">by {{ userData.name }}</p>
            <h1 class="post__title title">{{ postData.title }}</h1>
            <p class="post__description regular-text">{{ postData.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayoutWithBlur>
</template>

<style lang="scss" scoped>
.post-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 3rem;
  height: 3rem;
}

.post {
  max-width: 900px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}

.post__image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.post__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post__description {
  line-height: var(--line-height-150);
}

.post__author {
  color: var(--text-color-secondary);
  font-style: italic;
  margin: 0;
  margin-top: auto;
}

.error-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
}

.error-message-container span {
  text-align: center;
}

@media(max-width: bp.$breakpoint-mobile) {
  .post {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .post__image {
    width: 200px;
    height: 200px;
  }

  .post__content {
    gap: 1rem;
  }

  .error-message-container {
    padding: 1.5rem 2rem;
  }
}
</style>