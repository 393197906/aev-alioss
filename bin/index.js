#!/usr/bin/env node
const Rsync = require("../Rsync");
const path = require('path')
const { program } = require('commander');
const package = require("../package.json")

program.version(package.version)
    .option('-t, --tag <tagName>', '项目名称，会在oss创建同名文件夹')
    .option('-p, --path <pathName>', 'dist目标文件夹',"dist")
    .option('-r, --region <regionName>', '区域region',"oss-cn-beijing")
    .option('-b, --bucket <bucketName>', 'bucket名称',"xindong-static-web")
    .option('-id, --accessKeyId <accessKeyId>', 'accessKeyId')
    .option('-secret, --accessKeySecret <accessKeySecret>', 'accessKeySecret')
    .parse(process.argv)

if(!program.tag){
    throw new Error("请设置 tag")
}
if(!program.accessKeyId){
    throw new Error("请设置 accessKeyId")
}
if(!program.accessKeySecret){
    throw new Error("请设置 accessKeySecret")
}

const opts = program.opts();
const  config = {
    region: opts.region, // 区域(EndPoint（地域节点）, 例如: oss-cn-beijing.aliyuncs.com),
    accessKeyId: opts.accessKeyId,
    accessKeySecret: opts.accessKeySecret,
    bucket: opts.bucket,
    bucketDir: opts.tag, // 上传到阿里云oss之后的地址
    localDir: path.resolve(process.cwd(),opts.path) // 本地地址
}
console.log(config);

new Rsync(config).upload();
