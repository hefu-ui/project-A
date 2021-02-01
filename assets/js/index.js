$(function () {
    getUserInfo()
    var layer = layui.layer
    $('.btnlogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                // layer.msg(res.message)
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvater(res.data)
        }
    })
}
function renderAvater(user) {
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        // console.log('123');

        $('.text-avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
