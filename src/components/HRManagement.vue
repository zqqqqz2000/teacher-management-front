<template>
    <a-layout id="components-layout-demo-responsive" class="lay">
        <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
            @collapse="onCollapse"
            @breakpoint="onBreakpoint"
        >
            <div class="tit">人事管理</div>
            <a-menu
                theme="dark"
                mode="inline"
                :default-selected-keys="['teacher']"
                @select="onSelect"
            >
                <a-menu-item key="teacher">
                    <a-icon type="user" />
                    <span class="nav-text">教师管理</span>
                </a-menu-item>
                <a-menu-item key="department">
                    <a-icon type="bank" />
                    <span class="nav-text">学院管理</span>
                </a-menu-item>
                <a-menu-item key="submission">
                    <a-icon type="upload" />
                    <span class="nav-text">工资报送</span>
                </a-menu-item>
                <a-menu-item key="logout">
                    <a-icon type="logout" />
                    <span class="nav-text">退出登录</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="{ background: '#fff', padding: 0 }" />
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <div
                    :style="{
                        padding: '24px',
                        background: '#fff',
                        minHeight: '360px',
                    }"
                >
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer style="textalign: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
    name: "HRManagement",
    data: function () {
        return {
            menuMap: {
                teacher: "/hr-management/teacher",
                department: "/hr-management/department",
                logout: "/",
                submission: "/hr-management/submission",
            },
        };
    },
    methods: {
        onCollapse(collapsed, type) {
            console.log(collapsed, type);
        },
        onBreakpoint(broken) {
            console.log(broken);
        },
        onSelect(item) {
            if (
                this.menuMap[item.key] &&
                this.menuMap[item.key] !== this.$route.path
            )
                this.$router.push(this.menuMap[item.key]);
        },
    },
};
</script>

<style>
#components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
.tit {
    font-size: 30px;
    color: white;
    text-align: center;
    margin-top: 20px;
}
.lay {
    width: 100vw;
    height: 100vh;
}
</style>