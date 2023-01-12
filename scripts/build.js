//生产环境构建执行的脚本，把package目录下所有的包进行打包
const fs = require('fs');

//开启子进程进行打包，最后还是使用rollup进行打包
const execa = require('execa');

//同步读取当前某个文件下的所有文件

const targets = fs.readdirSync('packages').filter(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }
  return true;
})


//对我们目标进行依次打包，并行打包
async function build(target) { // rollup  -c --environment TARGET:shated 执行rollup,-c是指执行某种配置文件,后面跟随环境变量
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: 'inherit' });  // 当子进程打包的信息共享给父进程
}

function runParallel(targets, iteratorFn) {
  const res = []
  for (const item of targets) {
    const p = iteratorFn(item)
    res.push(p);
  }
  return Promise.all(res)
}


runParallel(targets, build)