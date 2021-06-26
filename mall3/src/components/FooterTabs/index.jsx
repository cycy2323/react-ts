import React from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import ZIndex from '@/components/ZIndex';

import styles from './style.scss';

const FooterTabs = ({ isLive, isScore, isForecast, isDownload }) => (
  <ZIndex className={styles.container}>
    <div className={styles.wrapper}>
      <Link to="/" className={ClassNames(styles.item, styles.isLive, { [styles.isActive]: isLive })}>
        <div className={styles.icon} />
        <div className={styles.label}>直播</div>
      </Link>
      <Link to="/score" className={ClassNames(styles.item, styles.isScore, { [styles.isActive]: isScore })}>
        <div className={styles.icon} />
        <div className={styles.label}>赛程</div>
      </Link>
      <Link to="/forecast" className={ClassNames(styles.item, styles.isForecast, { [styles.isActive]: isForecast })}>
        <div className={styles.icon} />
        <div className={styles.label}>预测</div>
      </Link>
      <Link to="/download" className={ClassNames(styles.item, styles.isDownload, { [styles.isActive]: isDownload })}>
        <div className={styles.icon} />
        <div className={styles.label}>APP下载</div>
      </Link>
    </div>
  </ZIndex>
);

export default FooterTabs;
