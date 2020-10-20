<template>
  <div class="note-form">
    <el-dialog
      :title="titleNote"
      :visible.sync="dialogFormVisible"
      width="30%"
      class="note-dialog"
      :before-close="handlerCancel"
    >
      <el-form
        ref="formNote"
        :model="formNote"
        :rules="formNoteRules"
      >
        <el-form-item :label="$t('notes.title')" prop="title">
          <el-input
            ref="title"
            v-model="formNote.title"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item :label="$t('notes.description')">
          <el-input v-model="formNote.description" type="textarea" rows="10" />
        </el-form-item>
        <el-form-item :label="$t('notes.color')" class="note-color">
          <el-button
            v-for="item in colors"
            :key="item.color"
            :class="colorIsActive(item.color) ? 'active-color' : ''"
            :style="{backgroundColor: item.color}"
            circle
            icon="el-icon-check"
            @click="formNote.color = item.color"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlerCancel">{{ $t('notes.cancel') }}</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click.prevent="handleNote('formNote')"
        >
          {{ $t('notes.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

const helpersNote = {
  add: {
    nameMethod: 'addNote',
    message: 'notes.messageCreate'
  },
  edit: {
    nameMethod: 'editNote',
    message: 'notes.messageUpdate'
  }
}

export default {
  props: {
    dialogFormVisible: Boolean,
    titleNote: String,
    modeNote: String,
    updateNote: Object
  },
  data() {
    return {
      formNote: {
        title: '',
        description: '',
        color: '#fdcfe8'
      },
      formNoteRules: {
        title: [
          { required: true, message: this.$t('notes.enterTitle'), trigger: 'blur' }
        ]
      },
      colors: [
        {
          color: '#fdcfe8'
        },
        {
          color: '#fbbc04'
        },
        {
          color: '#fff475'
        },
        {
          color: '#ccff90'
        },
        {
          color: '#a7ffeb'
        },
        {
          color: '#aecbfa'
        },
        {
          color: '#d7aefb'
        }
      ],
      loading: false
    }
  },
  computed: {
    colorIsActive() {
      return currentColor => {
        return this.formNote.color === currentColor
      }
    }
  },
  watch: {
    updateNote: {
      immediate: true,
      handler(item) {
        if (!_.isEmpty(item)) {
          const currentNote = Object.assign({}, item)
          this.formNote = currentNote
        }
      }
    }
  },
  methods: {
    handleNote(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true

          this.$store.dispatch(helpersNote[this.modeNote].nameMethod, this.formNote)
            .then(() => {
              this.clearForm()
              this.loading = false
              this.$message({
                message: this.$t(helpersNote[this.modeNote].message),
                type: 'success'
              })
            })
            .catch(() => {
              this.clearForm()
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handlerCancel() {
      this.$emit('changeDialogFormVisible')
    },
    clearForm() {
      this.formNote.title = ''
      this.formNote.description = ''
      this.formNote.color = '#fdcfe8'
      this.$emit('changeDialogFormVisible')
    }
  }
}
</script>

<style lang="scss">
.note-form {
  .note-dialog {
    .note-color {
      display: flex;
      flex-direction: column;

      .el-form-item__label,
      .el-form-item__content {
        text-align: left;
        line-height: 20px;
        margin-top: 8px;
      }

      .el-button {
        border: 2px solid transparent;
        padding: 8px;

        i {
          opacity: 0;
        }

        &:hover {
          border: 2px solid $black;
        }
      }

      .active-color {
        i {
          opacity: 1;
        }
      }
    }
  }
}
</style>
