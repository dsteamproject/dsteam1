<template>
  <div>
    <div class="wrap">
      <h2 class="tti">글 수정</h2>
      <div class="hr"></div>
      <label>작성자</label> <span>{{ list.member.nicname }}</span
      ><br />
      <label>말머리</label>
      <select class="keyword" v-model="keyword">
        <option value="free">잡담</option>
        <option value="review">여행후기</option>
        <option value="info">여행정보</option>
        <option value="que">질문</option></select
      ><br />
      <label>제목</label
      ><input type="text" class="title" v-model="title" /><br />
      <label class="imlabel">대표이미지</label>

      <input
        id="ex_file"
        class="nullfile"
        ref="file"
        type="file"
        name="file"
        @change="imagechange()"
      />
      <div class="filebox">
        <label class="filelabel" for="ex_file">UPLOAD</label>
        <span class="imagename">{{ this.imagename }}</span>
      </div>
      <br />
      <label>내용</label>
      <div class="ckeditor">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig">
        </ckeditor>
        <div class="btn2">
          <button class="confirm" @click="handleconfirm">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    ckeditor: CKEditor.component,
  },
  async created() {
    this.$emit("searchon", true);
    await this.refresh();
  },
  data() {
    return {
      imagename: "",
      imagefile: "",
      keyword: "",
      list: [],
      title: "",
      editor: ClassicEditor,
      editorData: "",
      no: this.$route.query.no,
      token: sessionStorage.getItem("TOKEN"),
      editorConfig: {
        language: "ko",
      },
    };
  },
  methods: {
    async imagechange() {
      this.imagefile = this.$refs.file.files[0];
      console.log(this.imagefile);
      this.imagename = this.imagefile.name;
    },
    async handleconfirm() {
      const url = `/REST/board/update`;
      const headers = {
        "Content-type": "multipart/form-data",
        token: this.token,
      };
      const body = new FormData();

      body.append("no", this.no);
      body.append("title", this.title);
      body.append("category", this.keyword);
      body.append("content", this.editorData);
      body.append("file", this.imagefile);
      console.log(body);

      const response = await axios.put(url, body, { headers }); // put으로 교체예정
      console.log(response);
      if (response.data.status === 200) {
        alert("수정 완료되었습니다");
        this.$router.push(`/freecontent?no=${this.no}`);
      }
    },
    async refresh() {
      const url = `/REST/board/selectone?no=${this.no}&category=free`;

      const headers = { "Content-type": "application/json", token: this.token };
      const response = await axios.get(url, headers);
      console.log(response);
      if (response.status === 200) {
        this.list = response.data.board;
        this.editorData = this.list.content;
        this.title = this.list.title;
        this.keyword = this.list.category;
      }
    },
  },
};
</script>

<style scoped>
.ck-content .text-tiny {
  font-size: 0.7em;
}

.ck-content .text-small {
  font-size: 0.85em;
}

.ck-content .text-big {
  font-size: 1.4em;
}

.ck-content .text-huge {
  font-size: 1.8em;
}

.btn2 {
  text-align: center;
}
.confirm {
  text-align: center;
  clear: both;
  margin-top: 30px;
  padding: 10px 50px;
  border: none;
  cursor: pointer;
  background: #2752be;
  color: white;
  border-radius: 3px 3px 3px 3px;
  margin-bottom: 50px;
}

.ckeditor {
  width: 85%;
  box-sizing: border-box;
  float: right;

  height: auto;
}
.tti {
  margin-top: 30px;
}
.title {
  width: 85%;
  height: 45px;
  font-size: 14px;
  padding: 10px;
  outline: none;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 3px 3px 3px 3px;
}
label {
  width: 15%;
  display: inline-block;
  margin-bottom: 30px;
}
.keyword {
  width: 85%;
  height: 45px;
  font-size: 14px;
  padding: 10px;
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 3px 3px 3px 3px;
}
.wrap {
  width: 1120px;
  margin: 0 auto;
  height: auto;
}
.hr {
  margin: 20px 0px;
  border-bottom: 1px solid #ccc;
}
.nullfile {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.filelabel {
  background: #2752be;
  display: inline-block;
  width: unset;
  display: inline-block;

  text-align: center;
  box-sizing: border-box;
  padding: 9px 10px;
  font-size: 13px;
  color: white;
  margin-bottom: unset;
  border-radius: 3px 0px 0px 3px;
}
.filelabel:hover {
  background: #0e2e7e;
}

.filebox {
  display: inline-block;
  width: 40%;

  height: 36.4px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 3px 3px 3px 3px;
}
.imagename {
  margin-left: 20px;
}
</style>