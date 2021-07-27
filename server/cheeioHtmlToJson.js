const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('./index.html'); // 加载html
let json = [];
const $ = cheerio.load(html);
const dmItemList = $('.dm-item');

dmItemList.each((key,val) => {
  const content = val.children[1].data.replace(/：/g, '');
  const nickName = val.children[0].children[1].data;
  const lv = val.children[0].children[0].attribs.class.replace(/level level-(\d)/,'$1')
  json.push({
      content,
      nickName,
      lv
  })
});
fs.writeFile(__dirname + '/danmu.json', JSON.stringify(json), (err) => {
    console.log(err);
    if(err){
        console.log('写入成功');
    }
})


