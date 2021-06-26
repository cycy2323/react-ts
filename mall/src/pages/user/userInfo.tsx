import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import styles from '@/scss/user/user.scss';
import InputBase from '@material-ui/core/InputBase';
import UserSwitch from './switch';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import { userAction } from '@/actions'



const UserInfo: React.FC = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.user['userInfo']);
  const loginInfo = useSelector((state: RootState) => state.user['login']);

  const [active, setActive] = useState<number>(1);
  const [basic, setBasic] = useState<any>({
    startLive: false,
    ryBall: false,
    enterBall: true
  });
  const [careList, setCareList] = useState<Array<any>>([1, 2, 3, 4, 5])
  const [emailDailogFlag, setEmailDailogFlag] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showTips, setShowTips] = useState<boolean>(false);
  const [snackbarKey, setSnackbarKey] = useState<string>('default');


  useEffect(() => {
    fetchUserInfo()
  }, [])

  // 获取高亮
  const getActiveClass = (key: number): string => {
    return active === key ? `${styles.ulistItem} ${styles.active}` : `${styles.ulistItem}`;
  }

  // 获取icon图标
  const getIcon = (icon: string, key: number): string => {
    if (icon === 'infoicon') {
      return active === key ? `${styles.icon} ${styles.infoicon2}` : `${styles.icon} ${styles.infoicon1}`;
    } else if (icon === 'guanzhuicon') {
      return active === key ? `${styles.icon} ${styles.guanzhuicon2}` : `${styles.icon} ${styles.guanzhuicon1}`;
    }
    return '';
  }

  // 切换个人资料和我的关注
  const changeActive = (key: number): void => {
    document.documentElement.scrollTop = 0
    setActive(key);
    if (key === 2) {
      fetchCareList()
    } else {
      fetchUserInfo()
    }
  }

  const fetchUserInfo = () => {
    dispatch({
      type: `user/${userAction.GET_USER_INFO}`,
      payload: {}
    });
  }

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const fetchCareList = () => {
    dispatch({
      type: `user/${userAction.GET_USER_CARE_LIST}`,
      payload: {
        page, pageSize
      }
    });
  }

  // 渲染头像模块
  const getPortraitCmpt = () => {
    return <div className={styles.portraitWrap}>
      <div className={styles.portraitInner}>
        {userInfo.headImage ?
          <img src={userInfo.headImage} alt={userInfo.name} />
          :
          userInfo.name && userInfo.name.charAt(0)
        }
      </div>
    </div>
  }

  // 切换按钮开关
  const changeBasicBtn = (key: string): void => {
    setBasic({
      ...basic,
      [key]: !basic[key]
    })
    showTipsFunc()
  }

  // 渲染我的关注列表
  const renderCareList = () => {
    return (
      <div className={styles.careList}>
        {
          careList.map((el, idx) => {
            return (
              <div className={styles.careItem} key={idx}>
                <div className={styles.picWrap}>
                  <div className={styles.picInner}>
                    <img className={styles.picture} src={loginInfo.headImage} alt="" />
                  </div>
                  <div className={styles.steamWrap}>
                    <img className={styles.steamplay} src='http://222.186.150.148:8001/static/images/home/steam.gif' />
                  </div>
                </div>
                <div className={styles.careContent}>
                  <div className={styles.subjectWrap}>
                    <span>动物成精实录</span>
                    <div className={styles.tag}>
                      <div className={styles.tagText}>人美心美</div>
                    </div>
                  </div>
                  <div className={styles.careInfo}>主播简介</div>
                </div>
                <div className={styles.cancelCare}>取关</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  // 切换对话框
  const toggleEmailDailog = (value: boolean) => {
    setEmailDailogFlag(value)
  }

  const editPassword = (): void => {
    // 处理修改密码逻辑
    console.log(`修改密码逻辑${password}`)
    showTipsFunc()
  }

  const showTipsFunc = () => {
    setShowTips(true);
    setSnackbarKey(String(Math.random()));
  }

  return (
    <>
      <div className={styles.userWrap}>
        <div className={styles.userContent}>
          <div className={styles.left}>
            {getPortraitCmpt()}
            <p className={styles.name}>{userInfo.name}</p>
            <p className={styles.joinDay}>已加入U球{userInfo.joinDay || 0}天～</p>
            <div className={styles.ulist}>
              <div className={getActiveClass(1)} onClick={() => changeActive(1)}>
                <span className={getIcon('infoicon', 1)}></span>
                <span>个人资料</span>
              </div>
              <div className={getActiveClass(2)} onClick={() => changeActive(2)}>
                <span className={getIcon('guanzhuicon', 2)}></span>
                <span>我的关注</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={`${active === 1 ? '' : styles.hide}`}>
              <div className={styles.infoWrap}>
                <div className={styles.title}>账号设置</div>
                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    账号：{userInfo.account}
                  </div>
                  <div className={styles.infoItem}>
                    昵称：{userInfo.nickname}
                  </div>
                  <div className={styles.infoItem}>
                    手机：{userInfo.mobile}
                  </div>
                  <div className={styles.infoItem}>
                    性别：{userInfo.gender}
                  </div>
                </div>
                <div className={styles.posiPortrail}>
                  {getPortraitCmpt()}
                  <div className={styles.editBtn}>修改头像</div>
                </div>
                <div className={styles.bindWrap}>
                  <div className={styles.bindItem}>
                    <div className={styles.iconWrap}></div>
                    <div className={styles.bindName}>手机号码绑定</div>
                    <div className={styles.bindMobile}>{userInfo.mobile}</div>
                    <div className={styles.bindBtn}>绑定</div>
                  </div>
                  <div className={styles.bindItem}>
                    <div className={styles.iconWrap}></div>
                    <div className={styles.bindName}>邮箱绑定</div>
                    <div className={styles.bindMobile}>{userInfo.email}</div>
                    <div className={`${styles.bindBtn} ${styles.active}`} onClick={() => toggleEmailDailog(true)}>已绑定</div>
                  </div>
                </div>
              </div>
              <div className={styles.basicSetWrap}>
                <div className={styles.title}>基础设置</div>
                <div className={styles.basicList}>
                  <div className={styles.basicListItem}>
                    <span>关注主播开播提醒</span>
                    <UserSwitch checked={!!basic.startLive} onChange={() => changeBasicBtn('startLive')} />
                  </div>
                  <div className={styles.basicListItem}>
                    <span>赛程-红黄牌通知</span>
                    <UserSwitch checked={!!basic.ryBall} onChange={() => changeBasicBtn('ryBall')} />
                  </div>
                  <div className={styles.basicListItem}>
                    <span>赛程-进球通知</span>
                    <UserSwitch checked={!!basic.enterBall} onChange={() => changeBasicBtn('enterBall')} />
                  </div>
                </div>
              </div>
              <div className={styles.secritWrap}>
                <div className={styles.title}>安全设置</div>
                <div className={styles.secritItem}>
                  <div className={styles.label}>登录密码</div>
                  <div className={styles.inputWrap}>
                    <InputBase
                      className={styles.inputPwd}
                      placeholder=""
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.editPwd} onClick={editPassword}>修改</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${active === 2 ? '' : styles.hide}`}>
              <div className={styles.title}>我的关注</div>
              {renderCareList()}
            </div>
          </div>
          <Snackbar
            autoHideDuration={2000}
            onClose={() => {
              setShowTips(false);
              setSnackbarKey('default')
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={showTips}
            message="操作成功"
            key={snackbarKey}
          />
          <Dialog maxWidth={false} onClose={() => toggleEmailDailog(false)} open={emailDailogFlag}>
            <DialogTitle id="simple-dialog-title">
              <div className={styles.dailogTitle}>修改邮箱</div>
            </DialogTitle>
            <div className={styles.dailogBody}>
              <div className={styles.accountInfo}>账户：{userInfo.account}</div>
              <div className={styles.inputEmailWrap}>
                <InputBase
                  className={styles.inputEmail}
                  placeholder="输入邮箱"
                />
              </div>
            </div>
          </Dialog>
        );
        </div>
      </div>
    </>
  )
};

export default UserInfo;
