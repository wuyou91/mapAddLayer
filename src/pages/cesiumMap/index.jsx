import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    new Cesium.Viewer('cesiumMap-container')
  }, [])
  return (
    <div style={{ width: "100%", height: "100%", boxSizing: 'border-box' }} id='cesiumMap-container'>
    </div>
  );
}
