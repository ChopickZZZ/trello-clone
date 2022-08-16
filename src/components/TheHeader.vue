<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsersStore } from '../stores/users.js';
import { useRouter } from 'vue-router';
import AppDropDown from './AppDropDown.vue';
const router = useRouter()
const usersStore = useUsersStore()

const isDropDownOpen = ref(false)
const user = computed(() => usersStore.user)

const logout = async (): Promise<void> => {
   await usersStore.signOut()
   isDropDownOpen.value = false
   router.push({ name: 'Login' })
}
</script>

<template>
   <header class="header" v-page-scroll="() => (isDropDownOpen = false)">
      <router-link :to="{ name: 'Home' }" class="header__logo">
         <svg width="50px" height="55px" viewBox="0 0 256 257" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <defs>
               <linearGradient x1="-0.828097821%" y1="7.6518539%" x2="57.6359644%" y2="78.4107719%"
                  id="linearGradient-1">
                  <stop stop-color="#41D1FF" offset="0%"></stop>
                  <stop stop-color="#BD34FE" offset="100%"></stop>
               </linearGradient>
               <linearGradient x1="43.3760053%" y1="2.24179788%" x2="50.3158848%" y2="89.0299051%"
                  id="linearGradient-2">
                  <stop stop-color="#FFEA83" offset="0%"></stop>
                  <stop stop-color="#FFDD35" offset="8.33333%"></stop>
                  <stop stop-color="#FFA800" offset="100%"></stop>
               </linearGradient>
            </defs>
            <g>
               <path
                  d="M255.152904,37.937763 L134.896865,252.97646 C132.413943,257.416178 126.035075,257.442321 123.5149,253.02417 L0.87443175,37.9584812 C-1.87111536,33.1438084 2.24595371,27.3119153 7.70191187,28.2871109 L128.086639,49.8052023 C128.854587,49.9424525 129.640835,49.9411454 130.408783,49.8012155 L248.276014,28.3179595 C253.713738,27.3268821 257.850198,33.1136134 255.152904,37.937763 Z"
                  fill="url(#linearGradient-1)"></path>
               <path
                  d="M185.432401,0.0631038902 L96.4393502,17.500942 C94.9766549,17.7875335 93.8936852,19.0270992 93.8054529,20.5146956 L88.3311293,112.971419 C88.2023755,115.149123 90.2023075,116.839261 92.3277254,116.349082 L117.10466,110.630976 C119.422882,110.096354 121.517582,112.138114 121.041128,114.469407 L113.67994,150.515893 C113.184532,152.941955 115.462232,155.016394 117.831433,154.29681 L133.134834,149.647295 C135.507302,148.927059 137.786963,151.00738 137.285019,153.435402 L125.586724,210.056351 C124.854723,213.598061 129.565674,215.529368 131.530313,212.49287 L132.842687,210.464834 L205.359174,65.745575 C206.573511,63.3224548 204.479465,60.5594769 201.818118,61.0730542 L176.31441,65.9952397 C173.91776,66.4573155 171.878614,64.2253653 172.555061,61.8805431 L189.2009,4.17570253 C189.878001,1.82692623 187.831665,-0.406957894 185.432401,0.0631038902 Z"
                  fill="url(#linearGradient-2)"></path>
            </g>
         </svg>
      </router-link>
      <nav class="navbar">
         <a class="navbar__user user" v-if="user" @click.prevent="isDropDownOpen = !isDropDownOpen"
            v-click-outside="() => (isDropDownOpen = false)">
            <div class="user__info">
               <div class="user__avatar-container">
                  <img class="user__avatar" :src="user.avatar!" :alt="`${user} Avatar`">
               </div>
               <span class="user__name">{{ user.username }}</span>
            </div>
            <button class="user__dropdown">
               <fa-icon icon="caret-down" />
            </button>
            <Transition name="fade-down">
               <AppDropDown @handler="logout" style="width: 20rem; top: 6.2rem;" v-if="isDropDownOpen">LogOut
               </AppDropDown>
            </Transition>
         </a>
      </nav>
   </header>
</template>

<style scoped>
.header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 8rem;
   background-color: #fff;
   padding: 0 3rem;
   border-bottom: 1px solid rgb(158, 158, 158);
}

.navbar {
   width: 100%;
   display: flex;
   flex-direction: row-reverse;
   justify-content: space-between;
}

.navbar__user {
   margin-left: auto;
   display: flex;
   align-items: center;
   cursor: pointer;
}

.navbar__user:hover .user__name,
.navbar__user:hover .user__dropdown {
   color: salmon
}

.navbar__user:hover .user__dropdown {
   transform: rotate(-180deg);
}

.user__info {
   display: flex;
   align-items: center;
}

.user__avatar-container {
   width: 4.5rem;
   height: 4.5rem;
   border-radius: 50%;
   overflow: hidden;
   margin-right: 1rem;
}

.user__avatar {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.user__name {
   font-weight: 700;
   font-size: 1.7rem;
   transition: color .4s ease;
}

.user__dropdown {
   font-size: 1.8rem;
   margin-left: 1rem;
   transition: .4s ease;
}
</style>