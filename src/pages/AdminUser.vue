<template>
    <div class="box" style="height:100%">
        <item-header></item-header>
        <el-row style="height:90%">
            <el-col :span="4" style="height:100%">
                <item-left></item-left>
            </el-col>
            <el-col :span="20" style="height:100%;background: gainsboro;">
                <div class="page">
                    <item-user></item-user>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import header from "../components/header.vue";
import leftMenu from "../components/leftMenu.vue";
import manageUser from "../components/manageUser.vue";
export default {
    name:"AdminUser",
    data(){
        return {

        }
    },
    methods:{

    },
    components:{
        "item-header":header,
        "item-left":leftMenu,
        "item-user":manageUser,
    }
    
}
</script>
<style scoped>
.page{
    background: rgb(255, 255, 255);
    margin: 10px 20px 10px 20px;
    border-radius:4px ;
}
</style>