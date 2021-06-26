import React, { useState, useEffect, useRef } from 'react';

import feixi from '@/scss/score/feixi.scss';
export default function Feixi () {
  return(
    <div>
      <div className={feixi.lishi}>
        <p>完整</p>
      </div>
    </div>
  )
}