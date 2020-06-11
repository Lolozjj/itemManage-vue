import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/AdminUser',
            component: resolve => require(['../pages/AdminUser.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'AdminUser'
        },
        {
            path: '/AdminCourse',
            component: resolve => require(['../pages/AdminCourse.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'AdminCourse'
        },
        {
            path: '/AdminChapter',
            component: resolve => require(['../pages/AdminChapter.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'AdminChapter'
        },
        {
            path: '/AdminChoose',
            component: resolve => require(['../pages/AdminChoose.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'AdminChoose'
        },
        {
            path: '/AddTest',
            component: resolve => require(['../pages/AddTest.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'AddTest'
        },
        {
            path: '/Login',
            component: resolve => require(['../pages/Login.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Login'
        },
        {
            path: '/',
            component: resolve => require(['../pages/Login.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Login'
        },
        {
            path: '/Noauth',
            component: resolve => require(['../pages/Noauth.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Noauth'
        },
        {
            path: '/TeacherCourse',
            component: resolve => require(['../pages/TeacherCoures.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'TeacherCourse'
        },
        {
            path: '/TeacherStudent',
            component: resolve => require(['../pages/TeacherStudent.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'TeacherStudent'
        },
    ]
})