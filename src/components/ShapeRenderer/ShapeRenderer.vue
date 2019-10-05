<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Rectangle } from "@/components/ShapeRenderer/shapes";
export default {
  name: "ShapeRenderer",
  props: {
    shape: Object
  },
  watch: {
    shape: {
      deep: 1,
      handler(shape) {
        this.renderShape(shape);
      }
    }
  },
  methods: {
    renderShape(shape) {
      if (shape) {
        const { canvas } = this.$refs;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        shape.renderToCanvas(
          canvas,
          ctx,
          "rgba(0, 255, 200, 0.2)",
          "rgb(0, 200, 140)"
        );
      }
    }
  },
  mounted() {
    const { canvas } = this.$refs;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.renderShape(this.shape);
  }
};
</script>

<style lang="scss">
.shape-renderer {
  flex-grow: 1;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

canvas {
  background-color: white;
  flex-basis: 1;
  flex-grow: 1;
  margin: 0;
  padding: 0;
}
</style>