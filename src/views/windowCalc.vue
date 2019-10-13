<template>
  <div>
    <Navbar class="app-navbar" />
    <h1>3d model</h1>
    <model-obj src="./test.obj"></model-obj>
    <model-obj src="./objekt.obj"></model-obj>
    <Footer />
  </div>
</template>

<script>
import { ModelObj } from "vue-3d-model";
export default {
  name: "windowCalc",
  components: {
    ModelObj
  },
  data() {
    return {
    };
  }
};
</script>