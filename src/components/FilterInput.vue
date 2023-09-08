<template>
  <div class="input-container">
    <input class="filter-input" type="text" v-model="inputValue" placeholder="Enter author" />
  </div>
</template>

<script setup lang="ts">
import type { Post, User } from '@/models/models'
import { usePostsStore } from '@/stores/postsStore'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
const { filteredPosts, posts, users } = storeToRefs(usePostsStore())

const inputValue = ref('')

const filterPostsByAuthor = (inputValue: string): Post[] => {
  const filteredArray: Post[] = []
  for (const post of posts.value) {
    const userName = users.value.find((user: User) => user.id === post.userId)?.name || ''
    if (
      userName
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(inputValue.replace(/\s+/g, '').toLowerCase())
    ) {
      filteredArray.push(post)
    }
  }
  return filteredArray
}

watchEffect(() => {
  filteredPosts.value = filterPostsByAuthor(inputValue.value)
})
</script>

<style lang="scss" scoped>
.input-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .filter-input {
    all: unset;
    font: var(--font-l);
    border-bottom: 1px solid #ccc;
  }
}
</style>
