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
      console.log('判断require：' + !!this.val());
      return !!this.val()
    },
    "email": function () {
      console.log('判断email：' + /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.val()));
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.val())
    },
    // ...
  }

  // errorNotice【错误提示】
  const errorNotice = {
    "require": "该项不得为空",
    "email": "请输入正确的邮箱"
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
          // 预处理（删除原有样式）
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