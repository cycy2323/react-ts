import React, { useState, useEffect } from 'react';
import rightfix from './style.scss';

export default function RightFix() {
  return (
    <div className={rightfix.ctn}>
      <ul className={rightfix.item}>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}