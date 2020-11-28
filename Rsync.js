const path = require('path')
const OSS = require('ali-oss')
const fs = require('fs')

class Rsync {
    constructor (config) {
        this.config = config
    }
    /**
     * 获取目录后转换
     * @param cb
     */
    getList (cb) {
        var filesList = []
        var dist = this.config.localDir
        this.readFileList(dist, filesList)
        let pathList = []
        filesList.map((value) => {
            pathList.push({
                dist: value.replace(/\\/g, '/'),
                upload: value.replace(dist, '').replace(/\\/g, '/')
            })
        })
        cb && cb(pathList)
    }
    /**
     * 获取目录列表
     * @param dir
     * @param filesList
     * @returns {Array}
     */
    readFileList (dir, filesList = []) {
        const files = fs.readdirSync(dir)
        files.forEach((item) => {
            var fullPath = path.join(dir, item)
            const stat = fs.statSync(fullPath)
            if (stat.isDirectory()) {
                this.readFileList(path.join(dir, item), filesList) // 递归读取文件
            } else {
                filesList.push(fullPath)
            }
        })
        return filesList
    }

    /**
     * 写入文件到阿里云oss
     * @param obj
     * @param file
     * @param ext
     */
    putFile (obj, file) {
        try {
            this.client = new OSS(this.config)
            this.client.put(this.config.bucketDir + obj, file).then(function (r1) {
                console.log('文件上传成功 =>', r1.name)
            }).catch(function (err) {
                console.log(err)
                console.error('error: %j', err)
                throw err
            })
        } catch (e) {
            console.log(e)
            console.error('error: %j', e)
            throw err
        }
    }
    upload () {
        const that = this
        this.getList(list => {
            list.map((val) => {
                this.putFile(val.upload, val.dist)
            })
        })
    }
}

module.exports = Rsync


