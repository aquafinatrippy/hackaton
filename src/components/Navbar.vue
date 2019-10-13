<template>
  <nav class="navbar">
    <a href="#" class="brand-logo">Logo</a>
    <div class="navbar-menu">
      <a href="/windowCalc">Window</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #6c8ead;
  align-items: center;
  height: 64px;

  padding: 0 32px;

  a {
    color: white;
    text-decoration: none;
  }

  .navbar-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      padding: 0 24px;
      font-weight: bold;
    }
  }
}
</style>