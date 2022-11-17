<!-- eslint-disable -->
<template>
  <div class="layout">
    <vue-csv-import 
      v-model="csv" 
      :map-fields="['annotation', 'values']">
      
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
      count: 0,
      X_label: "X label",
      Y_label: "Y_label",
      arr_len: 0,
    };
  },
  mounted() {
      
  },
  watch: {
    csv: function() {

      d3.selectAll("svg > *").remove();

      //코드수정중..
      if(this.csv[this.csv.length - 1] != undefined && this.count == 0){

        this.X_label = this.csv[0].annotation;
        this.Y_label = this.csv[0].values;
        
        this.csv.shift();
        this.count = this.count+1
        this.arr_len = this.csv.length;
      }

      //변화할때..
      if (this.arr_len != this.csv.length){
          this.X_label = this.csv[0].annotation;
          this.Y_label = this.csv[0].values;
          this.csv.shift();
          this.arr_len = this.csv.length;
      }

      const width = 750
      const height = 330
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
                //원래
      const x = d3.scaleBand()
                  .domain(this.csv.map(function(d) {return d.annotation;} ))
                  .range([0, graphWidth])
                  .padding(0.25)

      const y = d3.scaleLinear()
                  .domain([0, d3.max(this.csv, d => d.values)])
                  .range([graphHeight, 0])

      const bars = graph.selectAll('rect')
                      .data(this.csv);


      this.csv.forEach(function (item, index){
        bars.enter()
          .append('rect')
          .attr('height', function(d) {return (graphHeight - y(d.values))})
          .attr('width', x.bandwidth)
          // .attr('width',20)
          // console.log(graphWidth/d.annotation.length * index); 
          .attr('x', function(d,i) { console.log(x(d.annotation[i])); return x(d.annotation)})
          // .attr('x', function(d) { return 40*index  + 100})
          .attr('y', function(d) {return y(d.values)})
      })


      


      bars.enter()
          .append('text')
          .attr('x', function(d) {return x(d.annotation)})
          .attr("y", function(d) {return y(d.values) - 5})
          .text(function(d) {return d.values})
          .style('font-size', '12px')

      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2 + ml/2)
        .attr("y", height + mt - 45)
        .text(this.X_label);

      svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", ml/2 - 5)
          .attr("x", - height/2 + 20)
          .text(this.Y_label)

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
