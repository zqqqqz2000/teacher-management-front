<template>
    <div class="login">
        <a-card style="width: 500px" class="login-container">
            <div class="container">
                <a-menu v-model="current" mode="horizontal">
                    <a-menu-item key="teacher">
                        <a-icon type="usergroup-delete" />
                        教师登录
                    </a-menu-item>
                    <a-menu-item key="hr">
                        <a-icon type="user" />
                        人事处登录
                    </a-menu-item>
                    <a-menu-item key="fancy">
                        <a-icon type="pay-circle" />
                        财务处登录
                    </a-menu-item>
                </a-menu>
                <div class="login-bar">
                    <a-input v-model="userName" placeholder="用户名">
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                    <a-input
                        v-model="passWord"
                        placeholder="密码"
                        type="password"
                    >
                        <a-icon type="key" slot="prefix" />
                    </a-input>
                    <a-button type="primary" @click="login()"> 登录 </a-button>
                </div>
            </div>
        </a-card>
        <a-modal :title="title" v-model="visible" @ok="hideModal">
            <p>{{ text }}</p>
        </a-modal>
    </div>
</template>


<script>
export default {
    name: "Admin",
    data: function () {
        return {
            current: ["teacher"],
            userName: "",
            passWord: "",
            visible: false,
            text: "",
            title: "",
        };
    },
    methods: {
        login: function () {
            if (this.current == "hr") {
                this.$axios({
                    url: "http://127.0.0.1:5000/hrlogin",
                    method: "post",
                    data: {
                        username: this.userName,
                        password: this.passWord,
                    },
                }).then((response) => {
                    let data = response.data;
                    if (data.success) {
                        this.$cookies.set("token", data.token);
                        this.$router.push("/hr-management/teacher");
                    } else {
                        this.title = "登录失败";
                        this.text = data.info;
                        this.visible = true;
                    }
                });
            } else if (this.current == "fancy") {
                this.$axios({
                    url: "http://127.0.0.1:5000/finance_login",
                    method: "post",
                    data: {
                        username: this.userName,
                        password: this.passWord,
                    },
                }).then((response) => {
                    let data = response.data;
                    if (data.success) {
                        this.$cookies.set("token", data.token);
                        this.$router.push("/finance-management");
                    } else {
                        this.title = "登录失败";
                        this.text = data.info;
                        this.visible = true;
                    }
                });
            } else if (this.current == "teacher") {
                this.$axios({
                    url: "http://127.0.0.1:5000/teacher_login",
                    method: "post",
                    data: {
                        username: this.userName,
                        password: this.passWord,
                    },
                }).then((response) => {
                    let data = response.data;
                    if (data.success) {
                        this.$cookies.set("token", data.token);
                        this.$router.push("/teacher-management");
                    } else {
                        this.title = "登录失败";
                        this.text = data.info;
                        this.visible = true;
                    }
                });
            }
        },
        hideModal() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/school.jpg");
    background-size: cover;
}
.login-bar {
    width: 100%;
}
.login-container:hover {
    opacity: 1;
}
.login-container {
    opacity: 0.9;
}
.login-bar > * {
    margin-top: 20px;
}
</style>