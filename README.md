# aev-alioss

```javascript
new Rsync({
     region: 'oss-cn-beijing', // 区域(EndPoint（地域节点）, 例如: oss-cn-beijing.aliyuncs.com),
     accessKeyId: '',
     accessKeySecret: '',
     bucket: '',
     bucketDir: 'oms', // 上传到阿里云oss之后的地址
     localDir: path.join(__dirname, 'dist') // 本地地址
 }).upload()
```
