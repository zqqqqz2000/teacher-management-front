<template>
    <div>
        <div>
            <a-form-model-item label="复杂查询" class="searcher">
                <a-input v-model="searcher.name" placeholder="姓名" />
                <a-input v-model="searcher.title" placeholder="头衔" />
                <a-input v-model="searcher.age" placeholder="年龄" />
                <a-input v-model="searcher.username" placeholder="用户名" />
                <a-button @click="search()">查询</a-button>
            </a-form-model-item>
        </div>
        <a-table :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="operation" slot-scope="index, record">
                <a-button
                    v-if="record.status === '在职'"
                    type="primary"
                    size="small"
                    @click="approve(record.id)"
                >
                    辞退
                </a-button>
            </span>
        </a-table>
        <a-button type="primary" @click="addTeacherShow = true">
            增加教师
        </a-button>
        <a-button @click="checkShow = true" style="margin-left: 7px">
            发起考勤
        </a-button>
        <a-modal v-model="checkShow" title="考勤" @ok="check()">
            <div>
                <a-date-picker @change="dateChange" placeholder="考勤日期" />
            </div>
            <a-card
                style="width: 90px; text-align: center; cursor: pointer"
                v-for="teacher of data"
                :key="teacher.id"
                :class="{
                    't-card': true,
                    't-check': teacher.check,
                }"
                @click="teacher.check = !teacher.check"
            >
                {{ teacher.name }}
                <br />
                <a-icon type="user" />
            </a-card>
        </a-modal>
        <a-modal title="增加教师" v-model="addTeacherShow" @ok="onSubmit">
            <a-form-model :model="form">
                <a-form-model-item label="教师姓名">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="用户名">
                    <a-input v-model="form.username" />
                </a-form-model-item>
                <a-form-model-item label="密码">
                    <a-input v-model="form.password" type="password" />
                </a-form-model-item>
                <a-form-model-item label="年龄">
                    <a-input v-model="form.age" />
                </a-form-model-item>
                <a-form-model-item label="学历">
                    <a-select v-model="form.education" placeholder="请选择学历">
                        <a-select-option value="本科"> 本科 </a-select-option>
                        <a-select-option value="硕士"> 硕士 </a-select-option>
                        <a-select-option value="博士"> 博士 </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="职称">
                    <a-select v-model="form.title" placeholder="请选择职称">
                        <a-select-option value="教授"> 教授 </a-select-option>
                        <a-select-option value="副教授">
                            副教授
                        </a-select-option>
                        <a-select-option value="讲师"> 讲师 </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="学院">
                    <a-select v-model="form.did" placeholder="请选择学院">
                        <a-select-option
                            v-for="department of departments"
                            :key="department.id"
                            :value="department.id"
                        >
                            {{ department.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="入职时间">
                    <a-date-picker
                        v-model="form.hiredate"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                </a-form-model-item>
                <a-form-model-item label="性别">
                    <a-switch v-model="form.gender" />
                    {{ form.gender ? "男" : "女" }}
                </a-form-model-item>
                <a-form-model-item label="婚姻情况">
                    <a-switch v-model="form.marry" />
                    {{ form.marry ? "已婚" : "未婚" }}
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "HRTeacher",
    data() {
        return {
            searcher: { token: this.$cookies.get("token") },
            data: [],
            departments: [],
            checkDate: "",
            columns: [
                {
                    dataIndex: "id",
                    key: "id",
                    title: "序号",
                },
                {
                    dataIndex: "name",
                    key: "name",
                    title: "姓名",
                },
                {
                    dataIndex: "username",
                    key: "username",
                    title: "用户名",
                },
                {
                    dataIndex: "age",
                    key: "age",
                    title: "年龄",
                },
                {
                    dataIndex: "title",
                    key: "title",
                    title: "头衔",
                },
                {
                    dataIndex: "marry",
                    key: "marry",
                    title: "已婚",
                },
                {
                    dataIndex: "department",
                    key: "department",
                    title: "院系",
                },
                {
                    dataIndex: "hiredate",
                    key: "hiredate",
                    title: "入职日期",
                },
                {
                    dataIndex: "status",
                    key: "status",
                    title: "入职状态",
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    scopedSlots: { customRender: "operation" },
                },
            ],
            form: { token: this.$cookies.get("token") },
            addTeacherShow: false,
            checkShow: false,
        };
    },
    methods: {
        search() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/searcher",
                withCredentials: true,
                data: this.searcher,
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    let res = [];
                    let data = response.data;
                    for (let teacher of data.teachers) {
                        teacher.check = false;
                        res.push(teacher);
                    }
                    this.data = res;
                }
            });
        },
        dateChange(_, dateString) {
            this.checkDate = dateString;
        },
        check() {
            for (let t of this.data) {
                t.date = this.checkDate;
            }
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/teacher_check",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    teachers: this.data,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.checkShow = false;
                }
            });
        },
        onSubmit: function () {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/add_teacher",
                withCredentials: true,
                data: this.form,
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getDepartment();
                    this.getTeacher();
                    this.addTeacherShow = false;
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
        getTeacher() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/get_teacher",
                withCredentials: true,
                data: this.form,
            }).then((response) => {
                let res = [];
                let data = response.data;
                for (let teacher of data.teacher) {
                    teacher.check = false;
                    res.push(teacher);
                }
                this.data = res;
            });
        },
    },
    created() {
        this.getTeacher();
        this.getDepartment();
    },
};
</script>

<style scoped>
.t-card:hover {
    background: cornsilk;
}
.t-check {
    background: greenyellow;
}
.t-card {
    font-size: 10px;
    display: inline-block;
}
.searcher input {
    display: inline-block;
    width: 200px;
}
</style>
