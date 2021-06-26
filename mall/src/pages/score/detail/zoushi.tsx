import React, { useState, useEffect, useRef } from 'react';

import feixi from '@/scss/score/feixi.scss';
export default function Feixi () {
  return(
    <div>
      <div className={feixi.lishi}>
        <p>走势</p>
        <div></div>
      </div>
    </div>
  )
}