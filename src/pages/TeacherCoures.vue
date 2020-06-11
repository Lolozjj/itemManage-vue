<template>
    <div class="box" style="height:100%">
        <item-header></item-header>
        <el-row style="height:90%">
            <el-col :span="4" style="height:100%">
                <item-left></item-left>
            </el-col>
            <el-col :span="20" style="height:100%;background: gainsboro;">
                
                 <div class="page">
                    <item-course></item-course>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import header from "../components/header.vue";
import teacherMenu from "../components/teacherMenu.vue";
import teacherCourse from "../components/teacherCourse.vue";
export default {
    name:"TeacherCourse",
    data(){
        return {

        }
    },
    methods:{

    },
    components:{
        "item-header":header,
        "item-left":teacherMenu,
        "item-course":teacherCourse,
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