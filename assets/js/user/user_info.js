var form = layui.form
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    }
})

// 定义并调用 `initUserInfo` 函数
initUserInfo()

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // console.log(res)
            // 使用form.val方法快速为表单赋值
            form.val('formUserInfo', res.data)

        }
    })
}

//实现表单的重置效果
$('#btnReset').on('click', function (e) {
    // console.log(1111);
    e.preventDefault()

    initUserInfo()
})

// 发起请求用户更新的信息
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
        }

    })
})
