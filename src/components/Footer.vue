<template>
  <footer class="footer">
    <div class="footer-links"></div>
    <div class="footer-copyright">Copyright {{author}} &copy; {{date}}</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      author: "Tanel Tekko",
      date: Date().slice(10, 15)
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  min-height: 200px;

  background-color: #a23e48;

  .footer-links {
    background-color: rgba(255, 255, 255, 0.25);
    min-height: 150px;
    padding: 12px 14px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .footer-copyright {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
</style>