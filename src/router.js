import Admin from './components/Admin'
import HRManagement from './components/HRManagement'
import HRTeacher from './components/HRTeacher'
import HRDepartment from './components/HRDepartment'
import HRSubmission from './components/HRSubmission'
import FinanceManagement from './components/FinanceManagement'
import TeacherManagement from './components/TeacherManagement'


export default {
    name: 'routes',
    routes: [
        {
            path: '/',
            component: Admin,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/hr-management',
            component: HRManagement,
            meta: {
                title: '人事处管理'
            },
            children: [
                {
                    path: 'teacher',
                    component: HRTeacher,
                    meta: {
                        title: '人事处管理-教师'
                    }
                },
                {
                    path: 'department',
                    component: HRDepartment,
                    meta: {
                        title: '人事处管理-部门'
                    }
                },
                {
                    path: 'submission',
                    component: HRSubmission,
                    meta: {
                        title: '人事处管理-报送'
                    }
                }
            ],
        },
        {
            path: '/finance-management',
            component: FinanceManagement,
            meta: {
                title: '财务管理'
            }
        },
        {
            path: '/teacher-management',
            component: TeacherManagement,
            meta: {
                title: '教师管理'
            }
        }
    ]
}