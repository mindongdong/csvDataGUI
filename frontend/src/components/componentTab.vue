<template>
  <div class="tab">
    <div class="tab__column" @click="tabClick">Bar Plot</div>
    <div class="tab__column" @click="tabClick">Scatter Plot</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    tabClick(event) {
      const tab = document.querySelectorAll(".tab__column");
      console.dir(event.target);

      for (let i = 0; i < tab.length; i++) {
        tab[i].style.background = "white";
      }
      event.target.style.background = "rgb(175, 175, 175)";

      if (event.target.innerText == "Scatter Plot") {
        this.$router.push("/scatter");
      } else if (event.target.innerText == "Bar Plot") {
        this.$router.push("/bar");
      }
    },
  },
};
</script>

<style>
.tab {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.tab__column {
  width: 20%;
  height: 100%;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
