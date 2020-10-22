<template>
  <div class="daily-planner">
    <Calendar
      :key="isLanguageChanged"
      v-loading="loading"
      @currentMonth="getCurrentMonth($event)"
    >
      <template
        slot="dateCell"
        slot-scope="{date}"
      >
        <span
          :class="currentDayClass(date)"
          @click="handlerDrawer(date)"
        >
          {{ date | moment("DD") }}
        </span>
      </template>
    </Calendar>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleClose"
      size="50%"
    >
      <Todos :current-date="currentDate" :current-status-drawer="drawer" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Calendar from '@/components/calendar'
import Todos from './components/todos'

export default {
  name: 'DailyPlanner',
  components: {
    Todos,
    Calendar
  },
  metaInfo() {
    return {
      title: this.$t('menu.dailyPlanner')
    }
  },
  data() {
    return {
      drawer: false,
      currentDate: '',
      loading: true,
      isLanguageChanged: 1
    }
  },
  computed: {
    ...mapGetters(['todosByMonth']),
    currentDayClass() {
      return date => {
        const currentDate = this.$moment(date).format('YYYY-MM-DD')
        const currentTodos = this.todosByMonth.filter(todo => currentDate === todo.date)

        if (currentTodos.length > 0) {
          let dayClass = ''

          if (currentTodos[0].items.length > 0) {
            const checkCompleted = currentTodos[0].items.every(todo => todo.completed)

            if (checkCompleted) {
              dayClass = 'todos-finish'
            } else {
              dayClass = 'todos-no-completed'
            }
          }

          return dayClass
        }

        return ''
      }
    },
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    language(value) {
      this.isLanguageChanged++
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchTodosByMonth', new Date())
    this.loading = false
  },
  methods: {
    handlerDrawer(date) {
      this.drawer = true
      this.currentDate = date
    },
    async getCurrentMonth(date) {
      await this.$store.dispatch('fetchTodosByMonth', date)
      this.loading = false
    },
    async handleClose(done) {
      done()
      this.loading = true
      await this.$store.dispatch('fetchTodosByMonth', this.currentDate)
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.el-calendar {
  .el-calendar__header {
    padding: 12px 0;
  }

  .el-calendar__body {
    padding: 12px 0 35px;

    .el-calendar-day {
      padding: 0;

      span {
        height: 81%;;
        display: block;
        padding: 8px;
      }

      .todos-finish {
        background: $green;
        color: $white;
      }

      .todos-no-completed {
        background: $red;
        color: $white;
      }
    }
  }
}
</style>
