$(function () {
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) { //value：表单的值、item：表单的DOM对象
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！';
      }
    },
    rePwd: function (value) { //value：表单的值、item：表单的DOM对象
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！';
      }
    }
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg('修改密码失败')
        }
        // 使用js原生的方法将表单内容清空
        $('.layui-form')[0].reset()

      }
    })
  })



  // $('.layui-form').on('submit', function (e) {
  //   e.preventDefault()
  //   $.ajax({
  //     method: 'POST',
  //     url: '/my/updatepwd',
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layui.layer.msg('更新密码失败！')
  //       }
  //       layui.layer.msg('更新密码成功！')
  //       // 重置表单
  //       // 原生js才能调用的方法
  //       $('.layui-form')[0].reset()
  //     }
  //   })
  // })



})





// $(function () {
//   var form = layui.form

//   form.verify({
//     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//     samePwd: function (value) {
//       if (value === $('[name=oldPwd]').val()) {
//         return '新旧密码不能相同！'
//       }
//     },
//     rePwd: function (value) {
//       if (value !== $('[name=newPwd]').val()) {
//         return '两次密码不一致！'
//       }
//     }
//   })

//   $('.layui-form').on('submit', function (e) {
//     e.preventDefault()
//     $.ajax({
//       method: 'POST',
//       url: '/my/updatepwd',
//       data: $(this).serialize(),
//       success: function (res) {
//         if (res.status !== 0) {
//           return layui.layer.msg('更新密码失败！')
//         }
//         layui.layer.msg('更新密码成功！')
//         // 重置表单
// 原生js才能调用的方法
//         $('.layui-form')[0].reset()
//       }
//     })
//   })
// })
