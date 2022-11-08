<template>
  <div id="app">
    <div class="content-tab">
      <component-tab></component-tab>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import componentTab from "./components/componentTab.vue";

export default {
  name: "App",
  components: {
    componentTab,
  },
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ddd;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 60%;
  height: 80%;
  background: white;
  border-radius: 10px;
  box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
}
.content-tab {
  width: 100%;
  height: 7.5%;
}
.content {
  width: 100%;
  height: 92.5%;
  border-top: 0.5px solid black;
}
</style>
