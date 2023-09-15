import AMapLoader from '@amap/amap-jsapi-loader';

export function render(oldRender) {
  AMapLoader.load({
    key: 'fbc034c3ebbf5b36b4d926c73adbe92d', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then(AMap => {
    window.AMap = AMap
    oldRender()
  })
}