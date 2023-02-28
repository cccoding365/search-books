<script setup>
import { getBooksData } from './api/index'
import { ref, reactive } from 'vue'

let searchData = ref('')
let books = reactive({
  items: [],
  totalItems: null
})

const getBooksDataHandle = async () => {
  let data = await getBooksData({ q: `${searchData.value}`, maxResults: 20 })
  books.totalItems = data.totalItems
  books.items = data.items
  searchData.value = ''
}

const getImageUrl = (item) => {
  return item ? item.volumeInfo?.imageLinks?.smallThumbnail : ''
}

</script>

<template>
  <div class="bookStore">
    <h1 class="title">Search Books</h1>
    <div class="search-input">
      <el-input v-model="searchData" placeholder="Enter the name of the book you want to query"
        @keyup.enter="getBooksDataHandle" />
    </div>
    <!-- 书籍搜索结果 -->
    <div class="book-results-box">
      <!-- 结果总数量 -->
      <div class="book-results-total" v-show="books.totalItems">
        Total: <span style="color: rgb(142, 177, 239)">{{ books.totalItems }} </span> Results.
      </div>
      <!-- 书籍列表 -->
      <div class="book-results">
        <div class="book-item" v-for="item in books.items">
          <!-- 书籍封面 -->
          <div class="book-smallThumbnail">
            <el-image :src="getImageUrl(item)" fit="fill" />
          </div>
          <!-- 书籍信息 -->
          <div class="book-info">
            <!-- 书名 -->
            <a class="book-title" :href="item.volumeInfo.selfLink" target="_blank">
              {{ item.volumeInfo.title }} {{ item.volumeInfo.subtitle }}
            </a>
            <div class="book-author-publishedDate">
              <!-- 作者和出版日期 -->
              <span class="book-author" style="margin-right: 10px;" v-for="author in item.volumeInfo.authors">
                {{ author }}
              </span>
              <span class="book-publishedDate" style="margin-left: 10px;">
                {{ item.volumeInfo.publishedDate }}
              </span>
            </div>
            <!-- 页数和ISBN号 -->
            <div>
              <el-tag class="book-pageCount" size="small" style="margin-right: 10px;" v-show="item.volumeInfo.pageCount">
                Page: {{ item.volumeInfo.pageCount }}
              </el-tag>
              <el-tag class="book-industryIdentifiers" type="danger" size="small" style="margin-right: 10px;"
                v-for="i in item.volumeInfo.industryIdentifiers">
                {{ i.type }} {{ i.identifier }}
              </el-tag>
            </div>
            <div class="book-description" style="margin-top: 10px;">{{ item.volumeInfo.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop :right="60" :bottom="100" />
  </div>
</template>

<style scoped>
.bookStore {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  min-height: 100vh;
}

.title {
  font-size: 48px;
}

.search-input {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.book-results-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 100px;
}

.book-results-total {
  border-radius: 10px;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 18px;
}

.book-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.book-item {
  margin: 10px;
  border: 2px solid #fff;
  width: 100%;
  height: fit-content;
  padding: 20px 25px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
}

.book-smallThumbnail {
  overflow: hidden;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  margin-right: 25px;
}

.book-smallThumbnail .el-image {
  height: 100%;
  width: 100%;
}

.book-info {
  max-width: calc(100% - 140px);
}

.book-author-publishedDate {
  margin: 5px 0;
}

.book-title {
  font-size: 24px;
  cursor: pointer;
}

.book-author {
  color: rgb(142, 177, 239);
  font-size: 14px;
}

.book-description {
  color: rgb(218, 215, 215);
}
</style>
