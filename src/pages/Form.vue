<script>
import Input from '../components/UI/input.vue'
import items from '../seeders.js'
import Ubutton from '../components/UI/Ubutton.vue'
export default{
components:{
    Input,Ubutton
},    
data(){
    return {
        credit: items[0],
        payment: items[1],
        month: items[2],
        isActiveButton: true,
        isDisabled_Input: false
    }
},
mounted() {
    this.getItems()
  },

watch: {
    credit: {
      handler(updatedList) {
        localStorage.setItem('credit',JSON.stringify(updatedList))
        if(this.credit.valueInput.length > 7){
            this.credit.valueInput = this.credit.valueInput[0]
        }  
      },
      deep: true
    },

    payment: {
      handler(updatedList) {
        localStorage.setItem('payment',JSON.stringify(updatedList))
        if(this.payment.valueInput.length > 7){
            this.payment.valueInput = this.payment.valueInput[0]
        }
      },
      deep: true
    },

    month: {
      handler(updatedList) {
        localStorage.setItem('month',JSON.stringify(updatedList))
        if(this.month.valueInput.length > 2){
            this.month.valueInput = this.month.valueInput[0]
        }
      },
      deep: true
    },

  },


computed: {
    mounthPayment(){
        
        if(this.credit.valueInput >= Number(this.credit.min) && this.month.valueInput >= Number(this.month.min )){
          return Math.floor((Number(this.credit.valueInput) - ((Number(this.payment.valueSlider)/100)*this.credit.valueInput)) * 
                            ((0.035* Math.pow(1 + 0.035, this.month.valueInput)) / (Math.pow(1 + 0.035, this.month.valueInput) - 1)));
                           
        }
        return '657799'
    
    },
        
    totalSum(){
        const paymentEnd = this.mounthPayment
        if(this.credit.valueInput >= Number(this.credit.min) && this.month.valueInput >= Number(this.month.min)){
                return  Math.floor( (Number(this.payment.valueSlider)/100)*Number(this.credit.valueInput) + 
                                                                (Number(this.month.valueInput) * Number(paymentEnd)) )
        }
         return '3618995'
}
},



methods:{
    getItems() {
      const localCredit = localStorage.getItem('credit')
      const localPayment = localStorage.getItem('payment')
      const localMonth = localStorage.getItem('month')
      if (localCredit && localPayment && localMonth) {
        this.credit = JSON.parse(localCredit)
        this.payment = JSON.parse(localPayment)
        this.month = JSON.parse(localMonth)
    }},

    Res_Input(){
        const res =  this.credit.valueInput*this.payment.valueSlider/100 
        return String(res)
    },

    Num_Slider(data){
        if(data===1){
            this.credit.valueInput = this.credit.valueSlider
            this.payment.valueInput = this.Res_Input()
        }

        if(data===2){
            this.payment.valueInput =  this.Res_Input()
            console.log(this.credit.valueInput)
        }

        if(data===3){
            this.month.valueInput = this.month.valueSlider
        }

    },
    clickInp(data){
        if(data===1){
            this.credit.valueInput = ''
            this.credit.valueSlider = this.credit.min
        }
        if(data===2){
            this.payment.valueInput = ''
            this.payment.valueSlider = this.payment.min
        }

        if(data===3){
            this.month.valueInput = ''
            this.month.valueSlider = this.month.min
        }
    },
    blurEvent(data){
        if(this.credit.valueInput === '' || this.credit.valueInput < Number(this.credit.min)){
            this.payment.valueInput =  this.Res_Input()
        }

        else{ 
            console.log(typeof(this.credit.valueInput))
            this.payment.valueInput =  this.Res_Input()}

        if(this.payment.valueInput === ''){
            this.payment.valueInput =  this.Res_Input()
        }
    },

    submit(){
        this.isActiveButton = false
        this.isDisabled_Input = true
        setTimeout(() => {
            this.isActiveButton = true
            this.isDisabled_Input = false
        },3000) 
    }
},
}
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div class="title">
                <h1 class="title-text">Рассчитайте стоимость автомобиля в лизинг</h1>
            </div>
            <div class="form-flex">
                <Input 
                    v-model:valSlider="credit.valueSlider"  
                    v-model:valInput="credit.valueInput" 
                    @blurEven="blurEvent" 
                    @click_input="clickInp"  
                    @Num_Slider="Num_Slider" 
                    :id="credit.id" 
                    :title="credit.title" 
                    :min="credit.min"  
                    :max="credit.max"
                    :maxlengthInput="credit.maxlengthInput"
                    :step="credit.step"
                    :isDisabled="isDisabled_Input"
                ><span class="input_text">₽</span> 
                </Input>
                <Input 
                    v-model:valSlider="payment.valueSlider"  
                    v-model:valInput="payment.valueInput" 
                    @blurEven="blurEvent" 
                    @click_input="clickInp"
                    @Num_Slider="Num_Slider" 
                    :id="payment.id" 
                    :title="payment.title" 
                    :min="payment.min"  
                    :max="payment.max"
                    :step="payment.step"
                    :maxlengthInput="payment.maxlengthInput"
                    :isDisabled="isDisabled_Input"
                ><span style="background-color:#cbcbd4; padding:15px; margin-right:10px; border-radius:15px; font-size:20px;">{{payment.valueSlider}}%</span> 
                </Input>
                <Input 
                    v-model:valSlider="month.valueSlider" 
                    v-model:valInput="month.valueInput"
                    @blurEven="blurEvent" 
                    @click_input="clickInp" 
                    @Num_Slider="Num_Slider" 
                    :id="month.id" 
                    :title="month.title" 
                    :min="month.min"  
                    :max="month.max"
                    :step="month.step"
                    :maxlengthInput="month.maxlengthInput"
                    :isDisabled="isDisabled_Input"
                    
                ><span class="input_text">мес.</span> 
                </Input>
            </div>

            <div class="form-flex-title">
                <div class="Sum_form">
                    <p>Cумма договора лизинга</p>
                    <span class="price">{{totalSum}} ₽</span>
                </div>

                <div class="month_price">                       
                    <p>ежемесячный платеж от</p>
                    <span class="price">{{mounthPayment}} ₽</span>        
                </div>
                <Ubutton @click="submit" :isActiveButton="isActiveButton" />
            </div>
        </div>
    </div>

</template>

<style lang="scss">
</style>