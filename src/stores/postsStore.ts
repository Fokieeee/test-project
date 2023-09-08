import { defineStore } from 'pinia'
import axios from 'axios'
import type { Post, User } from '@/models/models'

interface State {
  posts: Post[]
  users: User[]
  isLoading: Boolean
  isError: Boolean
}

export const usePostsStore = defineStore('posts', {
  state: (): State => ({
    posts: [],
    users:[],
    isLoading: false,
    isError: false
  }),

  getters: {
    getPosts(): Post[] {
      return this.posts
    }
  },

  actions: {
    async fetchPosts() {
      try {
        this.isLoading = true
        const {data}= await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
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
        const {data} = await axios.get<User[]>(
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
