import { useEffect, useRef } from 'react';

const AMap = window.AMap
export default function ({ id, mapConfig }) {
    const mapRef = useRef(null)
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new AMap.Map(id, mapConfig || {
                // 设置地图容器id
                viewMode: '2D', // 是否为3D地图模式
                zoom: 4, // 初始化地图级别
                center: [105.602725, 37.076636], // 初始化地图中心点位置
            });
        }

        return () => {
            // 销毁地图及webgl
            let dom = document.getElementById(id)
            let canvas = dom?.getElementsByTagName('canvas')
            if (canvas) {
                let gl = canvas.getContext('webgl')
                gl.canvas.width = 0
                gl.canvas.height = 0
                gl.getExtension('WEBGL_lose_context').loseContext()
            }
            mapRef.current && mapRef.current.destroy()
            mapRef.current = null
            canvas = null
            dom = null
        }
    }, [])

    return {
        mapRef
    }
}