// 1.1 获取裁剪区域的 DOM 元素
//   var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$('#image').cropper(options)

// 当鼠标点击upbtn，模拟点击了input type=file
$('#upbtn').on('click', function () {
    $('#file').click()
})

// 更换裁剪的图片
//1. 拿到用户选择的文件
// 2.根据选择的文件，创建一个对应的url路径
// 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
$('#file').on('change', function (e) {
    var file = e.target.files[0]
    var imgUrl = URL.createObjectURL(file)
    // console.log(imgUrl);
    $('#image').cropper('destroy').attr('src', imgUrl).cropper(options)

})

$('#rebtn').on('click', function () {
    // 将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $('#image')
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器

    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('更新头像失败！')
            }
            layui.layer.msg('更换头像成功！')
            window.parent.getUserInfo()
        }
    })
})



