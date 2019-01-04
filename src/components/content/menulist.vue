<template>
  <div class="content">
    <Content
      :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
      <!-- 查询，新增 -->
      <Form ref="formInline" :model="formInline" inline :label-width="60" id="mar">
        <div class="searchbutton">
          <button class="addbtn" @click="addBtn">新增</button>
        </div>
		  </Form>
      <!-- 表格 -->
      <div class="center table">
        <el-table
          border
          ref="filterTable"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="menuId"
            header-align="center"
            align="center"
            width="80"
            label="ID"
          >
          </el-table-column>
          <table-tree-column
            prop="name"
            header-align="center"
            treeKey="menuId"
            width="150"
            label="菜单名称"
          >
          </table-tree-column>
          <!-- <el-table-column
            prop="icon"
            label="图标"
            width="180"
            align="center">
            <template slot-scope="scope">
              <icon-svg :name="scope.row.icon || ''"></icon-svg>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="url"
            label="菜单url"
            align="center">
          </el-table-column>
          <el-table-column
            prop="perms"
            label="授权标识"
            align="center"
            :show-overflow-tooltip="true"
            >
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="排序号"
            :formatter="formatter"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
              <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
              <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Content>

    <template slot="content">
			<!--新增，修改-->
			<Modal v-model="modal1" class="modalj">
				<div slot="header" ref="inter">{{updateTitle}}</div>
				<Form :model="formItem" ref="formItem" :label-width="102">
					<Form-item label="菜单编号">
						<Input v-model="formItem.menu_id" placeholder="请输入菜单编号"></Input>
					</Form-item>
          <Form-item label="父菜单">
						<Input v-model="formItem.parent_id" placeholder="请输入父菜单：一级菜单为0"></Input>
					</Form-item>
          <Form-item label="菜单名称">
						<Input v-model="formItem.name" placeholder="请输入菜单名称"></Input>
					</Form-item>
          <Form-item label="菜单描述">
						<Input v-model="formItem.description" placeholder="请输入菜单描述"></Input>
					</Form-item>
          <Form-item label="菜单路径">
						<Input v-model="formItem.url" placeholder="请输入菜单路径"></Input>
					</Form-item>
          <Form-item label="授权标识">
						<Input v-model="formItem.perms" placeholder="请输入授权标识"></Input>
					</Form-item>
          <Form-item label="排序号">
						<Input v-model="formItem.order_num" placeholder="请输入排序号"></Input>
					</Form-item>
          <Form-item label="类型">
            <RadioGroup v-model="formItem.type">
              <Radio label="目录" true-value="0"></Radio>
              <Radio label="菜单" false-value="1"></Radio>
              <Radio label="按钮" false-value="2"></Radio>
            </RadioGroup>
					</Form-item>
				</Form>
				<div slot="footer">
					<Button class="footerbtn" v-if="btnSave" type="primary" @click="addclick('formItem')">保存</Button>
					<Button class="footerbtn" v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
				</div>
			</Modal>

			<!--确认删除  -->
			<Modal v-model="modal2" width="360">
				<p slot="header" style="color:red;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除</span>
				</p>
				<div style="text-align:center">
					<p>确认删除？</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long @click="dels">确认</Button>
				</div>
			</Modal>
		</template>
  </div>
</template>

<script>
import TableTreeColumn from 'components/content/tree-table/table-tree-column.vue'
import { ERR_OK } from "api/config";
import { GetmenuList, GetmenuAdd } from "api/home";

export default {
  components: {
    TableTreeColumn
  },
  data() {
    return {
      loading: false,
      tableData: [],
      formInline: {},
      formItem: {},
      modal2: false,
      modal1: false,
      updateTitle: '',
      btnSave: false,
      btnChange: false
    };
  },
  methods: {
    _GetmenuList() {
      GetmenuList().then(res => {
        this.tableData = this.treeDataTranslate(res, 'menuId')
      });
    },
    // 过滤字段组成联动树形表格
    treeDataTranslate (data, id = 'id', pid = 'parentId') {
      var res = []
      var temp = {}
      for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
      }
      for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
          if (!temp[data[k][pid]]['children']) {
            temp[data[k][pid]]['children'] = []
          }
          if (!temp[data[k][pid]]['_level']) {
            temp[data[k][pid]]['_level'] = 1
          }
          data[k]['_level'] = temp[data[k][pid]]._level + 1
          temp[data[k][pid]]['children'].push(data[k])
        } else {
          res.push(data[k])
        }
      }
      return res
    },
    // 编辑按钮
    handleEdit (index, val) {
      console.log(index)
      console.log(val)
    },
    // 修改成功
    changeNotice () {

    },
    // 删除按钮
    handleDelete (index, val) {
      console.log(index)
      console.log(val)
    },
    // 确认删除
    dels () {

    },
    // 新增
    addBtn () {
      this.modal1 = true
      this.updateTitle = '新增'
      this.btnSave = true
    },
    // 新增成功保存
    addclick () {

    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
  mounted() {
    this._GetmenuList();

  }
};
</script>

<style lang="scss" scoped>
.searchbutton {
  padding-left: 10px;
  > .addbtn {
    width: 60px;
    cursor: pointer;
  }
}
</style>
