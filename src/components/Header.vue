<script>
import {links} from "../config.js"
export default{
data(){
    return {
        links:links
    }
}
}
</script>

<template>

    <div class="navbar">
        <div class="container">
            <div class="navbar-content">
                <router-link class="navbar-logo" to="/">Template</router-link >
                    <ul class="navbar-list">
                        <li v-for="(link,index) in links" :key="index" class="navbar-list">
                            <router-link class="navbar-link" :to="link.url">{{link.title}}</router-link>
                        </li>
                    </ul> 
            </div>
        </div>
    </div>

</template>

<style lang="scss">


</style>