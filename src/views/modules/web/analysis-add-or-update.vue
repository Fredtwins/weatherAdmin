<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账户名称" prop="account">
      <el-input v-model="dataForm.account" placeholder="账户名称"></el-input>
    </el-form-item>
    <el-form-item label="月化收益" prop="monthIncome">
      <el-input v-model="dataForm.monthIncome" placeholder="月化收益"></el-input>
    </el-form-item>
    <el-form-item label="年化收益" prop="yearIncome">
      <el-input v-model="dataForm.yearIncome" placeholder="年化收益"></el-input>
    </el-form-item>
    <el-form-item label="推荐理由" prop="recommendReason">
      <el-input v-model="dataForm.recommendReason" placeholder="推荐理由"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createtime">
      <el-input v-model="dataForm.createtime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updatetime">
      <el-input v-model="dataForm.updatetime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="标记号（0：无效 1： 有效，默认有效）" prop="flag">
      <el-input v-model="dataForm.flag" placeholder="标记号（0：无效 1： 有效，默认有效）"></el-input>
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
          account: '',
          monthIncome: '',
          yearIncome: '',
          recommendReason: '',
          createtime: '',
          updatetime: '',
          flag: ''
        },
        dataRule: {
          account: [
            { required: true, message: '账户名称不能为空', trigger: 'blur' }
          ],
          monthIncome: [
            { required: true, message: '月化收益不能为空', trigger: 'blur' }
          ],
          yearIncome: [
            { required: true, message: '年化收益不能为空', trigger: 'blur' }
          ],
          recommendReason: [
            { required: true, message: '推荐理由不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          flag: [
            { required: true, message: '标记号（0：无效 1： 有效，默认有效）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/web/analysis/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.account = data.analysis.account
                this.dataForm.monthIncome = data.analysis.monthIncome
                this.dataForm.yearIncome = data.analysis.yearIncome
                this.dataForm.recommendReason = data.analysis.recommendReason
                this.dataForm.createtime = data.analysis.createtime
                this.dataForm.updatetime = data.analysis.updatetime
                this.dataForm.flag = data.analysis.flag
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
              url: this.$http.adornUrl(`/web/analysis/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'account': this.dataForm.account,
                'monthIncome': this.dataForm.monthIncome,
                'yearIncome': this.dataForm.yearIncome,
                'recommendReason': this.dataForm.recommendReason,
                'createtime': this.dataForm.createtime,
                'updatetime': this.dataForm.updatetime,
                'flag': this.dataForm.flag
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
