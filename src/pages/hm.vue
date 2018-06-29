<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 0px 0px 0px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="100%"
                img-height="100%"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide :caption="username()"
                        text="你好，很高兴为你服务"
                        img-src="https://picsum.photos/1024/480/?image=52"
      >
        
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58">
        <h1>欢迎到来</h1>
      </b-carousel-slide>


    </b-carousel>


  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    username:function(){
      let user=window.u||JSON.parse(sessionStorage.getItem('u'))
      if(!user){return ''}
     
      return user._id
    },
  }
}
</script>
<!-- carousel-1.vue -->