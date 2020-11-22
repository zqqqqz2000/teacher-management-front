<template>
    <div>
        <a-menu v-model="current" mode="horizontal">
            <a-menu-item key="info">
                <a-icon type="usergroup-delete" />
                个人信息
            </a-menu-item>
            <a-menu-item key="check">
                <a-icon type="user" />
                考勤记录
            </a-menu-item>
            <a-menu-item key="salary">
                <a-icon type="pay-circle" />
                工资条
            </a-menu-item>
        </a-menu>
        <!-- 个人信息 -->
        <div v-if="current == 'info'">
            <div v-for="(info, index) of teachersInfo.teachers" :key="index">
                <div>用户名: {{ info.username }}</div>
                <div>年龄: {{ info.age }}</div>
                <div>部门: {{ info.department }}</div>
                <div>学历: {{ info.education }}</div>
                <div>入职日期: {{ info.hiredate }}</div>
                <div>已婚: {{ info.marry }}</div>
                <div>职称: {{ info.title }}</div>
            </div>
        </div>
        <!-- 考勤 -->
        <div v-if="current == 'check'" class="check">
            <div v-for="(check, index) of teachersInfo.checks" :key="index">
                <div>是否签到: {{ check.check }}</div>
                <div>签到日期: {{ check.date }}</div>
            </div>
        </div>
        <!-- 工资 -->
        <div v-if="current == 'salary'">
            <div
                v-for="(salary, index) of teachersInfo.salary"
                :key="index"
                class="salary"
            >
                <div>基本工资: {{ salary.basic_salary }}</div>
                <div>奖金: {{ salary.bonus }}</div>
                <div>缺勤罚款: {{ salary.check_fine }}</div>
                <div>税率: {{ salary.tax }}</div>
                <div>下发日期: {{ salary.date }}</div>
                <div>
                    总金额:
                    {{
                        (
                            (salary.basic_salary +
                                salary.bonus +
                                salary.tax -
                                salary.check_fine) *
                            (1 - salary.tax)
                        ).toFixed(2)
                    }}
                </div>
                <div>备注: {{ salary.comment }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TeacherManagement",
    data() {
        return {
            teachersInfo: [],
            current: "info",
        };
    },
    methods: {
        getTeacherInfo() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/teacher_info",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                this.teachersInfo = data.infos;
            });
        },
    },
    created() {
        this.getTeacherInfo();
    },
};
</script>

<style>
.salary > div,
.check > div {
    display: inline-block;
    width: 160px;
}
</style>