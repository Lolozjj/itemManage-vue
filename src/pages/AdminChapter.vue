<template>
    <div class="box" style="height:100%">
        <item-header></item-header>
        <el-row style="height:90%">
            <el-col :span="4" style="height:100%">
                <item-left></item-left>
            </el-col>
            <el-col :span="20" style="height:100%">
                <item-chapter></item-chapter>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import header from "../components/header.vue";
import leftMenu from "../components/leftMenu.vue";
import manageChapter from "../components/manageChapter.vue";
export default {
    name:"AdminChapter",
    data(){
        return {

        }
    },
    methods:{

    },
    components:{
        "item-header":header,
        "item-left":leftMenu,
        "item-chapter":manageChapter,
    }
    
}
</script>
<style scoped>

</style>