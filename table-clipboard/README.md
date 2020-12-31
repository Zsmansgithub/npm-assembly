vue组件用于选中复制表格区域文本至剪切板
vue用法
import tableClip 之后mixin到组件中
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
