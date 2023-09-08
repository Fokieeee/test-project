<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import { usePostsStore } from '@/stores/postsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import type { User } from '@/models/models'
import FilterInput from '@/components/FilterInput.vue'

const { isLoading, isError, users, filteredPosts } = storeToRefs(usePostsStore())
const { fetchPosts, fetchUsers } = usePostsStore()

onMounted(async () => {
  await fetchPosts()
  await fetchUsers()
})

const currentUser = (postId: number): User | undefined => {
  return users.value.find((user: User) => user.id === postId)
}
</script>

<template>
  <main>
    <FilterInput />
    <ul>
      <li class="posts-container" v-for="post in filteredPosts" :key="post.id">
        <PostItem :post="post" :user="currentUser(post.userId)" />
      </li>
    </ul>
    <p v-if="isLoading">Loading posts...</p>
    <p v-if="isError">Error</p>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 1rem;
  .posts-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
