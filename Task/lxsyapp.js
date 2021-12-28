/*
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注册地址：https://lianxingshiye.cn/mobile/reg.html
食用方法：注册后实名认证 签到3天即可兑换大米
lxsyck:手机号#密码
export lxsyck='手机号#密码'
多账户用@隔开
boxjs地址:https://gitee.com/gossh520/script/raw/master/byxiaopeng.boxjs.json
*/

// [task_local]
//#联兴实业
// 10 8 * * * https://gitee.com/gossh520/script/raw/master/lxsyapp.js, tag=联兴实业, enabled=true
const $ = new Env('联兴实业APP签到');
const notify = $.isNode() ? require('./sendNotify') : '';
let status;
status = (status = ($.getval("lxsystatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let lxsyckArr = [];
let lxsyck = $.isNode() ? (process.env.lxsyck ? process.env.lxsyck : "") : ($.getdata('lxsyck') ? $.getdata('lxsyck') : "");
let lxsycks = "";
let tz = ($.getval('lxsytz') || '1');
let host=`https://lianxingshiye.cn`;
$.message = ''

//开始运行
!(async () => {
  if (typeof $request !== "undefined") {
    // yxyck()
  } else {
    if (!$.isNode()) {
      lxsyckArr.push($.getdata('lxsyck'))
      let count = ($.getval('lxsycount') || '1');
      for (let i = 2; i <= count; i++) {
        lxsyckArr.push($.getdata(`lxsyck${i}`))
      }
      if (!lxsyckArr[0]) {
        $.log(`\n【傻吊提示】：你没有填写ck跑个嘚`)
        $.message += `\n【傻吊提示】：你没有填写ck跑个嘚`
      } else {
        console.log(`-------------共${lxsyckArr.length}个账号-------------\n`)
      }
      for (let i = 0; i < lxsyckArr.length; i++) {
        if (lxsyckArr[i]) {
          lxsyck = lxsyckArr[i];
          $.index = i + 1;
          zhanghu = lxsyck.split('#')
          user = zhanghu[0]
          mima = zhanghu[1]
          console.log(`\n开始【联兴实业账户 ${$.index}__ ${zhanghu}】`)
          await byxiaopeng()
        }
      }
    } else {
      if (process.env.lxsyck && process.env.lxsyck.indexOf('@') > -1) {
        lxsyckArr = process.env.lxsyck.split('@');
        console.log(`您选择的是用"@"隔开\n`)
      } else {
        lxsycks = [process.env.lxsyck]
      };
      Object.keys(lxsycks).forEach((item) => {
        if (lxsycks[item]) {
          lxsyckArr.push(lxsycks[item])
        }
      })
      if (!lxsyckArr[0]) {
        $.log(`\n【傻吊提示】：你没有填写ck跑个嘚`)
        $.message += `\n【傻吊提示】：你没有填写ck跑个嘚`
      } else {
        console.log(`-------------共${lxsyckArr.length}个账号-------------\n`)
      }
      for (let k = 0; k < lxsyckArr.length; k++) {
        lxsyck = lxsyckArr[k]
        $.index = k + 1;
        console.log(`\n开始【联兴实业账户 ${$.index}】`)
        zhanghu = lxsyck.split('#')
        user = zhanghu[0]
        mima = zhanghu[1]
        await byxiaopeng()
      }
    }
  }
  message() //通知
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

//要执行的代码
async function byxiaopeng() {
  webk = suijiid16()
  PHPSESSIDs = MD5_Encrypt(`${user}`)
  PHPSESSID = PHPSESSIDs.slice(0, 26)
  await panduan() 
}
//脚本判断
function panduan(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `https://ppp520.coding.net/p/Gridea/d/Gridea/git/raw/master/code.json`,
      headers: {
        'Accept': 'application/json',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      },
    }
    $.get(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.lxsycode == 1) {
          $.log(`\n【脚本状态】：${result.lxsymsg}`)
          $.message += `\n【脚本状态】：${result.lxsymsg}`
          await dutang() 
          await $.wait(1000)
          await login()
          await $.wait(1000)
          await sign() //签到
        } else {
          $.log(`\n【脚本状态】：${result.lxsymsg}`)
          $.message += `\n【脚本状态】：${result.lxsymsg}`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//每日毒鸡汤
function dutang(timeout = 0) {
  return new Promise((resolve) => {
      let url = {
          url: `https://api.oick.cn/dutang/api.php`,
          headers: {
              'Accept': 'application/json',
              'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
          },
      }
      $.get(url, async (err, resp, data) => {
          try {
              result = data
              if (result.length != 0) {
                  $.log(`\n【今日鸡汤】：${result}`)
                  $.message += `\n【今日鸡汤】：${result}`
              }
          } catch (e) {
              $.logErr(e, resp);
          } finally {
              resolve()
          }
      }, timeout)
  })
}

//登录
function login(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/mobile/login.html`,
      headers: {
        "accept": "text/html, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; MI 9 Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Mobile Safari/537.36 AgentWeb/4.1.9  UCBrowser/11.6.4.950",
        "content-type": `multipart/form-data; boundary=----WebKitFormBoundary${webk}`,
        "X-Requested-With": "XMLHttpRequest",
        "x-pjax": "true",
        "x-pjax-container": "#pjax-msg",
        "cookie": `PHPSESSID=${PHPSESSID}`,
        "Referer": "https://lianxingshiye.cn/mobile/login.html"
      },
      body:`------WebKitFormBoundary${webk}\r\nContent-Disposition: form-data; name=\"account\"\r\n\r\n${user}\r\n------WebKitFormBoundary${webk}\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\n${mima}\r\n------WebKitFormBoundary${webk}--\r\n`
    }
    $.post(url, async (err, resp, data) => {
      try {
        //result = JSON.parse(data)
        result = data
        if (result.length != 0) {
          $.log(`\n【登录状态】：` + result)
          $.message += `\n【登录状态】：` + result
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//签到
function sign(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/handle/sign.html`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; MI 9 Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Mobile Safari/537.36 AgentWeb/4.1.9  UCBrowser/11.6.4.950",
        'Referer': 'https://lianxingshiye.cn/mobile/sign.html',
        "cookie": `PHPSESSID=${PHPSESSID}`,
      }
    }
    $.get(url, async (err, resp, data) => {
      try {
        //result = JSON.parse(data)
        result = data
        if (result.length != 0) {
          $.log(`\n【签到状态】：` + result)
          $.message += `\n【签到状态】：` + result
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//通知
async function message() {
  if (tz == 1) {
      $.msg($.name, "", $.message)
  }
  if ($.isNode()) {
      await notify.sendNotify($.name, $.message)
  }
}
function suijiid16() {
  $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
  maxPos = $chars.length;
  pwd = '';
  for (i = 0; i < 16; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd
}
//MD5加密
function MD5_Encrypt(a) {
  function b(a, b) {
      return a << b | a >>> 32 - b
  }

  function c(a, b) {
      var c, d, e, f, g;
      return e = 2147483648 & a,
          f = 2147483648 & b,
          c = 1073741824 & a,
          d = 1073741824 & b,
          g = (1073741823 & a) + (1073741823 & b),
          c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f :
              g ^ e ^ f
  }

  function d(a, b, c) {
      return a & b | ~a & c
  }

  function e(a, b, c) {
      return a & c | b & ~c
  }

  function f(a, b, c) {
      return a ^ b ^ c
  }

  function g(a, b, c) {
      return b ^ (a | ~c)
  }

  function h(a, e, f, g, h, i, j) {
      return a = c(a, c(c(d(e, f, g), h), j)),
          c(b(a, i), e)
  }

  function i(a, d, f, g, h, i, j) {
      return a = c(a, c(c(e(d, f, g), h), j)),
          c(b(a, i), d)
  }

  function j(a, d, e, g, h, i, j) {
      return a = c(a, c(c(f(d, e, g), h), j)),
          c(b(a, i), d)
  }

  function k(a, d, e, f, h, i, j) {
      return a = c(a, c(c(g(d, e, f), h), j)),
          c(b(a, i), d)
  }

  function l(a) {
      for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i =
          0; c > i;)
          b = (i - i % 4) / 4,
              h = i % 4 * 8,
              g[b] = g[b] | a.charCodeAt(i) << h,
              i++;
      return b = (i - i % 4) / 4,
          h = i % 4 * 8,
          g[b] = g[b] | 128 << h,
          g[f - 2] = c << 3,
          g[f - 1] = c >>> 29,
          g
  }

  function m(a) {
      var b, c, d = "",
          e = "";
      for (c = 0; 3 >= c; c++)
          b = a >>> 8 * c & 255,
              e = "0" + b.toString(16),
              d += e.substr(e.length - 2, 2);
      return d
  }

  function n(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", c = 0; c < a.length; c++) {
          var d = a.charCodeAt(c);
          128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192),
              b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
                  b += String.fromCharCode(d >> 6 & 63 | 128),
                  b += String.fromCharCode(63 & d | 128))
      }
      return b
  }

  var o, p, q, r, s, t, u, v, w, x = [],
      y = 7,
      z = 12,
      A = 17,
      B = 22,
      C = 5,
      D = 9,
      E = 14,
      F = 20,
      G = 4,
      H = 11,
      I = 16,
      J = 23,
      K = 6,
      L = 10,
      M = 15,
      N = 21;
  for (a = n(a),
      x = l(a),
      t = 1732584193,
      u = 4023233417,
      v = 2562383102,
      w = 271733878,
      o = 0; o < x.length; o += 16)
      p = t,
          q = u,
          r = v,
          s = w,
          t = h(t, u, v, w, x[o + 0], y, 3614090360),
          w = h(w, t, u, v, x[o + 1], z, 3905402710),
          v = h(v, w, t, u, x[o + 2], A, 606105819),
          u = h(u, v, w, t, x[o + 3], B, 3250441966),
          t = h(t, u, v, w, x[o + 4], y, 4118548399),
          w = h(w, t, u, v, x[o + 5], z, 1200080426),
          v = h(v, w, t, u, x[o + 6], A, 2821735955),
          u = h(u, v, w, t, x[o + 7], B, 4249261313),
          t = h(t, u, v, w, x[o + 8], y, 1770035416),
          w = h(w, t, u, v, x[o + 9], z, 2336552879),
          v = h(v, w, t, u, x[o + 10], A, 4294925233),
          u = h(u, v, w, t, x[o + 11], B, 2304563134),
          t = h(t, u, v, w, x[o + 12], y, 1804603682),
          w = h(w, t, u, v, x[o + 13], z, 4254626195),
          v = h(v, w, t, u, x[o + 14], A, 2792965006),
          u = h(u, v, w, t, x[o + 15], B, 1236535329),
          t = i(t, u, v, w, x[o + 1], C, 4129170786),
          w = i(w, t, u, v, x[o + 6], D, 3225465664),
          v = i(v, w, t, u, x[o + 11], E, 643717713),
          u = i(u, v, w, t, x[o + 0], F, 3921069994),
          t = i(t, u, v, w, x[o + 5], C, 3593408605),
          w = i(w, t, u, v, x[o + 10], D, 38016083),
          v = i(v, w, t, u, x[o + 15], E, 3634488961),
          u = i(u, v, w, t, x[o + 4], F, 3889429448),
          t = i(t, u, v, w, x[o + 9], C, 568446438),
          w = i(w, t, u, v, x[o + 14], D, 3275163606),
          v = i(v, w, t, u, x[o + 3], E, 4107603335),
          u = i(u, v, w, t, x[o + 8], F, 1163531501),
          t = i(t, u, v, w, x[o + 13], C, 2850285829),
          w = i(w, t, u, v, x[o + 2], D, 4243563512),
          v = i(v, w, t, u, x[o + 7], E, 1735328473),
          u = i(u, v, w, t, x[o + 12], F, 2368359562),
          t = j(t, u, v, w, x[o + 5], G, 4294588738),
          w = j(w, t, u, v, x[o + 8], H, 2272392833),
          v = j(v, w, t, u, x[o + 11], I, 1839030562),
          u = j(u, v, w, t, x[o + 14], J, 4259657740),
          t = j(t, u, v, w, x[o + 1], G, 2763975236),
          w = j(w, t, u, v, x[o + 4], H, 1272893353),
          v = j(v, w, t, u, x[o + 7], I, 4139469664),
          u = j(u, v, w, t, x[o + 10], J, 3200236656),
          t = j(t, u, v, w, x[o + 13], G, 681279174),
          w = j(w, t, u, v, x[o + 0], H, 3936430074),
          v = j(v, w, t, u, x[o + 3], I, 3572445317),
          u = j(u, v, w, t, x[o + 6], J, 76029189),
          t = j(t, u, v, w, x[o + 9], G, 3654602809),
          w = j(w, t, u, v, x[o + 12], H, 3873151461),
          v = j(v, w, t, u, x[o + 15], I, 530742520),
          u = j(u, v, w, t, x[o + 2], J, 3299628645),
          t = k(t, u, v, w, x[o + 0], K, 4096336452),
          w = k(w, t, u, v, x[o + 7], L, 1126891415),
          v = k(v, w, t, u, x[o + 14], M, 2878612391),
          u = k(u, v, w, t, x[o + 5], N, 4237533241),
          t = k(t, u, v, w, x[o + 12], K, 1700485571),
          w = k(w, t, u, v, x[o + 3], L, 2399980690),
          v = k(v, w, t, u, x[o + 10], M, 4293915773),
          u = k(u, v, w, t, x[o + 1], N, 2240044497),
          t = k(t, u, v, w, x[o + 8], K, 1873313359),
          w = k(w, t, u, v, x[o + 15], L, 4264355552),
          v = k(v, w, t, u, x[o + 6], M, 2734768916),
          u = k(u, v, w, t, x[o + 13], N, 1309151649),
          t = k(t, u, v, w, x[o + 4], K, 4149444226),
          w = k(w, t, u, v, x[o + 11], L, 3174756917),
          v = k(v, w, t, u, x[o + 2], M, 718787259),
          u = k(u, v, w, t, x[o + 9], N, 3951481745),
          t = c(t, p),
          u = c(u, q),
          v = c(v, r),
          w = c(w, s);
  var O = m(t) + m(u) + m(v) + m(w);
  return O.toLowerCase()
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
