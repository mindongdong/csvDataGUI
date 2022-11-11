<!-- eslint-disable -->
<template>
  <div class="layout">
    <vue-csv-import 
      v-model="csv" 
      :map-fields="['Values', 'Annotation']">

    </vue-csv-import>

    <div class="canvas">
      <svg></svg>    
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
    };
  },
  mounted() {
      
  },
  watch: {
    csv: function() {

      console.log("csv Changed")

      // d3.select("body").selectAll("canvas").remove();
      d3.selectAll("svg > *").remove();

      // if(typeof this.csv[0] != 'number')
      //   this.csv.shift(); 

      const width = 400
      const height = 400
      let [mt, mb, mr, ml] = [30, 50, 50, 80]

      const svg = d3.select('svg')
                    .attr('width', width)
                    .attr('height', height )

      const graphWidth = width - ml - mr
      const graphHeight = height - mt - mb

      const graph = svg.append('g')
                      .attr('width', graphWidth)
                      .attr('height', graphHeight)
                      .attr('transform', `translate(${ml}, ${mt})`)

      const xAxisG = graph.append('g')
                          .attr('transform', `translate(0, ${graphHeight})`)
      const yAxisG = graph.append('g')

      const x = d3.scaleBand()
                  .domain(this.csv.map(function(d) { return d.Values;} ))
                  .range([0, graphWidth])
                  .padding(0.25)
      // // console.log(item.Values)
      //console.log(x)
      const y = d3.scaleLinear()
                  .domain([0, d3.max(this.csv, d => d.Annotation)])
                  .range([graphHeight, 0])

      const bars = graph.selectAll('rect')
                      .data(this.csv);

      bars.enter()
          .append('rect')
          .attr('height', function(d) {return (graphHeight - y(d.Annotation))})
          //.attr('height', graphHeight - this.csv.Annotation)
          .attr('width', x.bandwidth)
          .attr('x', function(d) {return x(d.Values)})
          .attr('y', function(d) {return y(d.Annotation)})


      bars.enter()
          .append('text')
          .attr('x', function(d) {return x(d.Values)})
          .attr("y", function(d) {return y(d.Annotation) - 5})
          .text(function(d) {return d.Annotation})
          .style('font-size', '12px')

      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2 + ml/2)
        .attr("y", height + mt - 45)
        .text("X label");

      svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", ml/2 - 5)
          .attr("x", - height/2 + 20)
          .text("Y label")

        const xAxis = d3.axisBottom(x)
        const yAxis = d3.axisLeft(y)
        
        xAxisG.call(xAxis)
        yAxisG.call(yAxis)

        xAxisG.selectAll('text')
            .attr('fill', 'blue')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')       
        

    },
  }
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
