<script lang="ts" setup></script>

<template>
  <BContainer>
    <BRow class="back-footer" />
    <BRow>
      <BCol class="col position-fixed bottom-0 start-0 menu">
        <ul class="d-flex justify-content-between m-1 p-0">
          <li class="d-flex justify-content-center">
            <a class="text-decoration-none" href="/exchanges/expense">Chi tiêu</a>
          </li>
          <li class="d-flex justify-content-center">
            <a class="text-decoration-none" href="/exchanges/income">Thu nhập</a>
          </li>
          <li class="d-flex justify-content-center">
            <a class="text-decoration-none" href="/exchanges/tranfer">Chuyển tiền</a>
          </li>
          <li class="d-flex justify-content-center">
            <a class="text-decoration-none" href="/histories">Lịch sử</a>
          </li>
          <li class="d-flex justify-content-center">
            <a class="text-decoration-none" href="/statistic">Thống kê</a>
          </li>
        </ul>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
* {
  box-sizing: border-box;
  font-family: sans-serif Verdana;
}

li a {
  color: white;
  font-size: small;
}

li {
  background-color: rgba(255, 123, 123, 0.8);
  width: 100%;
  text-align: center;
  border-radius: 4px;
  padding: 6px;
  margin: 2px;
  align-items: center;
}

.menu {
  background-color: #f6f6f6;
  width: 100%;
  padding: 1px !important;
}
.back-footer {
  min-height: 50px;
}
</style>
