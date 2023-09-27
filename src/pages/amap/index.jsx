import { useState, useEffect, useRef } from 'react'
import useAmap from '@/hocs/useAmap'
import styles from './index.less'
import * as turf from '@turf/turf'

export default function () {
    const { mapRef } = useAmap({ id: 'amap-container' })
    const [active, setActive] = useState('')

    const line = useRef(null)
    const path = useRef([])
    const marker = useRef(null)

    const polylineEditor = useRef()
    useEffect(() => {
        polylineEditor.current = new AMap.PolylineEditor(mapRef.current)
        mapRef.current.on('click', e => {
            if (path.current.length <= 0) {
                marker.current = new AMap.Marker({
                    map: mapRef.current,
                    position: e.lnglat
                })
            } else {
                marker.current && mapRef.current.remove(marker.current)
            }
            if (path.current.length >= 2) {
                const arr = polylineEditor.current.getTarget().getPath()
                path.current = [...arr, e.lnglat]
            } else {
                path.current.push(e.lnglat)
            }
            if (!line.current) {
                line.current = new AMap.Polyline({
                    strokeColor: "#3366FF",
                    strokeWeight: 4,
                })
                mapRef.current.add(line.current)
            }
            if (path.current.length >= 2) {
                line.current.setPath(path.current)
                polylineEditor.current.setTarget(line.current)
                polylineEditor.current.open()
            }
        })
    }, [])
    const close = () => {
        polylineEditor.current.close()
        mapRef.current.clearMap()
        line.current = null
        path.current = []
        marker.current = null
        // mapRef.current.remove(polylineEditor.current)
    }
    return <div className={styles.page}>
        <div id='amap-container' style={{ width: '100%', height: '100%' }}></div>
        <div className={styles.tool}>
            <div className={active === 'polyline' ? styles.toolItem + ' ' + styles.active : styles.toolItem} onClick={() => setActive('polyline')}>线</div>
            <div className={active === 'close' ? styles.toolItem + ' ' + styles.active : styles.toolItem} onClick={close}>清</div>
        </div>
    </div>
}