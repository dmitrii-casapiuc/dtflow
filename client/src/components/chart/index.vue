<template>
  <div v-loading="loading" class="analytics">
    <div
      class="chart-header"
    >
      <el-button-group>
        <el-button
          type="plain"
          size="mini"
          @click="selectDate('prev-month')"
        >
          {{ $t('datePicker.prevMonth') }}
        </el-button>
        <el-button
          type="plain"
          size="mini"
          @click="selectDate('today')"
        >
          {{ $t('datePicker.currentMonth') }}
        </el-button>
        <el-button
          type="plain"
          size="mini"
          @click="selectDate('next-month')"
        >
          {{ $t('datePicker.nextMonth') }}
        </el-button>
      </el-button-group>
    </div>
    <canvas ref="canvas" height="100vh" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import fecha from 'element-ui/src/utils/date'
import { fetchAnalyticsTodo } from '@/api/analytic'

export default {
  extends: Bar,
  props: {
    methodChart: {
      type: String,
      default: ''
    },
    titleChart: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      date: new Date()
    }
  },
  computed: {
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime())
      temp.setDate(0)
      return fecha.format(temp, 'yyyy-MM')
    },
    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1)
      return fecha.format(temp, 'yyyy-MM')
    },
    formatedDate() {
      return fecha.format(this.date, 'yyyy-MM-dd')
    }
  },
  async mounted() {
    await this.init(this.formatedDate)
  },
  methods: {
    async init(date) {
      // const chartData = await this.$store.dispatch(this.methodChart, date)

      fetchAnalyticsTodo(date)
        .then(response => {
          const data = {
            labels: response.labels,
            datasets: [{
              label: this.$t(this.titleChart),
              data: response.data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          }

          const options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            }
          }

          this.renderChart(data, options)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })

      /* const data = {
        labels: chartData.labels,
        datasets: [{
          label: this.$t(this.titleChart),
          data: chartData.data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }

      const options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }

      this.renderChart(data, options)
      this.loading = false */
    },
    selectDate(type) {
      let day = ''

      if (type === 'prev-month') {
        day = `${this.prevMonthDatePrefix}-01`
      } else if (type === 'next-month') {
        day = `${this.nextMonthDatePrefix}-01`
      } else {
        day = this.formatedDate
      }

      this.loading = true
      this.init(day)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-header {
  display: flex;
  justify-content: flex-end;
}
</style>
