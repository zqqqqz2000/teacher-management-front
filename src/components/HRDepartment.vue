<template>
    <div>
        <a-table :data-source="departments" :columns="departmentColumns">
            <span slot="operation" slot-scope="index, record">
                <a-button
                    type="danger"
                    size="small"
                    @click="deleteDepartment(record.id)"
                >
                    删除
                </a-button>
            </span>
        </a-table>
        <a-button type="primary" @click="addDepartmentShow = true">
            增加学院
        </a-button>
        <a-modal
            v-model="addDepartmentShow"
            title="增加学院"
            @ok="addDepartment()"
        >
            <a-form-model-item label="学院名称">
                <a-input v-model="form.name" />
            </a-form-model-item>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "HRDepartment",
    data() {
        return {
            addDepartmentShow: false,
            form: {},
            departments: [],
            departmentColumns: [
                {
                    dataIndex: "id",
                    key: "id",
                    title: "序号",
                },
                {
                    dataIndex: "name",
                    key: "name",
                    title: "部门名",
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    scopedSlots: { customRender: "operation" },
                },
            ],
        };
    },
    methods: {
        deleteDepartment(id) {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/del_department",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    id,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getDepartment();
                }
            });
        },
        getDepartment() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/get_department",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.departments = data.departments;
                }
            });
        },
        addDepartment() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/add_department",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    name: this.form.name,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getDepartment();
                    this.addDepartmentShow = false;
                }
            });
        },
    },
    created() {
        this.getDepartment();
    },
};
</script>

<style scoped>
</style>
