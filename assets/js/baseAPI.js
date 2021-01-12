// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
// console.log($.ajaxPreFilter);
$.ajaxPrefilter(function (options) {

    options.url = "http://api-breakingnews-web.itheima.net" + options.url
    // 统一为有权限的接口,设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 控制用户访问的权限
    options.complete = (function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.跳转回登陆界面
            location.href = 'login.html'
        }
    })
})

