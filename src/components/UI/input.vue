<script>
export default{
props:{
    id:{
        type:Number,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    valInput: {
        type:String,
        required: true
    },
    valSlider: {
        type:String,
        required: true
    },
    min: {
        type:String,
        required: true
    },
    max: {
        type:String,
        required: true
    },
    step: {
        type:String,
        required: true
    },
    maxlengthInput: {
        type:String,
        required: true
    },
    isActive_Input: {
        type:Boolean,
     
    },
    isDisabled: {
        type:Boolean,
        required: true
    }
},    
data(){
    return {
        proc: this.Process(),
        isActive: false,
      
    }
    
},
watch: {
    valSlider(){
        if(this.valSlider === '0') this.proc = 0
        else this.proc = this.Process(); 
    },
},
methods: {
    Process(){
        return  ((Number(this.valSlider) - Number(this.min)) / (Number(this.max) - Number(this.min))) * 90
    },

    ChangeSlider(title){   
        this.$emit('update:valSlider',title)
        this.$emit('Num_Slider',this.id)
        this.isActive = true
    },


    ChangeInput(title){
        this.$emit('update:valInput',title)
    },

    obNull(){
        this.$emit("click_input",this.id);
        this.isActive = true
    },

    blurEven(){
        this.$emit("blurEven",this.id);
    }
}
}
</script>

<template>
    <div class="input_block">
        <p class="input_title">{{title}}</p>
        <div :class="isActive ? 'wrapper_active': 'input_wrapper'">
            <input 
                :disabled="isDisabled" 
                :class="isActive ? 'input_active': 'input'" 
                @:blur="blurEven"  
                @click="obNull" 
                :value="valInput" 
                @input="ChangeInput($event.target.value)"  
                type="number"
            >
            <slot></slot>
            <input  
                :disabled="isDisabled" 
                class="slider" 
                :value="valSlider" 
                @input="ChangeSlider($event.target.value)" 
                type="range" 
                :step="step" 
                :min="min" 
                :max="max"
            >
            <div :style="{width: proc + '%'}" class="progresss_bar"></div>
        </div>
    </div>
</template>

<style lang="scss">
</style>