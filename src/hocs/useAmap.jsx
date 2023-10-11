import { useEffect, useRef } from 'react';

const AMap = window.AMap
export default function ({ id, mapConfig }) {
    const mapRef = useRef(null)
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new AMap.Map(id, mapConfig || {
                // 设置地图容器id
                viewMode: '2D', // 是否为3D地图模式
                zoom: 12, // 初始化地图级别
                mapStyle: 'amap://styles/whitesmoke',
                center: [114.056468, 22.571944], // 初始化地图中心点位置
            });
        }

        return () => {
            // 销毁地图及webgl
            // let dom = document.getElementById(id)
            // let canvas = dom?.getElementsByTagName('canvas')
            // if (canvas) {
            //     let gl = canvas.getContext('webgl')
            //     gl.canvas.width = 0
            //     gl.canvas.height = 0
            //     gl.getExtension('WEBGL_lose_context').loseContext()
            // }
            mapRef.current && mapRef.current.destroy()
            mapRef.current = null
            // canvas = null
            // dom = null
        }
    }, [])

    return {
        mapRef
    }
}