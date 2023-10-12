import { Link, Outlet } from 'umi';
import styles from './index.less';
import { useEffect } from 'react';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navsWrapper}>
        <div className={styles.navs}>
          <Link to='/amap' className={styles.navItem}>高德</Link>
          <Link to='/cesiumMap' className={styles.navItem}>cesium</Link>
          <Link to='/test' className={styles.navItem}>test</Link>
          <Link to='/form' className={styles.navItem}>动态表单</Link>
        </div>
      </div>
      <div className={styles.main}>
      <Outlet />
      </div>
    </div>
  );
}
