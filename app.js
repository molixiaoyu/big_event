// 引入 express
const express = require("express");
// 引入body-parser
const bodyParser = require("body-parser");
// 引入 cors
const cors = require("cors");
// 路径
const path = require("path");
// 事件
const date = require("./getDate");
// 创建服务器实例
const app = express();
// 解析json编码
app.use(bodyParser.json());
// 解析url编码
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// 设置跨域
app.use(cors());
// 设置静态资源服务器,(设置保存用户上传的头像储存地址)
app.use(express.static(path.join(__dirname, "public")));
// 准备数据
var userList = [
  {
    id: 1,
    username: "admin",
    nickname: "管理员",
    pwd: "123456",
    email: "271493511@qq.com",
    user_pic: "http://127.0.0.1:5932/upload/1.jpg",
  },
];
// 登录接口
app.get("/login", (req, res) => {
  let uname = req.query.username;
  let pwd = req.query.pwd;
  // 判断数据库是否存在账号
  let flag = userList.some((item) => item.username == uname && item.pwd == pwd);
  if (flag) {
    res.send({
      status: 200,
      data: uname,
    });
  } else {
    res.send({
      status: 200,
      msg: "登录失败,账号或密码错误",
    });
  }
});
// 查询接口 用来查询用户注册的用户名是否存在
app.get("/rename", (req, res) => {
  // 获取前端传过来的用户名
  let uname = req.query.username;
  // 判断是否存在数据库
  let flag = userList.some((item) => item.username == uname);
  // 根据判断执行不同代码
  if (flag) {
    res.send({
      status: 200,
      msg: "用户名已被注册",
    });
  } else {
    res.send({
      status: 201,
      msg: "用户名可以注册",
    });
  }
});
// 注册接口
app.post("/reg", (req, res) => {
  if (userList.length > 0) {
    let id = userList[userList.length - 1].id + 1;
    req.body.id = id;
  }
  req.body.nickname = req.body.username;
  userList.push(req.body);
  res.send({
    status: 200,
    msg: "注册成功",
    data: req.body,
  });
});

// 查询接口
app.get("/getUserInfor", (req, res) => {
  // 获取前端传过来的用户名
  let username = req.query.username;
  // 在数据库中遍历找到
  let userInfor = userList.find((item) => item.username == username);
  // 返回给前端
  res.send({
    status: 200,
    msg: "用户名查询成功",
    data: userInfor,
  });
});

// 修改用户基本信息
app.post("/editUserInfor", (req, res) => {
  let username = req.body.username;
  let nickname = req.body.nickname;
  let email = req.body.email;
  let user_pic = req.body.user_pic;
  let userinfor = userList.find((item) => item.username == username);
  if (nickname) {
    userinfor.nickname = nickname;
  }
  if (email) {
    userinfor.email = email;
  }
  if (user_pic) {
    userinfor.user_pic = user_pic;
  }
  res.send({
    status: 200,
    msg: "修改用户信息成功",
    data: userinfor,
  });
});

// 修改密码接口
app.post("/regpwd", (req, res) => {
  let username = req.body.username;
  let pwd = req.body.pwd;
  let userInfor = userList.find(
    (item) => item.username == username && item.pwd == pwd
  );
  let newPwd = req.body.newpwd;
  if (newPwd == pwd) {
    res.send({
      status: 200,
      msg: "密码重复",
    });
  } else {
    if (userInfor) {
      userInfor.pwd = req.body.newpwd;
      res.send({
        status: 200,
        msg: "密码修改成功",
        data: userInfor,
      });
    } else {
      res.send({
        status: 200,
        msg: "请检查原密码是否正确",
      });
    }
  }
});
const formidable = require("formidable");
const { type } = require("os");
// 实现文件上传的路由
app.post("/upload", (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm();
  // 设置客户端上传文件的存储路径
  form.uploadDir = path.join(__dirname, "public", "upload"); //图片上传后保存到哪里
  // 保留上传文件的后缀名字
  form.keepExtensions = true;
  // 解析客户端传递过来的FormData对象;
  let uname = req.body.username;
  // let user = userList.find
  form.parse(req, (err, fields, files) => {
    // 将客户端传递过来的文件地址响应到客户端
    res.send({
      path: files.attrName[0].filepath.split("public")[1],
    });
  });
});

// 文章类型数据
let typeList = [
  {
    id: 1,
    name: "历史",
    bname: "lishi",
  },
  {
    id: 2,
    name: "娱乐",
    bname: "yule",
  },
  {
    id: 3,
    name: "金融",
    bname: "jinrong",
  },
  {
    id: 4,
    name: "科技",
    bname: "keji",
  },
];
// 获取文章接口
app.get("/getarticle", (req, res) => {
  res.send({
    status: 200,
    msg: "获取文章列表成功",
    data: typeList,
  });
});

// 修改文章接口
app.post("/editTypeById", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let bname = req.body.bname;

  let typeinfor = typeList.find((item) => item.id == id);
  typeinfor.name = name;
  typeinfor.bname = bname;
  res.send({
    status: 200,
    msg: "修改文章类型成功",
  });
});
// 查询文章接口
app.get("/getTypeById", (req, res) => {
  let id = req.query.id;
  let item = typeList.find((item) => item.id == id);
  res.send({
    status: 200,
    msg: "查询成功",
    data: item,
  });
});

// 添加文章接口
app.post("/addType", (req, res) => {
  // let arr = []
  // typeList.forEach(item => arr.push(item.id))
  // let id = Math.max(...arr) + 1
  let id = 1;
  if (typeList.length > 0) {
    id = typeList[typeList.length - 1].id + 1;
  }
  req.body.id = id;
  typeList.push(req.body);
  res.send({
    status: 200,
    msg: "文章添加成功",
  });
});

