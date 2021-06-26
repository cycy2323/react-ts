import React, { useState, useEffect} from 'react';

import ranq from '@/scss/score/rangqiu.scss';
export default function Feixi () {
  return(
    <div>
      <div className={ranq.points1}>
        <div className={ranq.rangtop1}>
          <p className={ranq.hidetext}>隐藏</p>
          <div className={ranq.hidetext}>保留</div>
          <div className={ranq.showtext}>显示全部</div>
          <p className={ranq.gswx}>共{'{'}<span className={ranq.nubrde}>13</span>/13{'}'}间公司</p>
        </div>
        <div className={ranq.ranlist}>
          <ul className={ranq.listtop}>
              <li className={`${ranq.cell} ${ranq.cell1}`}>选择</li>
              <li className={`${ranq.cell} ${ranq.cell2}`}>全部公司</li>
              <li className={`${ranq.cell} ${ranq.cell3}`}>主队</li>
              <li className={`${ranq.cell} ${ranq.cell4}`}>即时</li>
              <li className={`${ranq.cell} ${ranq.cell5}`}>客队</li>
              <li className={`${ranq.cell} ${ranq.cell6}`}>主队</li>
              <li className={`${ranq.cell} ${ranq.cell7}`}>初始</li>
              <li className={`${ranq.cell} ${ranq.cell8}`}>客队</li>
              <li className={`${ranq.cell} ${ranq.cell9}`}>变化时间</li>
              <li className={`${ranq.cell} ${ranq.cell10}`}>查看</li>
            </ul>
            <table className={ranq.ivutab}>
              <tbody className={ranq.ivutbody}>
                <tr className={ranq.ivurow}>
                  <td className={ranq.cel1}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel2}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel3}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel4}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel5}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel6}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel7}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel8}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel9}>
                    <div className={ranq.selecell}></div>
                  </td>
                  <td className={ranq.cel10}>
                    <div className={ranq.selecell}></div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}