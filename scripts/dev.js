//开发时执行的脚本，只针对具体的某个包打包
const fs = require('fs');

//开启子进程进行打包，最后还是使用rollup进行打包
const execa = require('execa');

const target = 'reactivity'//根据shared/reactivity的不同 打包不同的文件

build(target)
async function build(target) { // rollup  -c --environment TARGET:shated 执行rollup,-c是指执行某种配置文件,后面跟随环境变量
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], { stdio: 'inherit' });  // 当子进程打包的信息共享给父进程 w表示可以一直监控文件变化
}
