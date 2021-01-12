// 发起请求获取数据  渲染页面
initArtCateList()
function initArtCateList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}
var indexAdd = null;
// 使用layui.open实现弹出层效果
$('#btnAddCate').on('click', function () {
    indexAdd = layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
    })
})

// 通过事件委托的形式，给添加类别按钮form-add表单绑定事件

$('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    var data = $(this).serialize()

    $.ajax({
        method: 'post',
        url: '/my/article/addcates',
        data: data,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('新增分类失败！')
            }
            initArtCateList()
            layui.layer.msg('新增分类成功！')
            // 根据索引关闭对应的弹出层
            layui.layer.close(indexAdd)
        }
    })
})
// 修改功能

// 通过事件委托，给编辑按钮btn-edit绑定事件
var indexEdit = null;
$('tbody').on('click', '.btn-edit', function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
    })
    // 将已有的分类信息填充到修改文章的弹出层上
    // 根据id值发起请求获取文章数据
    var id = $(this).attr('data-id')
    $.ajax({
        method: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            console.log(res);
            layui.form.val('form-edit', res.data)
        }
    })
})

// 通过代理的形式给修改分类的表单绑定submit事件
$('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()  //快速获取表单数据serialize()
    $.ajax({
        method: 'post',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('修改数据失败')
            }
            layui.layer.msg('修改数据成功')
            layui.layer.close(indexEdit)
            // 重新获取页面数据
            initArtCateList()
        }
    })
})
// 删除功能
// 通过事件委托的形式，为删除按钮绑定点击事件
$('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('删除数据失败')
            }
            layui.layer.msg('删除数据成功')
            initArtCateList()
        }
    })
})
