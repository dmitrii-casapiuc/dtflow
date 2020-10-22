<template>
  <div class="wrapper-profile">
    <div class="title">{{ $t("menu.profile") }}</div>
    <div v-loading="loading" class="profile">
      <div class="profile-left-side">
        <div class="profile-avatar">
          <img class="profile-image" :src="info.avatarUrl">
        </div>
      </div>
      <div class="profile-right-side">
        <div class="profile-email">
          <label class="label">{{ $t("profile.yourEmail") }}:</label>
          <span class="email">{{ info.email }}</span>
        </div>
        <div class="profile-name">
          <label class="label">{{ $t("auth.name") }}:</label>
          <el-input v-model="currentName" placeholder="Please input" />
        </div>
        <div class="profile-upload-avatar">
          <el-upload
            ref="imageUploader"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt="thumbnail"
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="profile-button">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="handleUpdateProfile()"
          >
            {{ $t("profile.change") }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Profile',
  metaInfo() {
    return {
      title: this.$t('menu.profile')
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      currentName: '',
      loading: true,
      fileList: {}
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  watch: {
    info: {
      handler(info) {
        if (info) {
          this.currentName = info.name
          this.loading = false
        }
      },
      immediate: true
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$refs.imageUploader.clearFiles()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imageFile = { ...file }
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = fileList

      if (fileList.length > 1) {
        this.$message({
          message: this.$t('profile.restricUploadImage'),
          type: 'error'
        })
        fileList.pop()
      }
    },
    handleUpdateProfile() {
      const { ...infoImage } = this.fileList[0]
      const fd = new FormData()

      this.loading = true

      if (!_.isEmpty(infoImage)) {
        fd.append('avatar', infoImage.raw, infoImage.raw.name)
      }

      fd.append('name', this.currentName)

      this.$store.dispatch('updateProfile', fd)
        .then(() => {
          this.$refs.imageUploader.clearFiles()
          this.loading = false
          this.$message({
            message: this.$t('profile.updatedProfile'),
            type: 'success'
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-profile {
  .title {
    font-size: 30px;
    margin-bottom: 30px;
  }

  .profile {
    display: flex;

    .profile-left-side {
      margin-right: 50px;

      .profile-avatar {
        .profile-image {
          width: 300px;
        }
      }
    }

    .profile-right-side {
      max-width: 500px;
      width: 100%;

      .label {
        color: $black;
        display: block;
        margin-bottom: 7px;
        font-weight: 500;
      }

      .profile-email {
        margin-bottom: 18px;

        .email {
          color: $grayish-blue;
          font-weight: 400;
        }
      }

      .profile-name {
        margin-bottom: 18px;

        .el-input {
          width: 50%;
        }
      }

      .profile-upload-avatar {
        margin-bottom: 18px;

        .el-upload-list__item > div {
          height: 148px;

          img {
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
