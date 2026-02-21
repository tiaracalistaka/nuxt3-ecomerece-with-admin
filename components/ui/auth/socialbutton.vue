<template>
    <Button @click="authenticate" variant="outline" type="button">
                <div class="flex items-center">
                    <Icon :name="icon" class="w-4 h-4 mr-2" />
                </div>
                {{label}}
            </Button>
</template>
<script setup lang="ts">
defineProps<{
    label: string,
    icon: string
}>()

const authenticate = () => {
    window.location.href = "/api/auth/github"
}
</script>