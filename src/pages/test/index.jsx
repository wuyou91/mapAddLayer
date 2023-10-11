import { useState, useEffect, useRef } from 'react'
import useAmap from '@/hocs/useAmap'
import styles from './index.less'
import * as turf from '@turf/turf'

export default function () {
    const { mapRef } = useAmap({ id: 'amap-container' })
    const [active, setActive] = useState('')

    useEffect(() => {
        const path = [
            [114.052837,22.539186],
            [114.068801,22.537442],
            [114.057815,22.519842]
        ]
    
        const polygon = new AMap.Polygon({
            path: path,
            strokeColor: "#FF33FF", 
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: '#1791fc',
            zIndex: 50,
           draggable:true
        })
        mapRef.current.add(polygon)
        const polyEditor = new AMap.PolyEditor(mapRef.current, polygon)
        polyEditor.open()

        const path2 = [
            [114.082837,22.539186],
            [114.098801,22.537442],
            [114.097815,22.519842]
        ]
    
        const polyline = new AMap.Polyline({
            path: path2,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: "#3366FF", 
            strokeOpacity: 1,
            strokeWeight: 6,
            // 折线样式还支持 'dashed'
            strokeStyle: "solid",
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50,
            draggable: true
        })
        mapRef.current.add(polyline)
        const polylineEditor = new AMap.PolyEditor(mapRef.current, polyline)
        polylineEditor.open()

    }, [])
    return <div className={styles.page}>
        <div id='amap-container' className={styles.testMap} style={{ width: '100%', height: '100%' }}></div>
    </div>
}