<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { FALLBACK_IMAGE } from '@/utils/images'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
})

const router = useRouter()
const currentPostImage = ref(props.imageUrl)

function handleImageError() {
  currentPostImage.value = FALLBACK_IMAGE
}

function goToPostDetails() {
  router.push( { name: 'post-details', params: { id: props.id } } )
}
</script>

<template>
  <div @click="goToPostDetails" class="post-card">
    <img 
      :src="currentPostImage"
      class="post-card__image"
      @error="handleImageError"
    >
    <div class="post-card__content">
      <router-link class="post-card__link regular-text" :to="{name: 'post-details', params: {id: id}}">{{ title }}</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  height: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all ease-in 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.post-card:active {
  transform: translateY(0px);
}

.post-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  flex-shrink: 0;
}

.post-card__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-card__link {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

.post-card__link:hover {
  text-decoration: underline;
}
</style>