<template>
    <div
        class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            <a href="javascript:void(0)" @click="handleUserLogout" class="text-sm text-gray-700 underline">Logout</a>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: "Content",
    methods: {
        handleUserLogout() {
            axios.get(this.$env.BACKEND_API + 'api/v1/auth/user/logout')
                .then(res => {
                    if (res) {
                        this.$localStorage.clear();
                        this.$router.push({name: 'login'});
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
}
</script>

<style scoped>

</style>
