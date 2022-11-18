<!-- eslint-disable -->
<template>
  <div class="layout">
    <vue-csv-import 
      v-model="csv" 
      :map-fields="['annotation', 'values']">
      
    </vue-csv-import>

    <div class="canvas">
      <svg :width="width" :height="height">
        <g class="graph" :width="width" :height="height" :d="bar">
          <g class="xAxisG"></g>
          <g class="yAxisG"></g>
        </g>
        <text class="xLabel"></text>
        <text class="yLabel"></text>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { VueCsvImport } from "vue-csv-import";
import * as d3 from "d3";
export default {
  components: {
    VueCsvImport,
  },
  data() {
    return {
      csv: [],
      data: [],
      X_label: "X label",
      Y_label: "Y_label",
      width: 750,
      height: 300,
      graphWidth: 0,
      graphHeight: 0,
      margin: {
        mt: 30,
        mb: 50,
        mr: 50,
        ml: 80,
      },
    };
  },
  methods:{},
  mounted() {
      this.graphWidth = this.width - this.margin.ml - this.margin.mr
      this.graphHeight = this.height - this.margin.mt - this.margin.mb
      d3.select(".graph").attr('width', this.graphWidth)
                        .attr('height', this.graphHeight)
                        .attr('transform', `translate(${this.margin.ml}, ${this.margin.mt})`);
      d3.select(".xAxisG").attr("transform", `translate(0, ${this.graphHeight})`);
      d3.select(".xLabel")
        .attr("text-anchor", "end")
        .attr("x", this.width/2 + this.margin.ml/2)
        .attr("y", this.height + this.margin.mt - 45)
      d3.select(".yLabel")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", this.margin.ml / 2 - 5)
        .attr("x", -this.height / 2 + 20);
  },
  computed: {
    bar() {
      d3.selectAll(".graph > rect").remove();
      let barWidth = this.graphWidth/this.csv.length
      this.data = this.csv.slice(1);

      if (this.csv[0]) {
        this.xLabel = Object.values(this.csv[0])[0];
        this.yLabel = Object.values(this.csv[0])[1];
      }

      const x = d3.scaleBand()
                    .domain(this.data.map((d) => d.annotation ))
                    .range([0, this.graphWidth])
                    .padding(0.25)
      
      const y = d3.scaleLinear()
                  .domain([0, d3.max(this.data, d => d.values)])
                  .range([this.graphHeight, 0])

      const xAxis = d3.axisBottom(x)
      const yAxis = d3.axisLeft(y)


      d3.select(".xAxisG").call(xAxis)
      d3.select(".yAxisG").call(yAxis)

      d3.select(".xLabel").text(this.xLabel);
      d3.select(".yLabel").text(this.yLabel);

      d3.select('.xAxisG').selectAll('text')
        .attr('fill', 'blue')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end')    

      d3.select('.graph').selectAll('rect')
        .data(this.data)
        .enter()
        .append('text')
        .attr('x', (d) => x(d.annotation))
        .attr("y", (d) => y(d.values) - 5)
        .text((d) => d.values)
        .attr('text-anchor', 'start')   
        .style('font-size', '12px')

      return d3
        .select(".graph")
        .selectAll("rect")
        .data(this.data)
        .enter()
        .append('rect')
        .attr('height', (d) => this.graphHeight - y(d.values))
        .attr('width', x.bandwidth)
        .attr('x', (d) => x(d.annotation))
        .attr('y', (d) =>y(d.values))
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
}
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
