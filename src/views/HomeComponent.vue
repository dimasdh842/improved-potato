<template>
    <div class="container">
        <div class="wrapper-branding">
            <h1 class="heading-branding">Imto</h1>
            <p class="text-branding">Url Shortner</p>
        </div>
                    <div class="wrapper-option">
                        <input type="radio" name="random" id="random" v-bind:value="true" v-model="random" >
                        <label for="random">random </label>
                        <input type="radio" name="custom" id="custom" v-bind:value="false" v-model="random">
                        <label for="custom">custom</label>
                    </div>
                    <div class="wrapper-shortener">
                        <input type="text" class="shortener" placeholder="Link" v-model="redirect" required>
                        <button class="submit-shortener" @click="createLink">Shorten Link</button>
                    </div>



                    <template v-if="!random">
                       <div class="wrapper-shortener">
                        <input type="text" class="shortener" required placeholder="BUKBER-2K22" v-model="uniqLink">
                    </div>
                    </template>
                   

                    <div class="wrapper-result">
                        <div class="result">
                                <a v-bind:href="result" class="link-result">{{result}}</a>
                                <button class="copy" @click="copy">Copy</button>
                                <input type="type" name="link-result" class="link-hidden" v-bind:value="result" readonly/>
                        </div>
                    </div>

                </div> 
</template>

<script>

let vm = {
    name:'HomeComponent',
    mounted() {
        console.log('mounted')
    },
    updated(){
        console.log(this.random);
    },
    data(){
                return {
                    errors: [],
                    status:false,
                    random:true,
                    redirect:'',
                    uniqLink:'',
                    result:"http://127.0.0.1:3000/r/hello-from-world-212"
                }
            },
            beforeMount() {
                this.timer = setInterval(this.setDateTime, 1000);
            },
            beforeUnmount() {
                clearInterval(this.timer);
            },
            methods:{
                copy(){
                    let link = document.querySelector(".link-hidden")

                    /* Select the text field */
                    link.select();
                    link.setSelectionRange(0, 99999); /* For mobile devices */

                    /* Copy the text inside the text field */
                    navigator.clipboard.writeText(link.value);

                    /* Alert the copied text */

                    document.querySelector(".copy").innerText = "copied"
                },
                createLink() {
                    const data = {
                        "redirect": this.redirect,
                        "imto": this.uniqLink,
                        "random": this.random
                    }
                    fetch("http://127.0.0.1:3000/all/",{
                        method: 'POST',
                        mode:'cors',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                       return response.json()
                    })
                    .then(data => {
                        console.log(data.imto);
                        if (data.message != null) {
                            this.error.push = data.message
                            this.status = true
                        }
                        this.result= "http://127.0.0.1:3000/r/"+data.imto
                    })
                },
                // getRandomColor(max) {
                //     let rand = Math.floor(Math.random() * max);
                //     if (rand == 0) {
                //         rand = 1
                //     }

                //     const className = "box box-" + rand
                //     return className
                // }
            },
            
}
    export default vm
</script>

