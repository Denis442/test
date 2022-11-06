<script>

export default {
    props:  {
        isActiveButton: {
            type: Boolean,
            required: true
        } 
    },
}

</script>

<template>
    <button :class="`${isActiveButton ? 'btn_form s_btn' : 'btn_disabled'}`" >
        <p v-if="isActiveButton">Оставить заявку</p>
        <div :class="{loader: !isActiveButton}"></div>
    </button>

</template>


<style lang="scss">
</style>