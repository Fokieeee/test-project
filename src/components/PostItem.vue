<template>
  <article class="post-item">
    <header class="post-title">
      <h2 class="post-title-text">{{ props.post.title }}</h2>
    </header>
    <div class="post-content">
      <p class="post-content-text">{{ props.post.body }}</p>
      <p class="post-content-text author">{{ props.user?.name || 'Unknown User' }}</p>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Post, User } from '@/models/models'

const props = defineProps<{
  post: Post
  user: User | undefined
}>()
</script>

<style lang="scss" scoped>
.post-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--bg-secondary-color);
  max-width: 450px;
  .post-title {
    .post-title-text {
      font: var(--font-l);
    }
  }

  .post-content {
    margin-top: 1rem;
    .post-content-text {
      font: var(--font-m);

      &.author {
        color: var(--secondary-color);
        margin-top: 15px;
      }
    }
  }
}
</style>
