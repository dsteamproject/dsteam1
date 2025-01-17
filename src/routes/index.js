import { createWebHistory, createRouter } from "vue-router";

import App from '@/App'
import Menu1 from '@/components/Menu1'
import login from '@/components/login'
import join from '@/components/join'
import search from '@/components/search'

import airline from '@/components/airline'
import car from '@/components/car'
import car1 from '@/components/car1'
import carcontent from '@/components/carcontent'
import hotel from '@/components/hotel'
import hotelcontent from '@/components/hotelcontent'
import find from '@/components/find'
import board from '@/components/board'
import boardinfo from '@/components/info'
import boardfree from '@/components/free'
import boardreview from '@/components/review'
import boardque from '@/components/que'
import boardtravel from '@/components/travel'
import order from '@/components/order'
import mapdialog from '@/components/mapdialog'

import vs from '@/components/vs'
import vsseoul from '@/components/vsseoul'
import vscontent from '@/components/vscontent'
import vsplay from '@/components/vsplay'
import vsrank from '@/components/vsrank'
import findid from '@/components/id'
import findpw from '@/components/pw'
import freewrite from '@/components/freewrite'
import freecontent from '@/components/freecontent'
import travelcontent from '@/components/travelcontent'
import freechange from '@/components/freechange'
import mypage from '@/components/mypage'
import mypagemypw from '@/components/mypw'
import mypagemyinfo from '@/components/myinfo'
import mypagemyboard from '@/components/myboard'
import mypagemylike from '@/components/mylike'
import mypagemymap from '@/components/mymap'
import mypagemydel from '@/components/mydel'
import mypagetrvel from '@/components/mytravel'

import myfo from '@/components/mmfo'
import myho from '@/components/mmho'
import mytr from '@/components/mmtr'
import mbwrite from '@/components/mbwrite'
import mblike from '@/components/mblike'
import sample from '@/components/sample'
// admin

import Admin from '@/Admin';

import Barchart from '@/chart/BarChart';
import Header from '@/components/admin/Header';


import Dashboard from '@/components/admin/Dashboard';
import Board from '@/components/admin/Board';
import DetailPage from '@/components/admin/DetailPage';
import Writer from '@/components/admin/Writer';
import TempStorage from '@/components/admin/TempStorage';
import Customer from '@/components/admin/Customer';
import Trash from '@/components/admin/TrashData';
import VisitorCounter from '@/components/admin/VisitorCounter'

const routes = [
    {
        path: "/admin", name: "Admin", component: Admin,
        // 자식 컴포넌트
        children: [
            { path: "chart", name: "Barchart", component: Barchart },
            { path: "header", name: "Header", component: Header },
            { path: "dashboard", name: "Dashboard", component: Dashboard },
            { path: "board", name: "Board", component: Board },
            { path: "detailpage", name: "DetailPage", component: DetailPage },
            { path: "writer", name: "Writer", component: Writer },
            { path: "tempstorage", name: "TempStorage", component: TempStorage },
            { path: "customer", name: "Customer", component: Customer },
            { path: "trash", name: "Trash", component: Trash },
            { path: "visitor", name: "VisitorCounter", component: VisitorCounter },
        ]
    },
    {


        path: '/', name: "App", component: App, children: [

            {
                path: '/', name: "Menu1", component: Menu1
            },
            { path: '/login', name: "login", component: login, meta: { auth: true } },
            { path: '/sample', name: "sample", component: sample },
            { path: '/join', name: "join", component: join },
            { path: '/search', name: "search", component: search },

            { path: '/airline', name: "airline", component: airline },
            { path: '/order', name: "order", component: order },

            { path: '/mapdialog', name: "mapdialog", component: mapdialog },
            { path: '/car', name: "car", component: car },
            { path: '/car1', name: "car1", component: car1 },
            { path: '/carcontent', name: "carcontent", component: carcontent },
            { path: '/freewrite', name: "freewrite", component: freewrite, meta: { auth2: true }, },
            { path: '/freecontent', name: "freecontent", component: freecontent },
            { path: '/travelcontent', name: "travelcontent", component: travelcontent },
            { path: '/freechange', name: "freechange", component: freechange, meta: { auth2: true } },

            {
                path: '/vs', name: "vs", component: vs, children: [
                    { path: '/vs/vsrank', component: vsrank },
                    { path: '/vs/vsplay', component: vsplay },
                ]
            },

            { path: '/vsseoul', name: "vsseoul", component: vsseoul },
            { path: '/vscontent', name: "vscontent", component: vscontent },
            { path: '/hotel', name: "hotel", component: hotel },
            { path: '/hotelcontent', name: "hotelcontent", component: hotelcontent },
            {
                path: '/find', name: "find", component: find, meta: { auth: true },
                children: [
                    { path: '/find/id', component: findid },
                    { path: '/find/pw', component: findpw }
                ]
            },
            {
                path: '/board', name: "board", component: board,
                children: [
                    { path: '/board/info', component: boardinfo },
                    { path: '/board/free', component: boardfree },
                    { path: '/board/review', component: boardreview },
                    { path: '/board/que', component: boardque },
                    { path: '/board/travel', component: boardtravel },
                ]
            },
            {
                path: '/mypage', name: "mypage", component: mypage, meta: { auth2: true },
                children: [
                    { path: '/mypage/mypw', component: mypagemypw },
                    { path: '/mypage/myinfo', name: "mypagemyinfo", component: mypagemyinfo },
                    {
                        path: '/mypage/myboard', component: mypagemyboard,
                        children: [
                            { path: '/mypage/myboard/mbwrite', component: mbwrite },
                            { path: '/mypage/myboard/mblike', component: mblike },
                        ]
                    },
                    {
                        path: '/mypage/mylike', component: mypagemylike,
                        children: [
                            { path: '/mypage/mylike/mmtr', component: mytr },
                            { path: '/mypage/mylike/mmho', component: myho },
                            { path: '/mypage/mylike/mmfo', component: myfo },
                        ]
                    },
                    { path: '/mypage/mymap', component: mypagemymap },
                    { path: '/mypage/mydel', component: mypagemydel },
                    { path: '/mypage/mytravel', component: mypagetrvel },
                ]
            },

        ]
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        window.scrollTo(0, 0);
    }
});

router.beforeEach(function (to, from, next) {
    const token = sessionStorage.getItem("TOKEN");
    if (to.meta.auth && token !== null) { // 로그인시 막기
        console.log(from);
        next('/')
        return;
    }
    if (to.meta.auth2 && token === null) {  //비로그인시 막기
        console.log("잘못된 접근입니다");
        next('/')
        return;
    }
    next();
})
export default router;
