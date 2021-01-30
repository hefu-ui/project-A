

$(function () {
    // 点击去注册的界面
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 只要引入了layui就表示可以使用layui对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        psw: [
            // 正侧字符串中，大写的\S表示非空白字符，小写的\s表示非空字符
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repsw: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
                // return console.log(res.message);
            }
            layer.msg('注册成功请登录')
            // console.log('注册成功');
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                console.log(res.token);
                // 将res.token存储到本地存储中
                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }



        })
    })


})