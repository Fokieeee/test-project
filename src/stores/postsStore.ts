import { defineStore } from 'pinia'
import axios from 'axios'
import type { Post, User } from '@/models/models'

interface State {
  posts: Post[]
  users: User[]
  filteredPosts: Post[],
  isLoading: boolean
  isError: boolean
}

export const usePostsStore = defineStore('posts', {
  state: (): State => ({
    posts: [],
    users: [],
    filteredPosts: [],
    isLoading: false,
    isError: false
  }),

  getters: {},

  actions: {
    async fetchPosts() {
      try {
        this.isLoading = true
        const { data } = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts?_limit=100'
        )
        this.posts = data
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchUsers() {
      try {
        this.isLoading = true
        const { data } = await axios.get<User[]>(
          'http://jsonplaceholder.typicode.com/users?_limit=10'
        )
        this.users = data
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
