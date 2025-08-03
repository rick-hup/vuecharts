<script setup lang="ts">
const routes = [
  {
    path: '/area',
    name: 'Area Chart',
    description: 'Area chart demo with various configurations',
  },
  // 可以继续添加更多路由
]
</script>

<template>
  <div class="container">
    <h1>Vue Charts Demo</h1>
    <div class="nav-grid">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="nav-card"
      >
        <h2>{{ route.name }}</h2>
        <p>{{ route.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #2c3e50;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.nav-card {
  padding: 1.5rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav-card h2 {
  margin: 0 0 0.5rem;
  color: #42b883;
}

.nav-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
