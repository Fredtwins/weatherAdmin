<template>
  <div class="content">
    <Content
      :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
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
          <!-- <el-table-column
            prop="name"
            label="名称"
            width="180"
            align="center">
          </el-table-column> -->
          <table-tree-column
            prop="name"
            header-align="center"
            treeKey="menuId"
            width="150"
            label="菜单名称"
          >
          </table-tree-column>
          <el-table-column
            prop="icon"
            label="图标"
            width="180"
            align="center">
            <!-- <template slot-scope="scope">
              <icon-svg :name="scope.row.icon || ''"></icon-svg>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="url"
            label="菜单url"
            align="center">
          </el-table-column>
          <el-table-column
            prop="perms"
            label="授权标识"
            align="center">
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
              <el-tag
                :type="scope.row.type === '菜单' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.type}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Content>
  </div>
</template>

<script>
import TableTreeColumn from 'components/content/tree-table/table-tree-column.vue'
import { ERR_OK } from "api/config";
import { GetmenuList } from "api/home";

export default {
  components: {
    TableTreeColumn
  },
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  methods: {
    _GetmenuList() {
      GetmenuList().then(res => {
        this.tableData = res;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type === 1) {
            this.tableData[i].type = '菜单'
          } else if (this.tableData[i].type === 2) {
            this.tableData[i].type = '目录'
          } else if (this.tableData[i].type === 0) {
            this.tableData[i].type = '首页'
          }
        }
        console.log(this.tableData);
      });
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
</style>
