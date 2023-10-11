import AMapLoader from '@amap/amap-jsapi-loader';

export function render(oldRender) {
  window._AMapSecurityConfig = {
    securityJsCode: '40327ef36158a366822b03aa1a3de00e',
  }
  AMapLoader.load({
    key: 'fbc034c3ebbf5b36b4d926c73adbe92d', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.PolylineEditor',
      'AMap.MassMarks',
      "AMap.Scale",
      "AMap.GeoJSON",
      'AMap.Geolocation',
      'AMap.Geocoder',
      'AMap.PlaceSearch',
      "AMap.RectangleEditor",
      "AMap.CircleEditor",
      "AMap.PolyEditor",
      "AMap.Weather",
      "AMap.TileLayer"
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then(AMap => {
    window.AMap = AMap
    oldRender()
  })
}