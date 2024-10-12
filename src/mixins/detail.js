export default {
    model: {
        prop: "visible",
        event: "visibleChange",
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        data: [Object, Array, Number, String],
    },
    data() {
        return {
            D: {},
        };
    },
    watch: {
        visible(e) {
            if (e && this.data === null) {
                this.$message.error("暂无详情");
                this.close();
            }
            if (e && this._getDetail) {
                this._getDetail(this.data).then((res) => {
                    this.D = res;
                });
            }
        },
    },
    computed: {
        R() {
            // return this.data || {};
            if (this._getDetail) {
                return this.D;
            } else {
                return this.data || {};
            }
        },
        isEdit() {
            return !!this.data;
        },

    },
    methods: {
        close() {
            // 关闭前
            this.beforeClose && this.beforeClose();
            if (this.$refs.form) {
                this.$nextTick(() => {
                    this.$refs.form.resetFields();
                });
            }
            this.D = {};
            this.$emit("visibleChange", false);
        }
    },
}