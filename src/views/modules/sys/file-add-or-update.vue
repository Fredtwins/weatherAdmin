<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <!-- <el-form-item label="存放路径" prop="storagePath">
      <el-input v-model="dataForm.storagePath" placeholder="存放路径"></el-input>
    </el-form-item>
    <el-form-item label="大小" prop="size">
      <el-input v-model="dataForm.size" placeholder="大小"></el-input>
    </el-form-item>
    <el-form-item label="文件类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="文件类型"></el-input>
    </el-form-item> -->
    <el-form-item label="别名" prop="alias">
      <el-input v-model="dataForm.alias" placeholder="别名"></el-input>
    </el-form-item>
    <!-- <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item> -->
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <!-- <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常"></el-input> -->
      <el-radio-group v-model="dataForm.status">
        <el-radio :label="0">禁用</el-radio>
        <el-radio :label="1">正常</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文件上传">
      <el-upload
        :action="uploadUrl"
        :multiple="true"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handsuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          storagePath: '',
          size: '',
          type: '',
          alias: '',
          // createTime: '',
          description: '',
          status: 1
        },
        uploadUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dataRule: {
          storagePath: [
            { required: true, message: '存放路径不能为空', trigger: 'blur' }
          ],
          size: [
            { required: true, message: '大小不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '文件类型不能为空', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '别名不能为空', trigger: 'blur' }
          ],
          // createTime: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ]
        },
        storagePaths: [],
        sizes: [],
        types: []
      }
    },
    methods: {
      getUrl () {
        this.uploadUrl = `http://10.0.1.184:8080/mpsp/sys/file/upload?token=${this.$cookie.get('token')}`
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handsuccess (response, file, filelist) {
        console.log(response)
        this.sizes = []
        this.types = []
        for (var j = 0; j < response.storagePaths.length; j++) {
          this.storagePaths.push(response.storagePaths[j])
        }
        for (var i = 0; i < filelist.length; i++) {
          this.sizes.push(filelist[i].raw.size)
          this.types.push(filelist[i].raw.type)
        }
        // console.log(this.storagePaths)
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/file/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.storagePath = data.file.storagePath
                this.dataForm.size = data.file.size
                this.dataForm.type = data.file.type
                this.dataForm.alias = data.file.alias
                // this.dataForm.createTime = data.file.createTime
                this.dataForm.description = data.file.description
                this.dataForm.status = data.file.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/file/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'storagePaths': this.storagePaths,
                'sizes': this.sizes,
                'types': this.types,
                'alias': this.dataForm.alias,
                'description': this.dataForm.description,
                'type': this.dataForm.status
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    },
    created () {
      this.getUrl()
    }
  }
</script>
