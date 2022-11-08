<template>
  <div class="layout">
    <vue-csv-import v-model="csv" :map-fields="['Axis X', 'Axis Y']">
      <vue-csv-toggle-headers></vue-csv-toggle-headers>
      <vue-csv-errors></vue-csv-errors>
      <vue-csv-input></vue-csv-input>
      <vue-csv-map :auto-match="false"></vue-csv-map>
    </vue-csv-import>
    <!-- <form class="uploadCsv">
      <label class="uploadCsv__button">
        파일 찾기
        <input
          df-file
          class="uploadCsv__input"
          type="file"
          ref="selectFile"
          @change.prevent="previewFile"
          accept="text/csv"
        />
      </label>
      <input
        class="uploadCsv__info"
        placeholder="첨부파일"
        v-if="selectFile"
        v-model="selectFile.name"
        readonly
      />
      <input class="uploadCsv__info" placeholder="첨부파일" v-else readonly />
    </form> -->
    <div class="canvas">
      scatter plot
      <div>{{ csv }}</div>
    </div>
  </div>
</template>

<script>
import { VueCsvImport } from "vue-csv-import";

export default {
  components: {
    VueCsvImport,
  },
  data() {
    return {
      csv: null,
    };
  },
  methods: {
    // previewFile() {
    //   if (this.$refs.selectFile.files.length > 0) {
    //     this.selectFile = this.$refs.selectFile.files[0];
    //   }
    //   console.log(this.$refs.selectFile.files[0]);
    // },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.uploadCsv {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.uploadCsv__button {
  display: inline-block;
  width: 15%;
  height: 100%;
  border: 1px solid black;
  color: black;
  background: white;
  cursor: pointer;
  vertical-align: middle;
  font-size: 14px;
  text-align: center;
}
.uploadCsv input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
