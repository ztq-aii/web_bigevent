// 注册div和登录div的按需切换
// 点击去注册按钮
$('#link_reg').on('click', function () {
  $('.reg-box').show()
  $('.login-box').hide()
})
// 点击去登录按钮
$('#link_login').on('click', function () {
  $('.reg-box').hide()
  $('.login-box').show()
})
// 8.实现登录表单的验证
// 自定义校验规则  1.密码必须6-12位   2.校验两次密码是否一致
layui.form.verify({
  pwd: [
    /^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'
  ],
  repwd: function () {
    var pwdData = $('.reg-box [name=password]').val()
    var repwdData = $('.reg-box [name=repassword]').val()
    if (pwdData !== repwdData) {
      return "两次密码不一致"
    }
  }
})
// 9.提交注册的请求
// 监听表单的提交事件
$('#form_reg').on('submit', function (e) {
  // 阻止表单的默认提交行为
  e.preventDefault()
  // 获取表单数据
  var data = $(this).serialize()
  // 使用ajax提交数据
  $.ajax({
    url: '/api/reguser',
    method: 'post',
    data: data,
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      } else {
        // 10.注册结果的提交
        layui.layer.msg("注册成功")
        $('.reg-box').hide()
        $('.login-box').show()
      }
    }
  })
})
// 11.登录的提交
$('#form_login').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize()
  $.ajax({
    url: '/api/login',
    method: 'post',
    data: data,
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return ('登录失败')
      } else {
        localStorage.setItem('token', res.token)
        location.href = 'index.html'
      }
    }

  })

})

