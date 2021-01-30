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
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // console.log('yes');
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }



        // }

    })
}


function renderAvater(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-Avatar').hide()
    }
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-Avatar').html(first).show()
    }
}
