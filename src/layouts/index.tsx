import { Link, Outlet, history, useLocation } from 'umi';
import styles from './index.less';
import { useEffect } from 'react';

export default function Layout() {
  const pathName = useLocation().pathname
  
  const getClass =(val:String) => {
    if (pathName === val) {
      return styles.navItem + ' ' + styles.active
    } else {
      return styles.navItem
    }
  }
  return (
    <div className={styles.layout}>
      <div className={styles.navsWrapper}>
        <div className={styles.navs}>
          <Link to='/amap' className={getClass('/amap')}>高德</Link>
          <Link to='/cesiumMap' className={getClass('/cesiumMap')}>cesium</Link>
          <Link to='/test' className={getClass('/test')}>test</Link>
          <Link to='/form' className={getClass('/form')}>动态表单</Link>
          <Link to='/customForm' className={getClass('/customForm')}>自定义动态表单</Link>
        </div>
      </div>
      <div className={styles.main}>
      <Outlet />
      </div>
    </div>
  );
}
