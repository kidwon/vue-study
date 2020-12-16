<template>
    <div>
        <h1>this is App</h1>
    </div>
</template>

<script>
import img from './assets/images/1.jpg'
// import './assets/images/search-icon.svg'
// import './assets/images/panda-search.svg'

// import './assets/styles/test.css'

import './assets/styles/global.styl'

export default {
    name:'App',
    // created() {
    //     console.log(img)
    // },
}
</script>

<style lang="stylus" scoped> // scoped means this only effect current file
h1
  color:red
  transform:translate(100px,100px)
</style>