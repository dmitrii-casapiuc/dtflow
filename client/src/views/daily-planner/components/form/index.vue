<template>
  <el-dialog
    :title="$t('todos.editTodo')"
    :append-to-body="true"
    :visible.sync="dialogFormVisible"
    class="edit-todo-form"
    width="30%"
    :before-close="handlerCancelEdit"
  >
    <el-form
      ref="formTodo"
      :model="formTodo"
      label-position="top"
    >
      <el-form-item label="Date">
        <el-date-picker
          v-model="formTodo.date"
          type="date"
          placeholder="Please pick a date"
        />
      </el-form-item>
      <el-form-item :label="$t('todos.description')">
        <el-input
          v-model="formTodo.title"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
        />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="handlerCancelEdit">{{ $t('todos.cancel') }}</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click.prevent="handlerConfirmEdit"
        >
          {{ $t('todos.confirm') }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import { updateTodo } from '@/api/todo'

export default {
  props: {
    dialogFormVisible: Boolean,
    tempCurrentTodo: {
      type: Object,
      default: () => {
        return {
          completed: Boolean,
          title: String,
          _id: String
        }
      }
    },
    calendarDate: Date
  },
  data() {
    return {
      loading: false,
      formTodo: {}
    }
  },
  watch: {
    tempCurrentTodo: {
      immediate: true,
      handler(item) {
        if (!_.isEmpty(item)) {
          this.formTodo = Object.assign({}, item)
        }
      }
    }
  },
  methods: {
    handlerCancelEdit() {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('handlerCancelDialogForm')
    },
    async handlerConfirmEdit() {
      this.loading = true

      const todo = Object.assign({}, this.formTodo)
      const calendarDate = this.$moment(this.calendarDate).format('YYYY-MM-DD')
      todo.date = this.$moment(todo.date).format('YYYY-MM-DD')

      try {
        await updateTodo({ todo, calendarDate })
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('handlerGetList', calendarDate)
      } catch (error) {
        console.log(error)
      }

      this.handlerCancelEdit()
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.edit-todo-form {
  .el-form {
    .el-form-item__label {
      padding: 0;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
