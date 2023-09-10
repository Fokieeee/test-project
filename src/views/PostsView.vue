<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import { usePostsStore } from '@/stores/postsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import type { User } from '@/models/models'
import FilterInput from '@/components/FilterInput.vue'
import PreLoader from '@/components/PreLoader.vue'

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
    <PreLoader v-if="isLoading" />
    <ul class="posts-container" v-else-if="filteredPosts.length">
      <li class="posts" v-for="post in filteredPosts" :key="post.id">
        <PostItem :post="post" :user="currentUser(post.userId)" />
      </li>
    </ul>

    <p v-else-if="!isError" class="notification">No matches</p>

    <p v-if="isError" class="notification">Error</p>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 1rem;
  .posts-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .posts {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .notification {
    font: var(--font-xl);
    text-align: center;
    margin-top: 50px;
  }
}
</style>
