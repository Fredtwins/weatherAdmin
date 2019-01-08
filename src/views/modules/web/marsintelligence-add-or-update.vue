<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="时间" prop="datetime">
      <el-input v-model="dataForm.datetime" placeholder="时间"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型"></el-input>
    </el-form-item>
    <el-form-item label="attach1" prop="attach1">
      <el-input v-model="dataForm.attach1" placeholder="attach1"></el-input>
    </el-form-item>
    <el-form-item label="attach2" prop="attach2">
      <el-input v-model="dataForm.attach2" placeholder="attach2"></el-input>
    </el-form-item>
    <el-form-item label="状态" size="mini" prop="status">
		<el-radio-group v-model="dataForm.status">
		  <el-radio :label="0">禁用</el-radio>
		  <el-radio :label="1">正常</el-radio>
		</el-radio-group>
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
          datetime: '',
          content: '',
          type: '',
          attach1: '',
          attach2: '',
          status: 1
        },
        dataRule: {
          datetime: [
            { required: false, message: '时间不能为空', trigger: 'blur' }
          ],
          content: [
            { required: false, message: '内容不能为空', trigger: 'blur' }
          ],
          type: [
            { required: false, message: '类型不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/web/marsintelligence/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.datetime = data.marsintelligence.datetime
                this.dataForm.content = data.marsintelligence.content
                this.dataForm.type = data.marsintelligence.type
                this.dataForm.attach1 = data.marsintelligence.attach1
                this.dataForm.attach2 = data.marsintelligence.attach2
                this.dataForm.status = data.marsintelligence.status
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
              url: this.$http.adornUrl(`/web/marsintelligence/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'datetime': this.dataForm.datetime,
                'content': this.dataForm.content,
                'type': this.dataForm.type,
                'attach1': this.dataForm.attach1,
                'attach2': this.dataForm.attach2,
                'status': this.dataForm.status
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
