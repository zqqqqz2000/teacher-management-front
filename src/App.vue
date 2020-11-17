<template>
    <router-view />
</template>

<script>
export default {
    name: "App",
    beforeCreate: function () {
        document
            .querySelector("body")
            .setAttribute("style", "margin: 0; background-color: #FFF");
    },
};
</script>

<style>
</style>
