$(function () {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        form.val('formUserInfo', res.data)
      }
    })
  }
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault(e)
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
    
      data: $(this).serialize(),
    
      success: function (res) {
        console.log(res);
      
        if (res.status !== 0) {
          return layer.msg('提交信息失败')

        }
        window.parent.getUserInfo()
        console.log('提交成功');
      }
    })
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res);
      }
    })
  })

})
