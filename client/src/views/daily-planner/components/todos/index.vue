<template>
  <section v-loading="loading" class="todos">
    <header class="header">
      <div class="date">
        {{ currentDate | moment('DD.MM.YYYY') }}
        <hr>
      </div>
      <div class="wpapper-new-todo">
        <el-input
          v-model="newTodo"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 7 }"
          class="new-todo"
          autofocus
          autocomplete="off"
          :placeholder="$t('todos.question')"
          @keydown.native.enter.exact.prevent
          @keydown.native.enter.exact="handlerAddTodo"
          @keydown.native.ctrl.enter.exact.prevent="handlerAddTodoNewLine"
          @keydown.native.shift.enter.exact.prevent="handlerAddTodoNewLine"
        />
        <el-button
          icon="el-icon-check"
          circle
          @click="handlerAddTodo"
        />
      </div>
    </header>
    <div v-show="todos.length" class="filters">
      <el-input
        v-model="search"
        class="search"
        size="mini"
        :placeholder="$t('todos.search')"
      />
      <el-select
        v-model="filterOption"
        class="selectFilter"
        :placeholder="$t('todos.filters')"
      >
        <el-option
          v-for="item in filterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-table-draggable @drop="dropRow($event)">
      <el-table
        v-show="todos.length"
        :data="filterTodos"
        style="width: 100%"
        :max-height="screenHeight"
        :row-class-name="tableRowClassName"
      >
        <el-table-column width="55">
          <template slot-scope="{ row }">
            <el-checkbox
              v-model="row.completed"
              @change="handlerCompleted(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('todos.title')">
          <template slot-scope="{ row }">
            <span class="title">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" class-name="actions" width="55">
          <template slot-scope="{ row }">
            <el-dropdown trigger="hover">
              <i class="el-icon-more" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-edit"
                  @click.native="handlerUpdateEdit(row)"
                >
                  {{ $t('todos.edit') }}
                </el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-close"
                  @click.native="handlerDelete(row)"
                >
                  {{ $t('todos.delete') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-table-draggable>

    <Form
      :dialog-form-visible="dialogFormVisible"
      :temp-current-todo="tempCurrentTodo"
      :calendar-date="currentDate"
      @handlerCancelDialogForm="handlerCancelDialogForm"
      @handlerGetList="getList"
    />
  </section>
</template>

<script>
import ElTableDraggable from 'element-ui-el-table-draggable'
import { fetchTodos, addTodo, deleteTodo, updateTodo, dragAndDropTodos } from '@/api/todo'
import Form from '../form'

export default {
  name: 'Todos',
  components: {
    ElTableDraggable,
    Form
  },
  props: {
    currentDate: Date,
    currentStatusDrawer: Boolean
  },
  data() {
    return {
      newTodo: '',
      loading: false,
      search: '',
      dialogFormVisible: false,
      tempCurrentTodo: {},
      filterOptions: [
        {
          label: this.$t('todos.all'),
          value: 'all'
        },
        {
          label: this.$t('todos.completed'),
          value: 'completed'
        },
        {
          label: this.$t('todos.noCompleted'),
          value: 'no-completed'
        }
      ],
      filterOption: 'all',
      todos: []
    }
  },
  computed: {
    filterTodos() {
      let currentTodos
      const searchTodos = this.todos.filter(
        (todo) =>
          !this.search ||
          todo.title.toLowerCase().includes(this.search.toLowerCase())
      )

      if (this.filterOption === 'completed') {
        currentTodos = searchTodos.filter((todo) => todo.completed)
      } else if (this.filterOption === 'no-completed') {
        currentTodos = searchTodos.filter((todo) => !todo.completed)
      } else {
        currentTodos = searchTodos
      }

      return currentTodos
    },
    screenHeight() {
      let height = '800'

      if (screen.height <= 1024) {
        height = '750'
      }

      if (screen.height <= 768) {
        height = '500'
      }

      return height
    }
  },
  watch: {
    currentDate: async function(value) {
      const date = this.$moment(value).format('YYYY-MM-DD')
      this.getList(date)
    },
    currentStatusDrawer(status) {
      if (!status) {
        this.filterOption = 'all'
        this.search = ''
        this.newTodo = ''
      }
    }
  },
  async mounted() {
    const date = this.$moment(this.currentDate).format('YYYY-MM-DD')
    this.getList(date)
  },
  methods: {
    async getList(date) {
      this.loading = true
      try {
        const response = await fetchTodos({ date })
        this.todos = response?.items || []
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    tableRowClassName({ row }) {
      if (row.completed) {
        return 'success-row'
      }

      return ''
    },
    async dropRow(data) {
      if (this.filterOption === 'all') {
        const date = this.$moment(this.currentDate).format('YYYY-MM-DD')
        this.loading = true

        try {
          await dragAndDropTodos({
            todos: data.list,
            date
          })
          this.getList(date)
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      }
    },
    handlerAddTodoNewLine() {
      this.newTodo = `${this.newTodo}\n`
    },
    handlerEditTodoNewLine(row) {
      row.title = `${row.title}\n`
    },
    async handlerAddTodo() {
      this.loading = true
      const value = this.newTodo && this.newTodo.trim()
      const date = this.$moment(this.currentDate).format('YYYY-MM-DD')

      if (!value) {
        this.loading = false
        return
      }

      const todo = {
        title: value,
        completed: false
      }

      this.loading = true
      try {
        await addTodo({ todo, date })
        this.newTodo = ''
        this.getList(date)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async handlerCompleted(todo) {
      const calendarDate = this.$moment(this.currentDate).format('YYYY-MM-DD')
      this.loading = true

      try {
        await updateTodo({ todo, calendarDate })
        this.getList(calendarDate)
      } catch (error) {
        console.log(error)
      }

      this.loading = false
    },
    handlerUpdateEdit(row) {
      const date = this.$moment(this.currentDate).format('YYYY-MM-DD')

      this.tempCurrentTodo = Object.assign({}, row) // copy obj

      // eslint-disable-next-line no-prototype-builtins
      if (!this.tempCurrentTodo.hasOwnProperty('date')) {
        this.tempCurrentTodo.date = date
      }

      this.dialogFormVisible = true
    },
    async handlerDelete(todo) {
      const date = this.$moment(this.currentDate).format('YYYY-MM-DD')
      this.loading = true

      try {
        await deleteTodo({ todo, date })
        this.getList(date)
      } catch (error) {
        console.log(error)
      }

      this.loading = false
    },
    handlerCancelDialogForm() {
      this.dialogFormVisible = false
      this.tempCurrentTodo = {}
    }
  }
}
</script>

<style lang="scss">
.todos {
  padding: 20px;

  .header {
    margin-bottom: 30px;

    .date hr {
      border: 0;
      height: 1px;
      background: $gray;
    }

    .wpapper-new-todo {
      display: flex;
      align-items: center;
      justify-content: center;

      .new-todo {
        position: relative;
        margin-right: 10px;
        width: 100%;
        font-size: 15px;
        box-sizing: border-box;
      }
    }
  }

  .filters {
    display: flex;
    margin-bottom: 15px;

    .search {
      width: 300px;
      margin-right: 15px;

      .el-input__inner {
        height: 36px;
        line-height: 36px;
      }
    }

    .selectFilter {
      .el-input__inner {
        height: 36px;
        line-height: 36px;
      }
    }
  }

  .el-table {
    thead {
      th:first-child .cell {
        display: none;
      }
    }

    .title {
      white-space: pre;
    }

    .success-row {
      background: $light-green;

      td:nth-child(2) {
        text-decoration: line-through;
      }
    }

    .edit-todo {
      display: flex;
      flex-direction: column;

      .edit-input {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .actions {
      .el-dropdown {
        cursor: pointer;
        font-size: 18px;

        .el-icon-more {
          height: 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
