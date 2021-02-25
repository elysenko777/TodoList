<template>
  <div>
    <div id="nav">
      <router-link to="/">Task book</router-link> |
      <router-link to="/about">About </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#nav {
    text-align: center;
    margin: 10px auto;
}
  @import './styles/main.scss';
</style>
