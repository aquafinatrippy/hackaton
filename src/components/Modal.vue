<template>
  <div v-if="open" class="modal-wrapper">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      open: false
    };
  },
  methods: {
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  display: flex;

  .modal {
    display: flex;
    margin-bottom: 15%;
  }
}
</style>