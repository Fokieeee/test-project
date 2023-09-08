<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import { usePostsStore } from '@/stores/postsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import type { User } from '@/models/models'

const { posts, isLoading, isError, users } = storeToRefs(usePostsStore())
const { fetchPosts, fetchUsers } = usePostsStore()

onMounted(async () => {
  await fetchPosts()
  await fetchUsers()
})

const currentUser = (postId: number): User | undefined => {
  return users.value.find((user) => user.id === postId)
}
</script>

<template>
  <main>
    <p v-if="isLoading">Loading posts...</p>
    <p v-if="isError">Error</p>
    <div class="posts-container" v-for="post in posts" :key="post.id">
      <PostItem :post="post" :user="currentUser(post.id)" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.posts-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
