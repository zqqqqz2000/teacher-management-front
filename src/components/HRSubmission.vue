<template>
    <div>
        <a-form-item label="报送签到记录的日期范围">
            <a-range-picker @change="onChange" />
        </a-form-item>
        <a-form-item label="基本工资">
            <a-input v-model="form.basic_salary"></a-input>
        </a-form-item>
        <a-form-item label="奖金">
            <a-input v-model="form.bonus"></a-input>
        </a-form-item>
        <a-form-item label="税率">
            <a-input v-model="form.tax"></a-input>
        </a-form-item>
        <a-form-item label="备注">
            <a-textarea v-model="form.comment"></a-textarea>
        </a-form-item>
        <a-button type="primary" @click="submission"> 报送 </a-button>
        <a-modal title="报送情况" v-model="infoShow" @ok="infoShow = false">
            <div v-for="(info_, index) of info" :key="index">
                {{ info_ }}
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "HRSubmission",
    data() {
        return {
            form: { token: this.$cookies.get("token") },
            info: "",
            infoShow: false,
        };
    },
    methods: {
        submission() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:5000/submission",
                withCredentials: true,
                data: this.form,
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.info = data.info;
                    this.infoShow = true;
                }
            });
        },
        onChange(_, str) {
            this.form.range = str;
        },
    },
};
</script>

<style>
input,
textarea {
    max-width: 500px !important;
}
</style>