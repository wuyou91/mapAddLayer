
import useAmap from '@/hocs/useAmap'

export default function () {
    const { mapRef } = useAmap({ id: 'amap-container' })
    return <div style={{ width: "100%", height: "100vh",paddingTop: '50px',boxSizing:'border-box' }}> 
        <div id='amap-container' style={{ width: "100%", height: "100%" }}></div>
    </div>
}