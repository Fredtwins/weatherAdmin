<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账户名称" prop="accountName">
      <el-input v-model="dataForm.accountName" placeholder="账户名称"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="account">
      <el-input v-model="dataForm.account" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="账户类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="账户类型"></el-input>
    </el-form-item>
    <el-form-item label="交易平台" prop="tradingPlatform">
      <el-input v-model="dataForm.tradingPlatform" placeholder="交易平台"></el-input>
    </el-form-item>
    <el-form-item label="交易起始日期" prop="starttime">
      <el-input v-model="dataForm.starttime" placeholder="交易起始日期"></el-input>
    </el-form-item>
    <el-form-item label="最后更新时间" prop="endtime">
      <el-input v-model="dataForm.endtime" placeholder="最后更新时间"></el-input>
    </el-form-item>
    <el-form-item label="年化收益" prop="yearGet">
      <el-input v-model="dataForm.yearGet" placeholder="年化收益"></el-input>
    </el-form-item>
    <el-form-item label="月化收益" prop="monthGet">
      <el-input v-model="dataForm.monthGet" placeholder="月化收益"></el-input>
    </el-form-item>
    <el-form-item label="总盈亏额" prop="totalGet">
      <el-input v-model="dataForm.totalGet" placeholder="总盈亏额"></el-input>
    </el-form-item>
    <el-form-item label="总入金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="总入金额"></el-input>
    </el-form-item>
    <el-form-item label="账户余额" prop="lastAmount">
      <el-input v-model="dataForm.lastAmount" placeholder="账户余额"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="策略" prop="strategy">
      <el-input v-model="dataForm.strategy" placeholder="策略"></el-input>
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
    <el-form-item label="年收益*数字" prop="yearGetNum">
      <el-input v-model="dataForm.yearGetNum" placeholder="年收益*数字"></el-input>
    </el-form-item>
    <el-form-item label="月收益*数字" prop="monthGetNum">
      <el-input v-model="dataForm.monthGetNum" placeholder="月收益*数字"></el-input>
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
          accountName: '',
          account: '',
          type: '',
          tradingPlatform: '',
          starttime: '',
          endtime: '',
          yearGet: '',
          monthGet: '',
          totalGet: '',
          amount: '',
          lastAmount: '',
          status: '',
          strategy: '',
          createtime: '',
          updatetime: '',
          flag: '',
          yearGetNum: '',
          monthGetNum: ''
        },
        dataRule: {
          accountName: [
            { required: true, message: '账户名称不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '账户类型不能为空', trigger: 'blur' }
          ],
          tradingPlatform: [
            { required: true, message: '交易平台不能为空', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '交易起始日期不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '最后更新时间不能为空', trigger: 'blur' }
          ],
          yearGet: [
            { required: true, message: '年化收益不能为空', trigger: 'blur' }
          ],
          monthGet: [
            { required: true, message: '月化收益不能为空', trigger: 'blur' }
          ],
          totalGet: [
            { required: true, message: '总盈亏额不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '总入金额不能为空', trigger: 'blur' }
          ],
          lastAmount: [
            { required: true, message: '账户余额不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          strategy: [
            { required: true, message: '策略不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatetime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          flag: [
            { required: true, message: '标记号（0：无效 1： 有效，默认有效）不能为空', trigger: 'blur' }
          ],
          yearGetNum: [
            { required: true, message: '年收益*数字不能为空', trigger: 'blur' }
          ],
          monthGetNum: [
            { required: true, message: '月收益*数字不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/web/profit/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.accountName = data.profit.accountName
                this.dataForm.account = data.profit.account
                this.dataForm.type = data.profit.type
                this.dataForm.tradingPlatform = data.profit.tradingPlatform
                this.dataForm.starttime = data.profit.starttime
                this.dataForm.endtime = data.profit.endtime
                this.dataForm.yearGet = data.profit.yearGet
                this.dataForm.monthGet = data.profit.monthGet
                this.dataForm.totalGet = data.profit.totalGet
                this.dataForm.amount = data.profit.amount
                this.dataForm.lastAmount = data.profit.lastAmount
                this.dataForm.status = data.profit.status
                this.dataForm.strategy = data.profit.strategy
                this.dataForm.createtime = data.profit.createtime
                this.dataForm.updatetime = data.profit.updatetime
                this.dataForm.flag = data.profit.flag
                this.dataForm.yearGetNum = data.profit.yearGetNum
                this.dataForm.monthGetNum = data.profit.monthGetNum
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
              url: this.$http.adornUrl(`/web/profit/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'accountName': this.dataForm.accountName,
                'account': this.dataForm.account,
                'type': this.dataForm.type,
                'tradingPlatform': this.dataForm.tradingPlatform,
                'starttime': this.dataForm.starttime,
                'endtime': this.dataForm.endtime,
                'yearGet': this.dataForm.yearGet,
                'monthGet': this.dataForm.monthGet,
                'totalGet': this.dataForm.totalGet,
                'amount': this.dataForm.amount,
                'lastAmount': this.dataForm.lastAmount,
                'status': this.dataForm.status,
                'strategy': this.dataForm.strategy,
                'createtime': this.dataForm.createtime,
                'updatetime': this.dataForm.updatetime,
                'flag': this.dataForm.flag,
                'yearGetNum': this.dataForm.yearGetNum,
                'monthGetNum': this.dataForm.monthGetNum
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
