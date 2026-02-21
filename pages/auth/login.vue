<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label as FieldLabel } from "@/components/ui/label"
import authsocialbutton from "@/components/ui/auth/socialbutton.vue"
type Payload = {
    email: string
    password: string
}
const form = ref<Payload>({
    email: "",
    password: "",
})


const onSubmit = async () => {
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: form.value,
        })
        navigateTo("/")
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-sm">
    <form @submit.prevent="onSubmit" action="">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your information below to login
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        
        <div class="grid gap-2">
          <FieldLabel for="email">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            v-model="form.email"
          />
        </div>
        <div class="grid gap-2">
          <FieldLabel for="password">
          Password
          </FieldLabel>
          
        <Input id="password" type="password" required v-model="form.password" />
        </div>
        <div class="grid gap-2">
            <authsocialbutton label="Github" icon="radix-icons:github-logo"></authsocialbutton>
        </div>
        </CardContent>
        <CardFooter class="flex-col space-y-2">
          <Button w-full type="submit">
            Sign In
          </Button>
          <p>
            Don't have an account?
            <NuxtLink
              to="/auth/register"
              class="border-b border-gray-500 text-muted-foreground hover:text-primary">Register here</NuxtLink>
          </p>
          </CardFooter>     
    </Card>
    </form>
    </div>
  </div>
</template>
