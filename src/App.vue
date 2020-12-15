<template>
    <div id="app">
        <notifications transition-name="notification-list" transition-mode="out-in"></notifications>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.notifications.vue-notifyjs {
    .notification-list-move {
        transition: transform 0.3s, opacity 0.4s;
    }

    .notification-list-item {
        display: inline-block;
        margin-right: 10px;

    }

    .notification-list-enter-active, .notification-list-leave-active {
        transition: opacity 0.4s;
    }

    .notification-list-enter, .notification-list-leave-to /* .list-leave-active for <2.1.8 */
    {
        opacity: 0;
    }
}
</style>
