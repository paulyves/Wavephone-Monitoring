<template>
<div class="ramChar">
    <div class="ramChart">
    <CPUcharts  :option="DataCall" :resizable="true"/>
    <br>
    <h4 class="textCol">Memory</h4>
    <h5 class="textCol">{{memoryDataVal}}%</h5>
    </div>
</div>
</template>

<script>
import CPUcharts from "vue-echarts-v3/src/full.js";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "RamChart",
    props:['memoryDataVal'],

    computed:{
        ...mapGetters(["getRamData"])
    },

    data(){
        return{
            DataCall:{
                xAxis:{
                   type: "time",
                   axisLine:{
                        lineStyle:{ color : '#B1B1B1'}
                    }
                },

                yAxis:{
                    type: "value",
                    //  borderColor: "red",
                     itemStyle: {borderColor: 'red'},
                    // type: "category",
                    // data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                    axisLine:{
                        lineStyle:{ color : '#B1B1B1'}
                    }

                },
                series:
                    {
                        type: "line",
                        data:[],
                        itemStyle: {color: '#ff7bac'},
                        "label": {
                    "normal": {
                    "show": true,
                    "color": "yellow",
                    "position": "top"
                    }
                    }
                        
                        
                    }
                


            }
        }
    },

    methods:{
        ...mapActions(["callRamData"]),

        dataSend(){
            let DataRam = {
             Searies: this.DataCall.series.data
            }
            this.$emit("dataSendRam", DataRam)
            // this.$emit("dataSendRam", this.DataCall.title.text)
            // this.$emit("dataSendRam", this.DataCall.title.text)
            // console.log("WE", this.DataCall.title.text)

            // this.DataCall
        }

    },


     mounted() {
        //  console.log("hello"),
         this.dataSend()
        //  this.callRamData()
     },

    


    components:{
        CPUcharts
    }
}
</script>

<style scoped>
.ramChart{
    width: 90%;
  height: 260px;
  margin-right: 0%;
   margin-left: 5%;
   margin-top: 5%;
   border: #ff7bac solid 2px;
   background-color: #333333;
  /* background-color: #4d4d4d; */
}

.textCol{
    color: white;
}
</style>