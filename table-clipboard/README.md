vue mixin 用于选中复制表格区域文本至剪切板

安装 cnpm i table-clipboard

使用
import tableClip from 'table-clipboard';
tableClip 加入到组件mixin中

// 绑定处理函数(操作触发区域)
<div @mousedown.left="clickDown"
 ref="clipTableContent"
  @mouseup.left="clickUp"
   @contextmenu.prevent="showMenu"
   >
   <table ref="clipTableContent"></table>
</div>

// 初始化传入操作区域node节点即可
this.clipInit(this.$refs['clipTableContent']);
