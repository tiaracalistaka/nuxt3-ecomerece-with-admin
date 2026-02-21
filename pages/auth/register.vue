<script setup lang="ts">
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label as FieldLabel } from "@/components/ui/label"
type Payload = {
    name: string
    email: string
    password: string
}
const form = ref<Payload>({
    name: "",
    email: "",
    password: "",
})

const onSubmit = async () => {
    try {
        await $fetch("/api/auth/register", {
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
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your information below to register for an account
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <FieldLabel for="name">
            Name
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            required
            v-model="form.name"
          />
        </div>
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
            <Button variant="outline" type="button">
                <div class="flex items-center">
                    <Icon name="radix-icons:github-logo" class="w-4 h-4 mr-2" />
                </div>
                Github
            </Button>
        </div>
        </CardContent>
        <CardFooter class="flex-col space-y-2">
          <Button w-full type="submit">
            Sign Up
          </Button>
          <p>
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="border-b border-gray-500 text-muted-foreground hover:text-primary">Login here</NuxtLink>
          </p>
          </CardFooter>     
    </Card>
    </form>
    </div>
  </div>
</template>
