<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="日期" prop="date">
      <el-input v-model="dataForm.date" placeholder="日期"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-input v-model="dataForm.time" placeholder="时间"></el-input>
    </el-form-item>
    <el-form-item label="重要性" prop="weightiness">
      <el-input v-model="dataForm.weightiness" placeholder="重要性"></el-input>
    </el-form-item>
    <el-form-item label="国家代码" prop="countryCode">
      <el-input v-model="dataForm.countryCode" placeholder="国家代码"></el-input>
    </el-form-item>
    <el-form-item label="国家名称" prop="countryName">
      <el-input v-model="dataForm.countryName" placeholder="国家名称"></el-input>
    </el-form-item>
    <el-form-item label="指标内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="指标内容"></el-input>
    </el-form-item>
    <el-form-item label="前值" prop="previous">
      <el-input v-model="dataForm.previous" placeholder="前值"></el-input>
    </el-form-item>
    <el-form-item label="预测值" prop="predict">
      <el-input v-model="dataForm.predict" placeholder="预测值"></el-input>
    </el-form-item>
    <el-form-item label="公布值" prop="currentValue">
      <el-input v-model="dataForm.currentValue" placeholder="公布值"></el-input>
    </el-form-item>
    <el-form-item label="栏目编码" prop="columnCode">
      <el-input v-model="dataForm.columnCode" placeholder="栏目编码"></el-input>
    </el-form-item>
    <el-form-item label="经过修订" prop="revised">
      <el-input v-model="dataForm.revised" placeholder="经过修订"></el-input>
    </el-form-item>
    <el-form-item label="数据类型" prop="dataType">
      <el-input v-model="dataForm.dataType" placeholder="数据类型"></el-input>
    </el-form-item>
    <el-form-item label="数据类型名称" prop="dataTypeName">
      <el-input v-model="dataForm.dataTypeName" placeholder="数据类型名称"></el-input>
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
          date: '',
          time: '',
          weightiness: '',
          countryCode: '',
          countryName: '',
          content: '',
          previous: '',
          predict: '',
          currentValue: '',
          columnCode: '',
          revised: '',
          dataType: '',
          dataTypeName: '',
          createtime: '',
          updatetime: '',
          flag: ''
        },
        dataRule: {
          date: [
            { required: true, message: '日期不能为空', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '时间不能为空', trigger: 'blur' }
          ],
          weightiness: [
            { required: true, message: '重要性不能为空', trigger: 'blur' }
          ],
          countryCode: [
            { required: true, message: '国家代码不能为空', trigger: 'blur' }
          ],
          countryName: [
            { required: true, message: '国家名称不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '指标内容不能为空', trigger: 'blur' }
          ],
          previous: [
            { required: true, message: '前值不能为空', trigger: 'blur' }
          ],
          predict: [
            { required: true, message: '预测值不能为空', trigger: 'blur' }
          ],
          currentValue: [
            { required: true, message: '公布值不能为空', trigger: 'blur' }
          ],
          columnCode: [
            { required: true, message: '栏目编码不能为空', trigger: 'blur' }
          ],
          revised: [
            { required: true, message: '经过修订不能为空', trigger: 'blur' }
          ],
          dataType: [
            { required: true, message: '数据类型不能为空', trigger: 'blur' }
          ],
          dataTypeName: [
            { required: true, message: '数据类型名称不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/web/financenews/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.date = data.financenews.date
                this.dataForm.time = data.financenews.time
                this.dataForm.weightiness = data.financenews.weightiness
                this.dataForm.countryCode = data.financenews.countryCode
                this.dataForm.countryName = data.financenews.countryName
                this.dataForm.content = data.financenews.content
                this.dataForm.previous = data.financenews.previous
                this.dataForm.predict = data.financenews.predict
                this.dataForm.currentValue = data.financenews.currentValue
                this.dataForm.columnCode = data.financenews.columnCode
                this.dataForm.revised = data.financenews.revised
                this.dataForm.dataType = data.financenews.dataType
                this.dataForm.dataTypeName = data.financenews.dataTypeName
                this.dataForm.createtime = data.financenews.createtime
                this.dataForm.updatetime = data.financenews.updatetime
                this.dataForm.flag = data.financenews.flag
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
              url: this.$http.adornUrl(`/web/financenews/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'date': this.dataForm.date,
                'time': this.dataForm.time,
                'weightiness': this.dataForm.weightiness,
                'countryCode': this.dataForm.countryCode,
                'countryName': this.dataForm.countryName,
                'content': this.dataForm.content,
                'previous': this.dataForm.previous,
                'predict': this.dataForm.predict,
                'currentValue': this.dataForm.currentValue,
                'columnCode': this.dataForm.columnCode,
                'revised': this.dataForm.revised,
                'dataType': this.dataForm.dataType,
                'dataTypeName': this.dataForm.dataTypeName,
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
