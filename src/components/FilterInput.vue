<template>
  <div class="input-container">
    <input class="filter-input" type="text" v-model="authorName" placeholder="Enter author" />
  </div>
</template>

<script setup lang="ts">
import type { Post, User } from '@/models/models'
import { usePostsStore } from '@/stores/postsStore'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
const { filteredPosts, posts, users } = storeToRefs(usePostsStore())

const authorName = ref('')

const filterPostsByAuthor = (inputValue: string): Post[] => {
  const filteredArray: Post[] = []
  for (const post of posts.value) {
    const userName = users.value.find((user: User) => user.id === post.userId)?.name || ''
    if (userName.toLowerCase().replace(' ', '').includes(inputValue.toLowerCase())) {
      filteredArray.push(post)
    }
  }
  return filteredArray
}

watchEffect(() => {
  filteredPosts.value = filterPostsByAuthor(authorName.value)
})
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .filter-input {
    all: unset;
    font: var(--font-xl);
    border-bottom: 1px solid #ccc;
  }
}
</style>
