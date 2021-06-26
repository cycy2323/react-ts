import React, { useState, useEffect, useRef } from 'react';
import nav from './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers';

import history from '@/utils/history';
import Login from '@/pages/login/login'
import Avatar from '@material-ui/core/Avatar';
import { time } from '@/utils/regular';

import { Login as LoginData } from '@/reducers/userReducer';

interface Props {
  isHome?: boolean
}
const Header = (props: Props) => {
  const [mainActive, setMainActive] = useState(props.isHome ? false : true)
  const [searchVal, setSearchVal] = useState()
  const [searchIput, setSearchIput] = useState(false)
  const [searchHover, setSearchHover] = useState(false);

  // 吸顶效果
  useEffect(() => {
    window.addEventListener('scroll', handScroll)
    return () => {
      window.removeEventListener('scroll', handScroll)
    }
  }, [])
  function handScroll() {
    const Top = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(Top)
    if (Top >= 200) {
      setMainActive(true)
    } else if (props.isHome) {
      setMainActive(false)
    }

  }
  const searchIn = () => {
    // console.log('值改变')
  }
  const searchFocus = () => {
    setSearchIput(true)
    setSearchHover(true)
  }
  const searchBlur = () => {
    // console.log('失去焦点')
    setSearchIput(false)
    setSearchHover(false)
  }
  const goLive = () => {
    setMainActive(true)
    history.push('/live', { defaultPath: 'live-list/all', });
  }
  const goHome = () => {
    history.push('/')
  }
  const goScore = () => {
    history.push('/score');
  }


  return (
    <div className={`${nav.main} ${mainActive ? nav.mainactive : ''}`} >
      <div className={nav.navwrap}>
        <div className={nav.headertop}>
          <div className={nav.headerleft}>
            <div onClick={goHome} className={nav.logolist}>
              <img src={'http://222.186.150.148:8001/static/images/home/logo1.webp'} className={nav.logoctn} />
              <img src={'http://222.186.150.148:8001/static/images/home/logo22.webp'} className={nav.logo222} />
            </div>
            <ul className={nav.headtab}>
              <li onClick={goHome} className={nav.headli}>
                <a className={nav.liveB}>首页</a>
              </li>
              <li className={nav.headli}>
                <a className={nav.liveA}>直播<span className={nav.navmorearrow}></span></a>
                <div className={nav.gap}></div>
                <div className={nav.hoverLive}>
                  <NavLive />
                </div>
              </li>
              <li onClick={goScore} className={nav.headli}>
                <a className={nav.liveA}>比赛<span className={nav.navmorearrow}></span></a>
                <div className={nav.gap}></div>
                <div className={nav.hoverEle}>
                  <Games />
                </div>
              </li>
              <li className={nav.headli}>
                <a className={nav.liveB}>预测</a>
              </li>
            </ul>
          </div>
          <div className={nav.navright}>
            <div className={nav.searchCtn}>
              <div className={`${nav.searchWrap} ${searchHover ? nav.searchHover : ''}`}>
                <input type='text' className={nav.searchInput} placeholder='主播'
                  value={searchVal}
                  onFocus={() => searchFocus()}
                  onInput={() => searchIn()}
                  onBlur={() => searchBlur()}
                />
              </div>
              <span className={nav.searchIcon}></span>
              {/* 搜索建议 */}
              <div className={`${nav.suggestCtn} ${searchIput ? nav.suggShow : ''}`}>
                <ul className={nav.suggestlist}>
                  <li className={nav.item}>
                    <i className={nav.key}>少女时代-SUNNY</i>
                  </li>
                  <li className={nav.item}>
                    <i className={nav.key}>太阳帝国的原罪</i>
                  </li>
                </ul>
              </div>
            </div>
            {HeaderRight()}
          </div>
        </div>
      </div>
    </div>
  );
};
const LiveSelect = (props: any) => {
  return (
    <div className={nav.liveouctn}>
      <div className={nav.liveouleft}>
        <div className={nav.livehou}>
          <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
        </div>
        <p className={nav.ouzhoubei}><span>{props.item.nickname.substr(0, 3)}</span>{props.item.title.substr(0, 12)}</p>
      </div>
      <button className={nav.look3} onClick={() => history.push('/layout', { defaultPath: 'room/room', item: props.item })}>查看</button>
    </div>
  )
}
const SaisiList = (props: any) => {
  return (
    <li className={nav.saisili}>
      <div className={nav.saisileft}>
        <p className={nav.yuandian}><span></span></p>
        <span className={nav.toda}>  {time(props.item[1])}</span>
        <span className={nav.bishaming}>{props.item[6]}</span>
        <span className={nav.bishaxq}>
          <span className={nav.space}>{props.item[2]}</span>
              VS
          <span className={nav.space}>{props.item[4]}</span>
        </span>
      </div>
      <button className={nav.look3}>查看</button>
    </li>
  )
}
const NavLive = () => {

  const homeData: any = useSelector((state: RootState) => state.home['data'])
  const scoreData: any = useSelector((state: RootState) => state.score['previewList'])

  return (
    <div className={nav.livectn}>
      <p className={nav.liveoup}>正在直播</p>
      <div className={nav.liveouul}>
        {homeData.rows.map((item: any, index: number) => {
          return (<LiveSelect key={index} item={item} />)
        })}
      </div>
      <p className={nav.liveoup}>赛事预告</p>
      <ul className={nav.saisiul}>
        {scoreData.splice(22).map((item: any, index: number) => {
          return (<SaisiList key={index} item={item} />)
        })}
      </ul>
    </div>
  )
}
const Games = () => {
  return (
    <div className={nav.games}>
      <div className={nav.zuqiuss} onClick={() => history.push('/score')}><span className={nav.zuqiutext}></span><span>足球赛事</span></div>
      <div className={nav.lanqiu}><span className={nav.zuqiutext}></span><span>篮球比赛</span></div>
      <div className={nav.gameing}><span className={nav.zuqiutext}></span><span>电竞赛事</span></div>
    </div>
  )
}
// app下载
const Appxiazai = () => {
  return (
    <div className={nav.appDown}>
      <div className={nav.dowtitle}></div>
      <div className={nav.downctn}>
        <div className={nav.doweleft}>
          <div className={nav.downios}><span className={nav.iosicon}></span>iphone版</div>
          <div className={nav.android}><span className={nav.andicon}></span>Android版</div>
        </div>
        <div className={nav.downicon}>
          <div className={nav.downicon2}></div>
        </div>
      </div>
    </div>
  )
}
// 订阅
const Sub = () => {
  return (
    <div className={nav.subscribe}>
      <div className={nav.subctn}>
        <div className={nav.subing}>订阅的比赛4场正在进行中</div>
        <ul className={nav.subUlctn}>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
          <li className={nav.subLictn}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.subimg} />
            <div className={nav.lsname}>
              <p className={nav.subgamename}>联赛名称<span>第3轮</span></p>
              <p className={nav.subgameou}>欧洲杯<span >拉齐奥VS尤文图斯</span></p>
            </div>
          </li>
        </ul>
        <div className={nav.titlectnn}></div>
        <div className={nav.chakan}>查看全部</div>
      </div>
    </div>
  )
}
const Atten = () => {
  return (
    <div className={nav.atten}>
      <div className={nav.attenctn}>
        <div className={nav.toubu}>
          <p className={nav.gzzb}>关注的主播</p>
          <p className={nav.gzren}><span>8</span><span>人直播中&gt;</span></p>
        </div>
        <ul className={nav.attenUl}>
          <li className={nav.attenLi}>
            <img src='/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
        </ul>
        <div className={`${nav.toubu} ${nav.gzdzj}`}>
          <p className={nav.gzzb}>关注的专家</p>
          <p className={nav.gzren}><span>2</span><span>人发新方案&gt;</span></p>
        </div>
        <ul className={nav.attenUl}>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
          <li className={nav.attenLi}>
            <img src='http://222.186.150.148:8001/static/images/home/card-banner-img.webp' className={nav.attenImg} />
            <div className={`${nav.livehou} ${nav.attenhou}`}>
              <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={nav.hot3} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}


const HeaderRight: Function = () => {
  const login = useSelector((state: RootState) => state.user['login'])
  const [isLogin, setLogin]: [LoginData, Function] = React.useState<LoginData>(login);
  const [open, setOpen]: [boolean, Function] = React.useState<boolean>(false);
  const selectOpen: Function = () => setOpen(!open)

  useEffect(() => {
    setLogin(login)
  }, [login])

  const goUser = () => {
    history.push('/user');
  }
  return (
    <>
      <Login open={open} handleClose={() => selectOpen()} />
      <div className={nav.textright}>
        <div className={nav.soft}>
          <span className={nav.softIcon}></span>
          <span className={nav.softtext}>APP</span>
          <Appxiazai />
        </div>
        <div className={nav.dingyue}>
          <span className={nav.dingyueIcon}></span>
          <span className={nav.dingyuetext}>订阅</span>
          <div className={nav.gap}></div>
          <Sub />
        </div>
        <div className={nav.guanzhu}>
          <span className={nav.guanzhuicon}></span>
          <span className={nav.guanzhutext}>关注</span>
          <div className={nav.gap}></div>
          <Atten />
        </div>

        <div className={nav.loginwrop}>
          {/* 没登入状态/已登录状态 */}
          {
            !isLogin.token ? <div className={nav.loginNo} onClick={() => selectOpen()}>
              <span className={nav.loginicon}></span>
              <div className={nav.loginctn}>
                <span className={nav.loginctn1}>登录</span>
                <i>I</i>
                <span className={nav.loginctn2}>注册</span>
              </div>
            </div> :
              // <div>111</div>
              <div className={nav.loginYes} onClick={() => goUser()}>
                <img src={login.headImage} className={nav.headtou} />
                <div className={nav.gap}></div>
                <Mycenten />
              </div>
          }
        </div>
        {/* <div className={nav.avatar} >
          <Avatar alt="Cindy Baker" src="https://profile.csdnimg.cn/A/2/D/3_qq_23158083" />
        </div> */}
      </div>
    </>
  )
}
const Mycenten = () => {
  return (
    <div className={nav.mycenten} onClick={() => history.push('/user', { defaultPath: 'user/user', })}>
      <div className={nav.myctn}>
        <ul>
          <li className={nav.ziList}><span className={nav.zilsz}></span><p>资料设置</p></li>
          <li className={nav.ziList}><span className={nav.loginout}></span><p>退出登录</p></li>
        </ul>
      </div>
    </div>
  )
}

export default Header;
