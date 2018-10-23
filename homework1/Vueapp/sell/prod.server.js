var express = require('express');/* 依赖express */
var config = require('./config/index.js');/* 依赖config做配置 */

/* 定义运行的port,可以是当前环境下的port，如果没有就去config.build.port */
var port = process.env.PORT || config.build.port;

/* 启用一下express */
var app = express();

var router = express.Router();/* 定义一个router */

/* 定义一个简单的路由 */
router.get('/',function (req, res, next){
  req.url = '/index.html';/* 请求 */
  next();
});
/*  通过app.use使用router*/
app.use(router);

const appData = require('./data.json')  //加载本地数据文件
const seller = appData.seller  //获取对应的seller本地数据
const goods = appData.goods //获取对应的goods本地数据
const ratings = appData.ratings //获取对应的ratings本地数据
/* **********加载mock数据***********/
const apiRoutes = express.Router() //定义一个路由apiRoutes

apiRoutes.get('/seller', (req, res) => { // 对前台/seller的处理接口
  res.json({ //服务器返回的数据
    errno: 0, //自定义错误码
    data: seller
  })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
});
apiRoutes.get('/goods', (req, res) => { // 对前台/goods的处理接口
  res.json({
    errno: 0,
    data: goods
  })
});
apiRoutes.get('/ratings', (req, res) => { // 对前台/ratings的处理接口
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use('/api', apiRoutes);/*异步接口*/
app.use(express.static('./dist'));/*定义static目录*/

module.exports = app.listen(port, function (err) {/*启动express*/
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
