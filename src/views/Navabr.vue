<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const cartItemCount = ref(3); 
const isSidebarOpen = ref(false); 

const data = ref([]);
const loading = ref(true); 
const len = data.value;
console.log(data);
// sidebar handle
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}


onMounted(async () => {
    try {
        const response = await fetch('http://localhost:5000/cart');
        
        if (response.ok) {
            data.value = await response.json(); 
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false; 
    }
});




</script>

<template>
  <nav class="px-4 sticky w-full py-3 bg-gray-800 text-gray-200">
    <div class="flex justify-between items-center">
      <RouterLink to='/' class="flex items-center pl-8">
        <i class="text-2xl fas fa-campground"></i>
        <h1 class="font-serif tracking-wide font-bold text-xl pl-4">Brand</h1>
      </RouterLink>

      <div class="md:hidden">
      
      </div>

      <div class="flex">
        <ul class="flex">
          <li class="text-lg pr-8">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="text-lg pr-8">
            <p  class="nav-link cursor-pointer">Contact</p>
          </li>
        </ul>
      </div>

    

      <!-- Cart Button with Item Count -->
      <button
        @click="toggleSidebar"
        class="relative flex items-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8m-10 0h10"
          />
        </svg>
        <span
          v-if="cartItemCount > 0"
          class="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
        {{ data.length }}
        </span>
      </button>
    </div>
  </nav>
  <!-- Sidebar -->

  <div
    v-if="isSidebarOpen"
    class="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-500 ease-out"
    :class="{ 'translate-x-0': isSidebarOpen, 'translate-x-full': !isSidebarOpen }"
  >
    <!-- Header with Close Button -->
    <div class="p-[18px] flex justify-between items-center border-b border-gray-700">
      <h2 class="text-xl font-bold">Cart</h2>
      <button @click="toggleSidebar" class="text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Cart Items Section -->
    <div class="p-4 flex-1">
      <p>Your cart items will appear here.</p>
    </div>
    
    <div v-for="cart in data" >
      <div class="flex items-center justify-between my-2 mx-2 gap-3">
                <div class="flex gap-2">
                  <img class="h-12 w-12 rounded-lg" :src="cart.course.image" alt='' />
                <div>
                  <h3 class="text-base font-medium">{{ cart.course.subject }}</h3>
                  <p class="text-gray-500">${{ cart.course.price }}</p>
                </div>
                </div>
                <button  class="flex items-center justify-center p-2  text-white rounded-full transition duration-200">

    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7L5 7M10 11v6m4-6v6m1-9V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M4 7h16M6 7h12l-1 13a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z" />
    </svg>
  </button>
      </div>
    </div>
    
    <!-- Checkout Button at the bottom -->
    <div class="absolute bottom-0 left-0 w-full p-4 bg-gray-800">
      <RouterLink to="/checkout">

        <button
          class="w-full bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Checkout
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  transition: all 0.3s;
  text-underline-offset: 8px;
}
.nav-link:hover,
.nav-link:focus {
  text-decoration: underline;
  color: #FFD700;
}

.social-icon {
  font-size: 1.5rem;
  padding-right: 2rem;
  transition: color 0.3s;
}
.social-icon:hover,
.social-icon:focus {
  color: #FFD700;
}

/* Sidebar Animation */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.5s ease-out;
}

.sidebar-enter, 
.sidebar-leave-to {
  transform: translateX(100%);
}

.fixed {
  position: fixed;
}

.w-64 {
  width: 16rem;
}

.h-full {
  height: 100vh;
}

/* Button styles */
button:focus {
  outline: none;
}






.text-gray-700 {
  color: #4a5568;
}

.text-gray-800 {
  color: #2d3748;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transition-transform {
  transition: transform 0.5s ease-out;
}

.translate-x-full {
  transform: translateX(100%);
}

.translate-x-0 {
  transform: translateX(0);
}

.focus\:outline-none:focus {
  outline: none;
}


</style>
