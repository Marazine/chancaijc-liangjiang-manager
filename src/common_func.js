export default {
  filterHTML (val) { /* 移除富文本编辑生成的html代码中，除了p标签和img标签 */
    var reTag = /<(\/?)(?!p|\/p|img|\/img).*?>/g
    return val.replace(reTag, '')
  }
}
