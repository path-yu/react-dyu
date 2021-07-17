var createError = require('http-errors');
var express = require('express');
var path = require('path');
const axios = require('axios');
var cookieParser = require('cookie-parser');

const axiosInstance = axios.create({
  baseURL: 'https://m.douyu.com/api'
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/cateList', async (req,res,next) => {
  const response = await axiosInstance('/cate/recList?cid=&ct=');
  const mapData = response.data.data.map(v => {
    return {
      tag_name: v.name,
      tag_id: v.cate1Id,
      shortName: v.shortName,
      cate_id: v.cate2Id
    }
  })
  res.json(mapData)
});

app.get('/api/banner',(req,res,next) => {
  res.json({
    imgPreView: [
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg"
    ]
  })
})
app.get('/api/liveRoomList',async (req,res,next) => {
  const {type='LOL',page=1} = req.query;
  const response = await axiosInstance('/room/list',{
    params:{
      page,
      type,
    }
  });
  res.json(response.data.data)
});

app.get('/api/getColumnList',async (req,res,next) => {
  const response = await axiosInstance('/cate/list');
  let cateList = response.data.data.cate2Info.slice(0,24)
  res.json(cateList)
})

app.listen(3001,() => {
  console.log('server start at 3001 port');
})
module.exports = app;
