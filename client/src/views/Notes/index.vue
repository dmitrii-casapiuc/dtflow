<template>
  <div v-loading="loading" class="wrapper-notes">
    <div class="notes-header">
      <div class="title">{{ $t('menu.notes') }}</div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="add-note"
        @click="addNote"
      >
        {{ $t('notes.addNote') }}
      </el-button>
    </div>
    <masonry
      v-if="notes.length"
      class="notes"
      :cols="{
        default: 4,
        1500: 3,
        1300: 2,
        950: 1,
      }"
    >
      <div
        v-for="item in notes"
        :key="item._id"
        class="wrapper-note-item item"
        :style="{ backgroundColor: item.color }"
      >
        <el-button
          type="danger"
          icon="el-icon-close"
          circle
          class="note-delete"
          @click.prevent="deleteNote(item)"
        />
        <div class="note-item" @click.prevent="editNote(item)">
          <div class="note-wrapper">
            <h4 class="title">{{ item.title }}</h4>
            <p class="content">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </masonry>
    <NoData v-else />

    <Form
      :dialog-form-visible="dialogFormVisible"
      :title-note="titleNote"
      :mode-note="modeNote"
      :update-note="updateNote"
      @changeDialogFormVisible="dialogFormVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NoData from '@/components/NoData'
import Form from './Form'

export default {
  name: 'Notes',
  components: {
    Form,
    NoData
  },
  data() {
    return {
      loading: true,
      dialogFormVisible: false,
      titleNote: this.$t('notes.addNote'),
      modeNote: 'add',
      updateNote: {}
    }
  },
  metaInfo() {
    return {
      title: this.$t('menu.notes')
    }
  },
  computed: {
    ...mapGetters(['notes'])
  },
  async mounted() {
    await this.$store.dispatch('fetchNotes')
    this.loading = false
  },
  methods: {
    async deleteNote(note) {
      this.loading = true
      await this.$store.dispatch('deleteNote', note)
      this.loading = false
    },
    editNote(note) {
      this.titleNote = this.$t('notes.editNote')
      this.modeNote = 'edit'
      this.updateNote = note
      this.dialogFormVisible = true
    },
    addNote() {
      this.titleNote = this.$t('notes.addNote')
      this.modeNote = 'add'
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss">
.wrapper-notes {
  position: relative;

  .notes-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 30px;
    }

    .add-note {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
    }
  }

  .notes {
    .wrapper-note-item {
      position: relative;
      min-height: 100px;
      padding: 15px;
      margin: 10px;
      border-radius: 10px;

      &:hover {
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
          0 1px 3px 1px rgba(60, 64, 67, 0.149);
        cursor: pointer;
      }

      .note-delete {
        position: absolute;
        right: -10px;
        top: -10px;
        padding: 7px;
        font-size: 11px;
        display: none;
      }

      &:hover .note-delete {
        display: block;
      }

      .note-item {
        min-height: 100px;

        .note-wrapper {
          .title {
            margin: 0 0 10px 0;
            font-weight: 500;
          }

          .content {
            margin: 0;
            font-size: 16px;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
