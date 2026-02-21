<template>
    <div>
        <h1>Home Page</h1>
    </div>
    <p>{{ user }}</p>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/register">Register</NuxtLink>
</template>

<script setup>
const { user } = useUserSession();
</script>
<style scoped>      
</style>