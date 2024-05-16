// 我们可以通过document.cookie来获取或者设置cookie。

// document.cookie = 'bfe=dev'
// "bfe=dev"

// document.cookie = 'bfe1=dev1'
// "bfe1=dev1"

// document.cookie
// "bfe=dev; bfe1=dev1"
// 请实现自己的myCookie。

// 需要支持get和set
// document.myCookie = 'bfe=dev'
// "bfe=dev"

// document.myCookie = 'bfe1=dev1'
// "bfe1=dev1"

// document.myCookie
// "bfe=dev; bfe1=dev1"
// cookie支持多种option，本题目中只需要支持max-age即可。max-age中指定的时间过后cookie将被删除。
// document.myCookie = 'bfe=dev; max-age=1'
// "bfe=dev; max-age=1"

// document.myCookie
// "bfe=dev"
// 1秒过后

// document.myCookie
// ""
// 在install()中激活myCookie，在uninstall()删除整个逻辑。

// enable myCookie
function install() {
  // your code here
}

// disable myCookie
function uninstall() {
  // your code here
}
