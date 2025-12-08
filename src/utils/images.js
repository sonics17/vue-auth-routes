export const getPostImageUrl = (postId) => {
  return `https://picsum.photos/200?image=${postId}`
}

export const FALLBACK_IMAGE = '/images/fallback-post-img.jpg'