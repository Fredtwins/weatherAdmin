<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="栏目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <!-- <el-button v-if="isAuth('cm:column:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('cm:column:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="55"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="120"
        label="栏目名称">
      </el-table-column>
      <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        width="120"
        label="上级栏目">
      </el-table-column>
      <el-table-column
        prop="jumpType"
        header-align="center"
        align="center"
        width="130"
        label="跳转类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.jumpType === 1" size="small" type="success">普通目录</el-tag>
          <el-tag v-if="scope.row.jumpType === 2" size="small" type="info">a标签</el-tag>
          <el-tag v-if="scope.row.jumpType === 3" size="small" type="warning">a标签_blank</el-tag>
          <el-tag v-if="scope.row.jumpType === 4" size="small" type="danger">直接加载url信息</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" size="small" type="success">栏目</el-tag>
          <el-tag v-if="scope.row.type === 2" size="small" type="info">文章</el-tag>
          <el-tag v-if="scope.row.type === 3" size="small" type="warning">图片</el-tag>
          <el-tag v-if="scope.row.type === 4" size="small" type="danger">视频</el-tag>
          <el-tag v-if="scope.row.type === 5" size="small">其它</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="alias"
        header-align="center"
        align="center"
        label="别名（若name是中文则值为其拼音，否则同name）">
      </el-table-column> -->
      <!-- <el-table-column
        prop="modelPath"
        header-align="center"
        align="center"
        label="模板路径">
      </el-table-column> -->
      <el-table-column
        prop="jumpUrl"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="跳转地址">
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="菜单地址">
      </el-table-column>
      <el-table-column
        prop="siteId"
        header-align="center"
        align="center"
        label="所属网站">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUserId"
        header-align="center"
        align="center"
        label="创建者">
      </el-table-column>

      <!-- <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序">
      </el-table-column> -->

      <!-- <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column> -->

      <!-- <el-table-column
        prop="updateUserId"
        header-align="center"
        align="center"
        label="修改者编号">
      </el-table-column> -->

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './column-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/cm/column/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataListLoading = false
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/cm/column/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
