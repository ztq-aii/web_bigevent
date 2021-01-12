// 获取用户的基本信息
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
            // 渲染用户头像
        }
        
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // console.log(user.nickname);
    if (name) {
        var first = name[0].toUpperCase()
    }
    // console.log(name);
    // 设置欢迎
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }

}

// 实现退出功能
$('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
        function (index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面 
            // 不需要/
            location.href = 'login.html'
            // 关闭 confirm 询问框
            layui.layer.close(index)
        })
})