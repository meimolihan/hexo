// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}


/* 禁用F12按键并提醒 */
// document.onkeydown = function () {
//   if (window.event && window.event.keyCode == 123) {
//     event.keyCode = 0;
//     event.returnValue = false;
//     new Vue({
//       data:function(){
//         this.$notify({
//           title:"啊啊！你干嘛啊！",
//           message:"怎么能随随便便想扒猹的底裤呢？坏！",
//           position: 'bottom-right',
//           offset: 50,
//           showClose: false,
//           type:"error"
//         });
//         return{visible:false}
//       }
//     })
//     return false;
//   }
// };