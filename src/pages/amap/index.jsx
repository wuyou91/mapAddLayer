import { useState, useEffect, useRef } from 'react'
import useAmap from '@/hocs/useAmap'
import styles from './index.less'
import * as turf from '@turf/turf'

export default function () {
    const { mapRef } = useAmap({ id: 'amap-container' })
    const [active, setActive] = useState('')

    const line = useRef(null)
    const path = useRef([])
    const area = useRef(null)
    useEffect(() => {
        mapRef.current.on('click', e => {
            console.log(e)
            path.current.push(e.lnglat)
            if (!line.current) {
                line.current = new window.AMap.Polyline({
                    strokeColor: "#3366FF",
                    strokeWeight: 4,
                })
                mapRef.current.add(line.current)
            }
            if (path.current.length >= 2) {
                line.current.setPath(path.current)
            }
        })
    }, [])

    const close = () => {
        mapRef.current.remove(line.current)
        mapRef.current.remove(area.current)
        line.current = null
        path.current = []
        area.current = null
    }
    const offset = () => {
        if (!line.current || line.current.length < 2 || area.current) return
        const path = line.current.getPath().map(x => x.toArray())
        const source = turf.lineString(path, { "stroke": "#F00" });
        const offsetLine1 = turf.lineOffset(source, 200, { units: 'meters' });
        const offsetLine2 = turf.lineOffset(source, -200, { units: 'meters' });
        const line1 = offsetLine1.geometry.coordinates
        const line2 = offsetLine2.geometry.coordinates.reverse()
        area.current = new window.AMap.Polygon({
            map: mapRef.current,
            path: [...line1, ...line2],
            strokeColor: "#3366FF",
            strokeWeight: 4,
        })
    }
    return <div className={styles.page}>
        <div id='amap-container' style={{ width: '100%', height: '100%' }}></div>
        <div className={styles.tool}>
            <div className={active === 'polyline' ? styles.toolItem + ' ' + styles.active : styles.toolItem} onClick={() => setActive('polyline')}>线</div>
            <div className={active === 'polygon' ? styles.toolItem + ' ' + styles.active : styles.toolItem} onClick={offset}>偏</div>
            <div className={active === 'close' ? styles.toolItem + ' ' + styles.active : styles.toolItem} onClick={close}>清</div>
        </div>
    </div>
}