// 删除文章接口
app.post("/delType", (req, res) => {
  let id = req.body.id;
  typeList = typeList.filter((item) => item.id != id);
  res.send({
    status: 200,
    msg: "删除成功",
  });
});

// 文章数据
let newList = [
  {
    id: 1,
    title:
      "第十九届亚洲运动会在杭州隆重开幕 习近平出席开幕式并宣布本届亚运会开幕",
    typeid: 2,
    typename: "娱乐",
    content:
      "潮涌钱江喜迎盛会，携手同行共创未来。第十九届亚洲运动会23日晚在浙江省杭州市隆重开幕。国家主席习近平出席开幕式并宣布本届亚运会开幕。蔡奇、丁薛祥，以及来自亚洲各地的领导人和贵宾等出席开幕式。夜幕下，坐落在钱塘江畔的杭州奥体中心体育场华灯璀璨，流光溢彩。这座形如大莲花的建筑，见证着亚运圣火第三次在中国点燃。开幕式开始前，来自浙江各地的群众带来富于地方特色的文艺表演，将现场气氛得十分热烈。",
    pic: "http://127.0.0.1:5932/upload/1.jpg",
    state: "已发布",
    date: "2023-09-24",
  },
  {
    id: 2,
    title: "提升车用芯片自给能力刻不容缓",
    typeid: 4,
    typename: "科技",
    content:
      "受芯片供应不足影响，传闻南北大众汽车近期陷入停产。尽管大众汽车集团（中国）已公开解释，这只是短期的供给紧张，情况没有传闻中严重，已经与总部、相关供应商展开协调工作，但这并未完全打消公众的疑虑。",
    pic: "http://127.0.0.1:5932/upload/1.jpg",
    state: "已发布",
    date: "2023-09-24",
  },
  {
    id: 3,
    title: "邓伦在线回怼恶评：不务正业和走综艺咖路线，情商如何很显然！",
    typeid: 2,
    typename: "娱乐",
    content:
      "《快乐大本营》这档综艺节目的游戏可是非常刺激的，总能带给大家很多精彩的看点，像近期的节目中，邓伦就在线回怼网友们的恶评啦。因为不管哪位艺人都是会有各种质疑，所以对于这种恶评回怼是最好的办法。",
    pic: "http://127.0.0.1:5932/upload/1.jpg",
    state: "已发布",
    date: "2023-09-24",
  },
  {
    id: 4,
    title: "钱学森回国后待遇有多高？有一项待遇，就连十大元帅都未曾享受",
    typeid: 1,
    typename: "历史",
    content:
      "纵观钱学森的一生，简单来说就是国家为重，科学为重，名利最轻。他被誉为中国“航天之父”和“导弹之父”，他的一生也就如同天空中璀璨夺目的星辰，指引着中国的航天与导弹事业快速向前发展。钱学森曾是上世纪爱国科学家的代表之一。中国没有解放前，国内局势动荡不安，教育水平远没有外国先进。民国政府就组建了一批公费出国的赴美留学生，让他们外出深造。钱学森也就是在那时凭借优异的成绩城争取到了留学名额，经历了人生的第一次转折。",
    pic: "http://127.0.0.1:5932/upload/1.jpg",
    state: "已发布",
    date: "2023-09-24",
  },
];

// 新增文章
app.post("/addNew", (req, res) => {
  let id = 1;
  if (newList.length > 0) {
    id = newList[newList.length - 1].id + 1;
  }
  req.body.id = id;
  req.body.date = date.getDate(new Date());
  newList.push(req.body);
  res.send({
    status: 200,
    msg: "文章添加成功",
  });
});

// 文章查询列表接口
// 查询所有列表
// 分页
// 根据查询条件查询列表
app.get("/selectNew", (req, res) => {
  // 当前页码
  let pagenum = req.query.pagenum;

  // 每页显示多少条数据
  let pagesize = req.query.pagesize;
  // 文章类型
  let typeid = req.query.typeid;
  // 文章发布状态
  let state = req.query.state;
  // 定义为查询后的数组
  let list = [...newList];

  // 1.先把所有的查询条件先去过滤
  if (typeid != "0") {
    list = list.filter((item) => item.typeid == typeid);
  }
  if (state != "0") {
    list = list.filter((item) => item.state == state);
  }
  // 得到的数据再去分页
  // 翻转数据
  list.reverse();
  let nlist = [];
  nlist = list.filter(
    (item, index) =>
      index >= (pagenum - 1) * pagesize && index < pagenum * pagesize
  );
  res.send({
    status: 200,
    msg: "查询成功",
    data: nlist,
    total: list.length,
  });
});

// 删除文章接口
app.post("/delNew", (req, res) => {
  let id = req.body.id;
  newList = newList.filter((item) => item.id != id);
  res.send({
    status: 200,
    msg: "删除成功",
  });
});

// 查询文章接口
app.get("/getNewList", (req, res) => {
  let id = req.query.id;
  let infor = newList.find((item) => item.id == id);
  res.send({
    status: 200,
    msg: "获取数据成功",
    data: infor,
  });
});
// 修改文章接口
app.post("/editNes", (req, res) => {
  let id = req.body.id;
  let infor = newList.find((item) => item.id == id);
  console.log(req.body);
  infor.content = req.body.content;
  infor.title = req.body.title;
  infor.pic = req.body.pic;
  infor.state = req.body.state;
  infor.typeid = req.body.typeid;
  infor.typename = req.body.typename;
  res.send({
    status: 200,
    msg: "修改成功",
  });
});
// 运行服务器
app.listen("5932", () => {
  console.log(`服务器运行中`);
});
