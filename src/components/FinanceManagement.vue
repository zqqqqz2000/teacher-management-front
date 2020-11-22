<template>
    <div>
        <a-table :columns="columns" :data-source="data">
            <span slot="operation" slot-scope="index, record">
                <a-button
                    type="primary"
                    size="small"
                    @click="approve(record.id)"
                    v-if="record.approve !== '已审批'"
                >
                    审批
                </a-button>
                <a-button
                    type="danger"
                    size="small"
                    @click="deleteSub(record.id)"
                >
                    删除
                </a-button>
            </span>
        </a-table>
    </div>
</template>

<script>
export default {
    name: "FinanceManagement",
    data() {
        return {
            data: [],
            columns: [
                {
                    title: "序号",
                    dataIndex: "id",
                    key: "id",
                },
                {
                    title: "教师",
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: "缺勤扣款",
                    dataIndex: "check_fine",
                    key: "check_fine",
                },
                {
                    title: "基本工资",
                    dataIndex: "basic_salary",
                    key: "basic_salary",
                },
                {
                    title: "奖金",
                    dataIndex: "bonus",
                    key: "bonus",
                },
                {
                    title: "扣税",
                    dataIndex: "tax",
                    key: "tax",
                },
                {
                    title: "备注",
                    dataIndex: "comment",
                    key: "comment",
                },
                {
                    title: "报送日期",
                    dataIndex: "date",
                    key: "date",
                },
                {
                    title: "已审阅",
                    dataIndex: "approve",
                    key: "approve",
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
        deleteSub(id) {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/delete_submission",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    id,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getSubmissions();
                }
            });
        },
        approve(id) {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/approve_submission",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    id,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getSubmissions();
                }
            });
        },
        getSubmissions() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/get_submission",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.data = data.submissions;
                }
            });
        },
    },
    created() {
        this.getSubmissions();
    },
};
</script>

<style>
</style>