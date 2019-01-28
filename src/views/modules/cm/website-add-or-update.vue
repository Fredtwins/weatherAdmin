<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="别名">
      <el-input v-model="dataForm.alias" placeholder="别名（若name是中文则值为其拼音，否则同name）"></el-input>
    </el-form-item>
    <el-form-item label="域名" prop="domain">
      <el-input v-model="dataForm.domain" placeholder="域名"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="关键字" prop="keyword">
      <el-input v-model="dataForm.keyword" placeholder="关键字"></el-input>
    </el-form-item>
    <el-form-item label="声明" prop="statement">
      <el-input v-model="dataForm.statement" placeholder="声明"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
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
          name: '',
          alias: '',
          domain: '',
          title: '',
          keyword: '',
          statement: '',
          description: '',
          sort: '',
          status: 1,
          createTime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '别名（若name是中文则值为其拼音，否则同name）不能为空', trigger: 'blur' }
          ],
          domain: [
            { required: true, message: '域名不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          keyword: [
            { required: true, message: '关键字不能为空', trigger: 'blur' }
          ],
          statement: [
            { required: true, message: '声明不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态  0：禁用   1：正常不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建者编号不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cm/website/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.name = data.website.name
                this.dataForm.alias = data.website.alias
                this.dataForm.domain = data.website.domain
                this.dataForm.title = data.website.title
                this.dataForm.keyword = data.website.keyword
                this.dataForm.statement = data.website.statement
                this.dataForm.description = data.website.description
                this.dataForm.sort = data.website.sort
                this.dataForm.status = data.website.status
                this.dataForm.createTime = data.website.createTime
                this.dataForm.createUserId = data.website.createUserId
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
              url: this.$http.adornUrl(`/cm/website/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'alias': this.dataForm.alias,
                'domain': this.dataForm.domain,
                'title': this.dataForm.title,
                'keyword': this.dataForm.keyword,
                'statement': this.dataForm.statement,
                'description': this.dataForm.description,
                'sort': this.dataForm.sort,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'createUserId': this.dataForm.createUserId
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
