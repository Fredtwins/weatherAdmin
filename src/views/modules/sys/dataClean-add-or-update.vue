<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="数据库" prop="database">
      <el-input v-model="dataForm.database" placeholder="数据库"></el-input>
    </el-form-item>
    <el-form-item label="表名" prop="tablename">
      <el-input v-model="dataForm.tablename" placeholder="表名"></el-input>
    </el-form-item>
    <el-form-item label="字段" prop="field">
      <el-input v-model="dataForm.field" placeholder="字段"></el-input>
    </el-form-item>
    <el-form-item label="保存时长" prop="storageTime">
      <el-input v-model="dataForm.storageTime" placeholder="保存时长（分）"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <!-- <el-input v-model="dataForm.status" placeholder="状态  0：禁用   1：正常"></el-input> -->
      <el-radio-group v-model="dataForm.status">
        <el-radio :label="0">禁用</el-radio>
        <el-radio :label="1">正常</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="对象类型" prop="objectType">
      <el-input v-model="dataForm.objectType" placeholder="对象类型"></el-input>
    </el-form-item>
    <el-form-item label="文件路径" prop="filePath">
      <el-input v-model="dataForm.filePath" placeholder="文件路径"></el-input>
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
          database: '',
          tablename: '',
          field: '',
          storageTime: '',
          status: 1,
          description: '',
          createTime: '',
          objectType: '',
          filePath: ''
        },
        dataRule: {
          database: [
            { required: true, message: '数据库不能为空', trigger: 'blur' }
          ],
          tablename: [
            { required: true, message: '表名不能为空', trigger: 'blur' }
          ],
          field: [
            { required: true, message: '字段不能为空', trigger: 'blur' }
          ],
          storageTime: [
            { required: true, message: '保存时长（分）不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          objectType: [
            { required: true, message: '对象类型不能为空', trigger: 'blur' }
          ],
          filePath: [
            { required: true, message: '文件路径不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/dataClean/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.database = data.dataClean.database
                this.dataForm.tablename = data.dataClean.tablename
                this.dataForm.field = data.dataClean.field
                this.dataForm.storageTime = data.dataClean.storageTime
                this.dataForm.status = data.dataClean.status
                this.dataForm.description = data.dataClean.description
                this.dataForm.createTime = data.dataClean.createTime
                this.dataForm.objectType = data.dataClean.objectType
                this.dataForm.filePath = data.dataClean.filePath
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
              url: this.$http.adornUrl(`/sys/dataClean/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'database': this.dataForm.database,
                'tablename': this.dataForm.tablename,
                'field': this.dataForm.field,
                'storageTime': this.dataForm.storageTime,
                'status': this.dataForm.status,
                'description': this.dataForm.description,
                'createTime': this.dataForm.createTime,
                'objectType': this.dataForm.objectType,
                'filePath': this.dataForm.filePath
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
    }
  }
</script>
