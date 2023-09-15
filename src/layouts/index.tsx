import { Link, Outlet } from 'umi';
import styles from './index.less';
import { useEffect } from 'react';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navs}>
        <Link to='/cesiumMap' className={styles.navItem}>cesium</Link>
        <Link to='/amap' className={styles.navItem}>高德</Link>
      </div>
      <Outlet />
    </div>
  );
}
