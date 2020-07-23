<template>
  <ul v-show="isShow" class="ul_menu" :style="sty"><li @click="copyCode">复制</li></ul>
</template>

<script>
export default {
    props: {
        sty: Object,
        copyCode: Function,
        isShow: Boolean
    }
};
</script>

<style lang="scss" scoped>
  .ul_menu {
    list-style: none;
    padding: 5px 0;
    margin: 0;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #606266;
    transition: .3s;
    position: absolute;
    z-index: 2088;
    li {
      cursor: default;
      padding: 0 10px;
      white-space: nowrap;
      &:hover {
        background: #f5f7fa;
      }
    }
  }
</style>
