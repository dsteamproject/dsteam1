<template>
  <div class="app">
    <div class="wrap">
      <div class="topbg"></div>

      <div class="content">
        <div class="topcontent">
          <router-link to="/mypage/mypw" @click="changeMenu(0)" :class="btn1"
            >암호변경</router-link
          >
          <router-link to="/mypage/myinfo" @click="changeMenu(1)" :class="btn2"
            >정보변경</router-link
          >
          <router-link
            to="/mypage/myboard/mbwrite"
            @click="changeMenu(2)"
            :class="btn3"
            >게시물</router-link
          >
          <router-link
            to="/mypage/mylike/mmtr"
            @click="changeMenu(3)"
            :class="btn4"
            >위시리스트</router-link
          >
          <router-link to="/mypage/mymap" @click="changeMenu(4)" :class="btn5"
            >지도요청</router-link
          >
          <router-link to="/mypage/mydel" @click="changeMenu(5)" :class="btn6"
            >회원탈퇴</router-link
          >
        </div>
        <div class="maincontent">
          <div class="left">
            <div class="profile">
              <div class="sqwrap">
                <div class="square" @click="gomypage">
                  <img
                    v-if="this.chk.name === undefinded"
                    :src="`//127.0.0.1:8080/REST/mypage/select_image?id=${this.list.id}`"
                    class="myimg"
                  />
                  <img
                    v-if="this.chk.name !== undefinded"
                    :src="uploadImageFile"
                    width="90px"
                    height="90px"
                    class="myimg"
                  />
                </div>

                <button class="imgbtn">
                  <el-icon style="font-size: 20px">
                    <camera />
                  </el-icon>
                </button>
                <div class="filebox">
                  <label for="file" class="imgbtn">
                    <el-icon style="font-size: 20px; vertical-align: -12px">
                      <camera /> </el-icon
                  ></label>
                  <input
                    type="file"
                    id="file"
                    accept=".jpg,.jpeg,.png,.gif,.bmp"
                    @change="onFileSelected($event)"
                  />
                </div>
              </div>
              <p class="namet">
                <span class="name">{{ this.list.nicname }}</span> 님<br />
                <span class="rank">개인회원</span>
              </p>
              <span class="whatlogin">페이스북으로 로그인중</span><br />
              <button class="logout">로그아웃</button>
            </div>
          </div>
          <div class="right">
            <router-view
              @chmenu="chmenu"
              @changeLogged="changeLogged"
            ></router-view>
          </div>
        </div>
      </div>
      <div class="both"></div>
    </div>
  </div>
</template>

<script>
import { Camera } from "@element-plus/icons";
import axios from "axios";

export default {
  async created() {
      this.$emit("searchon", true);
    const url = `/REST/mypage/home`;
    const headers = { "Content-type": "application/json", token: this.token };
    const response = await axios.get(url, { headers });
    console.log(response);
    this.list = response.data.member;

    // ========================================================

    // ========================================================
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (currentPath === "/mypage") {
      this.$router.push({ path: "/mypage/mypw" });
    }
    if (currentPath === "/mypage/mypw" || currentPath === "/mypage") {
      this.btn1 = "btn2";
      this.btn2 = "btn1";
      this.btn3 = "btn1";
      this.btn4 = "btn1";
      this.btn5 = "btn1";
      this.btn6 = "btn1";
    }
    if (currentPath === "/mypage/myinfo") {
      this.btn1 = "btn1";
      this.btn2 = "btn2";
      this.btn3 = "btn1";
      this.btn4 = "btn1";
      this.btn5 = "btn1";
      this.btn6 = "btn1";
    }
    if (
      currentPath === "/mypage/myboard/mbwrite" ||
      currentPath === "/mypage/myboard/mblike"
    ) {
      this.btn1 = "btn1";
      this.btn2 = "btn1";
      this.btn3 = "btn2";
      this.btn4 = "btn1";
      this.btn5 = "btn1";
      this.btn6 = "btn1";
    }
    if (
      currentPath === "/mypage/mylike/mmtr" ||
      currentPath === "/mypage/mylike/mmho"
    ) {
      this.btn1 = "btn1";
      this.btn2 = "btn1";
      this.btn3 = "btn1";
      this.btn4 = "btn2";
      this.btn5 = "btn1";
      this.btn6 = "btn1";
    }
    if (currentPath === "/mypage/mymap") {
      this.btn1 = "btn1";
      this.btn2 = "btn1";
      this.btn3 = "btn1";
      this.btn4 = "btn1";
      this.btn5 = "btn2";
      this.btn6 = "btn1";
    }
    if (currentPath === "/mypage/mydel") {
      this.btn1 = "btn1";
      this.btn2 = "btn1";
      this.btn3 = "btn1";
      this.btn4 = "btn1";
      this.btn5 = "btn1";
      this.btn6 = "btn2";
    }
  },
  components: {
    Camera,
  },
  data() {
    return {
      uploadImageFile: [],
      chk: [],
      btn1: "btn1",
      btn2: "btn1",
      btn3: "btn1",
      btn4: "btn1",
      btn5: "btn1",
      btn6: "btn1",
      menu: "",
      token: sessionStorage.getItem("TOKEN"),
      list: [],
    };
  },

  methods: {
    changeLogged() {
      this.$emit("changeLogged", false);
    },
    chmenu(val) {
      console.log(val);
      if (val === 1) {
        this.btn1 = "btn2";
        this.btn2 = "btn1";
        this.btn3 = "btn1";
        this.btn4 = "btn1";
        this.btn5 = "btn1";
        this.btn6 = "btn1";
      }
    },
    async onFileSelected(event) {
      var input = event.target;
      console.log(this.uploadImageFile);
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.uploadImageFile = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.chk = input.files[0];

        console.log(this.chk);
        const url = `/REST/mypage/insertMemberImg`;
        const headers = {
          "Content-Type": "multipart/form-data",
          token: this.token,
        };
        const body = new FormData();
        body.append("file", this.chk);

        const response = await axios.put(url, body, { headers });
        console.log(response);
      }
    },

    changeMenu(val) {
      console.log(val);

      if (val === 0) {
        this.btn1 = "btn2";
        this.btn2 = "btn1";
        this.btn3 = "btn1";
        this.btn4 = "btn1";
        this.btn5 = "btn1";
        this.btn6 = "btn1";
      }
      if (val === 1) {
        this.btn1 = "btn1";
        this.btn2 = "btn2";
        this.btn3 = "btn1";
        this.btn4 = "btn1";
        this.btn5 = "btn1";
        this.btn6 = "btn1";
      }
      if (val === 2) {
        this.btn1 = "btn1";
        this.btn2 = "btn1";
        this.btn3 = "btn2";
        this.btn4 = "btn1";
        this.btn5 = "btn1";
        this.btn6 = "btn1";
      }
      if (val === 3) {
        this.btn1 = "btn1";
        this.btn2 = "btn1";
        this.btn3 = "btn1";
        this.btn4 = "btn2";
        this.btn5 = "btn1";
        this.btn6 = "btn1";
      }
      if (val === 4) {
        this.btn1 = "btn1";
        this.btn2 = "btn1";
        this.btn3 = "btn1";
        this.btn4 = "btn1";
        this.btn5 = "btn2";
        this.btn6 = "btn1";
      }
      if (val === 5) {
        this.btn1 = "btn1";
        this.btn2 = "btn1";
        this.btn3 = "btn1";
        this.btn4 = "btn1";
        this.btn5 = "btn1";
        this.btn6 = "btn2";
      }
    },
  },
};
</script>

<style scoped src="../assets/css/sample.css">
</style>