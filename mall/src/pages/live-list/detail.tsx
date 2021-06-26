import React, { useState, useEffect, useRef } from 'react';
import Nav from '@/components/nav'
import deta from '@/scss/live/detail.scss'

export default function Detail () {
  return(
    <div>
      <Nav/>
      <div className={deta.detamain}>
        <div className={deta.right}>
          <div className={deta.roomFlex}>
              {/* title */}
          <div className={deta.topbj}>
            <div className={deta.lefttit}>
              <div className={deta.leftimg}></div>
              <div className={deta.lefttext}>
                大田市民<span className={deta.zoo}>0</span>
              </div>
            </div>
            <div className={deta.leftcent}>
              <p>巴西甲</p>
              <p className={deta.dateing}>2020/09/10</p>
              <p>更多数据</p>
            </div>
            <div className={deta.lefttit}>
              <div className={deta.lefttext}>
              <span className={deta.zoo2}>0</span>浦项制铁
              </div>
              <div className={deta.rightimg}></div>
            </div>
          </div>
          {/* room */}
        <div className={deta.ctn}>
          <div className={deta.roomleft}>
            <div className={deta.roomtit}>
              <div className={deta.iconctn}>
                <div className={deta.icontu}></div>
                <div className={deta.icontext}>
                  <p className={deta.lqao}>拉齐奥VS尤文图斯</p>
                  <p className={deta.dds}>
                    <span className={deta.ddname}>嘟嘟噢耶</span>
                    <span className={deta.inconhome}></span>
                    <span>0808280222</span>
                    <span className={deta.inconhou}></span>
                    <span>20202</span>
                  </p>
                </div>
              </div>
              <div className={deta.guanzhu}>关注</div>
            </div>
            {/* 直播间 */}
            <div className={deta.playtv}>
              <div className={deta.video}></div>
              {/* 播放mask */}
              <div className={deta.videoMask}>
                <div className={deta.playingleft}>
                  <div className={deta.playBtn} data-play='暂停'></div>
                  <div className={deta.playRefre}></div>
                </div>
                <div className={deta.playingright}>
                  <div className={deta.chaoqing}>
                    <span className={deta.chaoqingtext}>超清</span>
                    {/* 弹出框 */}
                    <div className={deta.chaobox}>
                      <div className={deta.lineSelect}>
                        <span>线路:</span>
                        <div className={deta.lineSelerig}>线路5</div>
                      </div>
                      <div className={deta.customer}>
                        <span>画质:</span>
                        <ul className={deta.custItem}>
                          <li>蓝光</li>
                          <li>超清</li>
                          <li>流畅</li>
                        </ul>
                      </div>
                      <span className={deta.sanicon}></span>
                    </div>
                  </div>
                  <div className={deta.dpsetting}>弹</div>
                  <div className={deta.dplayfull}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={deta.roomright}>
            <div className={deta.roomtop}>
              <span className={deta.roomlts}>聊天室</span>
              <p>988238<span className={deta.roomtou}></span></p>
            </div>
            <div className={deta.roomRen}>
              <ul className={deta.roomMsg}>
                <li>
                  <span className={deta.name}>Williamsheeran:</span>
                  <span className={deta.desc}>进入直播间</span>
                </li>
                <li>
                  <span className={deta.name}>Williamsheeran:</span>
                  <span className={deta.desc}>进入直播间</span>
                </li>
                <li className={deta.lge}>
                  <span className={deta.name}>Williamsheeran:</span>
                  <span className={deta.desc}>进入直播间</span>
                </li>
              </ul>
            </div>
            <div className={deta.roombottom}>
              <div className={deta.msginput}>
                <input type='text' name=''
                  placeholder='我也来说几句'
                  className={deta.inputBox}>
                </input>
                <div className={deta.msgBtn}>发送</div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}