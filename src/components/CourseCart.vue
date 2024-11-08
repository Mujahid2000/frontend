<script setup>
import { ref, onMounted, watch } from 'vue';


const data = ref([]);
const originalData = ref([]);
const filteredData = ref([]);
const loading = ref(true);


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/search');
    if (response.ok) {
      data.value = await response.json();
      originalData.value = [...data.value];
      filteredData.value = [...data.value];
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});

const handleAddToCart = async (course) => {
  await fetch("http://localhost:5000/cart", {
    method: "POST",
    body: JSON.stringify({course}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
};


const handleCheckboxChange = (filterKey, isChecked) => {
  if (isChecked) {
    switch (filterKey) {
      case 'subject':
        filteredData.value.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      case 'location':
        filteredData.value.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'price':
        filteredData.value.sort((a, b) => a.price - b.price);
        break;
      case 'availability':
        filteredData.value = data.value.filter(course => course.space > 0);
        break;
      case 'ascending':
        sortDataAscending();
        break;
      case 'descending':
        sortDataDescending();
        break;
    }
  } else {
    filteredData.value = [...originalData.value];
  }
};


const sortDataAscending = () => {
  filteredData.value.sort((a, b) => {
    if (filters.value.subject) {
      return a.subject.localeCompare(b.subject);
    } else if (filters.value.location) {
      return a.location.localeCompare(b.location);
    } else if (filters.value.price) {
      return a.price - b.price;
    } else {
      return 0;
    }
  });
};


const sortDataDescending = () => {
  filteredData.value.sort((a, b) => {
    if (filters.value.subject) {
      return b.subject.localeCompare(a.subject);
    } else if (filters.value.location) {
      return b.location.localeCompare(a.location);
    } else if (filters.value.price) {
      return b.price - a.price;
    } else {
      return 0;
    }
  });
};

</script>

<template>
  <div class="bg-gray-100">
    <main class="flex flex-col md:flex-row container mx-auto max-w-7xl gap-6 py-8 space-y-8 md:space-y-0">
      
      <div class="space-y-4 p-4 w-full md:w-1/4 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800">Filters</h2>
        <h3 class="text-xl mb-4 font-medium text-gray-600">Sort by</h3>
        <div class="flex flex-col">
          <div id="filters-container" class="space-y-3">
            
            <div v-for="(label, key) in { subject: 'Subject', location: 'Location', price: 'Price', availability: 'Availability' }" :key="key" class="flex items-center">
              <input 
                @change="handleCheckboxChange(key, $event.target.checked)" 
                :value="label"
                type="checkbox" 
                class="check mr-2" 
                :id="key" />
              <label :for="key" class="text-lg text-gray-700">{{ label }}</label>
            </div>
           
            <div class="flex items-center mt-3">
              <input 
                @change="handleCheckboxChange('ascending', $event.target.checked)" 
                value="Ascending" 
                type="checkbox" 
                class="check mr-2" 
                id="ascending" />
              <label for="ascending" class="text-lg text-gray-700">Ascending</label>
            </div>
            <div class="flex items-center mt-3">
              <input 
                @change="handleCheckboxChange('descending', $event.target.checked)" 
                value="Descending" 
                type="checkbox" 
                class="check mr-2" 
                id="descending" />
              <label for="descending" class="text-lg text-gray-700">Descending</label>
            </div>
          </div>
        </div>
      </div>


      <div id="products-wrapper" class="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-6 place-content-center">
      
        <div v-if="loading" class="text-center text-gray-500">Loading courses...</div>

      
        <div v-else v-for="course in filteredData" :key="course.id" class="max-w-lg rounded-lg overflow-hidden shadow-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300">
          <img class="w-full h-48 object-cover rounded-md mb-4" :src="course.image" :alt="course.title">
          <div class="px-4 py-2">
            <div class="font-bold text-xl text-gray-800 mb-2">{{ course.subject }}</div>
            <p class="text-gray-600 text-sm mb-2">Location: <span class="font-semibold">{{ course.location }}</span></p>
            <p class="text-gray-600 text-sm mb-2">Price: <span class="font-semibold">${{ course.price }}</span></p>
            <p class="text-gray-600 text-sm mb-4">Spaces Left: <span class="font-semibold">{{ course.space }}</span></p>
          </div>
          <div class="px-4 pb-2">

            <button v-if="course.space > 0" @click="() => handleAddToCart(course)" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Add to Cart
            </button>
            <button v-else disabled class="w-full bg-gray-600  text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.check {
  accent-color: #3b82f6;
  transform: scale(1.2);
  transition: transform 0.2s ease;
}

.check:checked {
  transform: scale(1.3);
}
</style>
