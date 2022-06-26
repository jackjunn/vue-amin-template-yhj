<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增用户
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading...." border fit highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.roles }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remarks }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer :title="textMap[dialogStatus]" :visible.sync="drawerFormVisible" direction="rtl">
      <div class="demo-drawer__content">
        <el-form :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="temp.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="temp.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="temp.roles" class="filter-item" placeholder="Please select">
              <el-option v-for="item in rolesOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="temp.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="text-align: center;">
          <el-button @click="drawerFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
            确定
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getList, createArticle, updateArticle } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      temp: {
        id: undefined,
        name: '',
        age: '',
        roles: '',
        remarks: '我是新员工'
      },
      drawerFormVisible: false,
      dialogStatus: '',
      formLabelWidth: '80px',
      textMap: {
        update: '修改用户信息',
        create: '新增用户信息'
      },
      rolesOptions: ['用户', '管理员', '超级管理员']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list = response.data.items
        this.listLoading = false
      })
    },

    // 编辑行
    handleEdit(index, row) {
      this.temp = Object.assign({}, row)
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.drawerFormVisible = true
    },

    // 删除一行
    handleDelete(index, row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },

    // 更新员工信息
    updateData() {
      const tempData = Object.assign({}, this.temp)
      updateArticle(tempData).then((res) => {
        console.log(res)
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.drawerFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },

    // 重置员工模板
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        age: '',
        remarks: ''
      }
    },

    // 新增用户
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.drawerFormVisible = true
    },

    // 创建用户信息
    createData() {
      this.temp.id = this.list.length + 1
      createArticle(this.temp).then((res) => {
        console.log(res)
        this.list.unshift(this.temp)
        this.drawerFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
