const shiroCheck = (msg, that) => {
    if (msg.error == "请先登录") {
        const loading = that.$loading({
            lock: true,
            text: "请先登录",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
            loading.close();
            that.$router.push({ path: "Login" });
        }, 20);
    } else if (msg.error == "无授权") {
        const loading = that.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
            loading.close();
            that.$router.push({ path: "Login" });
        }, 20);
    } else {
        that.$message({
            type: "error",
            message: msg.error
        });
    }
};

export {
    shiroCheck,
}