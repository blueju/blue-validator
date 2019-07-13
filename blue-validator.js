/**
 * blur-validator
 * jQuery表单验证插件
 */
(function (global, plugin, pluginName) {
  return plugin.call(global, global.jQuery, pluginName)
})(this, function ($, pluginName) {

  // rules【规则字典】
  const rules = {
    "require": function () {
      let result = !!this.val()
      console.log('判断require：' + result);
      return result
    },
    "email": function () {
      let result = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.val())
      console.log('判断email：' + result);
      return result
    },
    "maxlength": function () {
      let result = this.val().length < this.data('bv-maxlength') ? true : false
      console.log('判断maxlength：' + result);
      return result
    },
    "phone": function () {
      let result = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.val())
      console.log('判断phone：' + result);
      return result
    }
    // ...
  }

  // errorNotice【错误提示】
  const errorNotice = {
    "require": "该项不得为空",
    "email": "请输入正确的邮箱",
    "maxlength": "注意最大长度"
  }

  // start
  $.fn[pluginName] = function (options) {
    // 【使用了jQuery的each方法：遍历DOM元素】
    // 遍历所有form元素
    this.each((formIndex, form) => {
      // 【使用了jQuery的find方法：查找子元素】
      // 寻找属性为data-bv=true的子元素并保存
      let hasBlueValidatorInputList = this.find("[data-bv=true]")
      // 给所有input子元素绑定change事件
      hasBlueValidatorInputList.on("change", function () {
        let result = null;
        // 【使用到了jQuery的each的特殊用法】
        // 遍历规则字典并匹配，如果有匹配的规则，就执行该规则对应的判断函数
        $.each(rules, (ruleName, ruleFunction) => {
          // 删除原有样式
          $(this).parents('.form-group').removeClass("has-success has-error")
          $(this).parents('.form-group').find('.help-block').remove()
          // 匹配
          if ($(this).data('bv-' + ruleName)) {
            result = ruleFunction.call($(this))
            if (result) {
              // 输入正确
              $(this).parent().addClass("has-success")
            } else {
              // 输入错误
              $(this).parent().addClass("has-error")
              $(this).after(`<span class="help-block">${errorNotice[ruleName]}</span>`)
            }
            // return false 不需要再继续遍历并匹配下一个规则了
            return result
          }
        })
      })
    })
  }
}, "blueValidator")