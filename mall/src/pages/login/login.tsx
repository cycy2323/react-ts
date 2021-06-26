import React, { useContext, useEffect, useState, useRef } from 'react'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import Typography from '@material-ui/core/Typography'

import { userAction } from '@/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/reducers'

import './login.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Dialogs from '@/components/dialogs'
import Inputs from '@/components/inputs'
import { checkName, validatePwd } from '@/utils/regular'

import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {
  open: boolean;
}


interface Props {
  open: boolean
  handleClose: () => Function
}

const Login = (props: Props) => {
  const [index, activeIndex]: [number, Function] = useState<number>(0)
  return (
    <div>

      <Dialogs title={TabsBox(index, activeIndex)} content={LoginForm(index, props.handleClose, activeIndex)}
        handleClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open} />
    </div >
  )
}


interface VerifyItem {
  fn: ($val: string, $form: any, $code: string) => string | boolean
  text: string
  fettle: boolean
  placeholder: string
}
interface Verify {
  account: VerifyItem
  password: VerifyItem
  confirmPassword?: VerifyItem
  imgCode?: VerifyItem
  [key: string]: any
}

interface RegForm {
  account: string
  imgCode: string
  password: string
  confirmPassword: string
  captchaKey: string
  [name: string]: any
}

interface LoginForm {
  account: string
  password: string
}
const LoginForm: Function = (index: number, onClose: Function, activeIndex: Function) => {

  const dispatch = useDispatch()
  const randCode = useSelector((state: RootState) => state.user['randCode'])
  const msg = useSelector((state: RootState) => state.user['msg'])
  const login = useSelector((state: RootState) => state.user['login'])
  const timeoutDrawing = useRef<any>()
  const timeoutMsg = useRef<any>()

  // 登录表单
  const [loginForm, setLoginForm]: [LoginForm, Function] = useState<LoginForm>({
    account: 'xiaoxuzi123',
    password: '123456'
  })
  // 注册表单
  const [regForm, setRegForm]: [any, Function] = useState<RegForm>({
    account: '',
    password: '',
    confirmPassword: '',
    imgCode: '',
    captchaKey: ''
  })

  // 登录验证
  const [verifyLogin, setVerifyLogin]: [Verify, Function] = useState<Verify>({
    account: {
      fn: checkName,
      text: '4-11位字母或数字用户名',
      placeholder: '请输入账号',
      fettle: false
    },
    password: {
      fn: validatePwd,
      text: '6-12位字母或数字的密码',
      placeholder: '请输入密码',
      fettle: false
    }
  })
  // 注册验证
  const testImgCode = (val: string, form: any, code: string) => {
    // 验证不通过后
    if (val.length === 4 && val.toLowerCase() === code.toLowerCase()) {
      return true
    }
    val && randCodeBtn() // 不为空的时候重新调用
    setRegForm(form) // 解决数据清空问题
    return false
  }
  const [verifyReg, setVerifyReg]: [Verify, Function] = useState<Verify>({
    account: {
      fn: checkName,
      text: '4-11位字母或数字用户名',
      placeholder: '输入账号',
      fettle: false
    },
    password: {
      fn: validatePwd,
      text: '6-12位字母或数字的密码',
      placeholder: '请输入密码',
      fettle: false
    },
    confirmPassword: {
      fn: (val: string, form: LoginForm) => (val.length >= 6 && val === form.password) ? true : false,
      text: '密码两次输入不一致',
      placeholder: '请再次输入密码',
      fettle: false
    },
    imgCode: {
      fn: testImgCode,
      text: '请输入正确的验证码',
      placeholder: '请输入验证码',
      fettle: false
    }
  })

  // 调用登录接口
  const loginBtn: Function = () => {
    // if (loginData.token) return false


    regLogin(loginForm, verifyLogin, setVerifyLogin) && dispatch({
      type: `user/${userAction.GET_LOGIN_EPIC}`,
      payload: loginForm
    })
    setSnackbar({ ...snackbar, open: true })
    timeoutMsg.current = setTimeout(() => {
      setSnackbar({ ...snackbar, open: false })
      onClose()
    }, 1500)
  }
  // 调用注册接口
  const regBtn: Function = () => {
    console.log('regForm', regForm);
    if (!regLogin(regForm, verifyReg, setVerifyReg)) {
      randCodeBtn()
      return false
    }
    dispatch({
      type: `user/${userAction.GET_REGISTER_EPIC}`,
      payload: regForm
    })
    setSnackbar({ ...snackbar, open: true })
  }
  // 登录和注册提交验证
  const regLogin = (form: any, verify: any, setVerify: Function) => {
    let fettles: boolean[] = []
    Object.keys(form).filter(item => item !== 'captchaKey').map(key => {
      setVerify({ ...verify, [key]: { ...verify[key], fettle: !verify[key].fn(form[key], form, randCode.imgCode) } })
      // 有值的时候push
      form[key] && fettles.push(verify[key].fettle)
    })
    // 去掉captchaKey, 全部存在则提交
    if (!fettles.includes(true) && fettles.length === (Object.keys(form).includes('captchaKey') ? Object.keys(form).length - 1 : Object.keys(form).length)) {
      return true
    }
    return false
  }
  // 更新图片
  const updateImgCode = () => {
    setRegForm({ ...regForm, captchaKey: randCode.captchaKey })
    timeoutDrawing.current = setTimeout(() => {
      //3.填充背景颜色,颜色要浅一点
      const canvas: any = document.getElementById('canvas');
      console.log('randCode.imgCode', randCode.imgCode)
      canvas && canvas.getContext && randCode && randCode.imgCode && drawing(canvas, randCode.imgCode)
    }, 0)
  }
  const drawing = (canvas: any, code: string) => {
    console.log('code', code)
    const ctx: CanvasRenderingContext2D | any = (canvas as HTMLCanvasElement).getContext('2d'
    );
    //1.新建一个函数产生随机数
    const rn = (min: any, max: any) => {
      return parseInt(Math.random() * (max - min) + min);
    }
    //2.新建一个函数产生随机颜色
    const rc = (min: any, max: any) => {
      var r = rn(min, max);
      var g = rn(min, max);
      var b = rn(min, max);
      return `rgb(${r},${g},${b})`;
    }
    var w = 120;
    var h = 40;
    ctx.fillStyle = rc(180, 230);
    ctx.fillRect(0, 0, w, h);
    //4.随机产生字符串
    for (var i = 0; i < (code && code.length); i++) {
      var c = code[i];//随机的字
      var fs = rn(24, 40);//字体的大小
      var deg = rn(-30, 30);//字体的旋转角度
      ctx.font = fs + 'px Simhei';
      ctx.textBaseline = "top";
      ctx.fillStyle = rc(80, 150);
      ctx.save();
      ctx.translate(30 * i + 15, 15);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(c, -15 + 5, -15);
      ctx.restore();
    }
    //5.随机产生5条干扰线,干扰线的颜色要浅一点
    for (var i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(rn(0, w), rn(0, h));
      ctx.lineTo(rn(0, w), rn(0, h));
      ctx.strokeStyle = rc(180, 230);
      ctx.closePath();
      ctx.stroke();
    }
    //6.随机产生40个干扰的小点
    for (var i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(rn(0, w), rn(0, h), 1, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = rc(150, 200);
      ctx.fill();
    }
  }
  // 没有验证码时默认文字
  const [isShowText, setIsShowText] = useState<boolean>(false);
  // 调用图形验证码
  const randCodeBtn = () => {
    !isShowText && setIsShowText(!isShowText)
    dispatch({
      type: `user/${userAction.GET_RAND_CODE_EPIC}`,
    })
    updateImgCode()
  }
  // 点击图片切换时
  useEffect(() => {
    console.log(randCode.imgCode);
    updateImgCode()
  }, [randCode.imgCode])

  const clearCurrent = () => {
    clearTimeout(timeoutMsg.current)
    clearTimeout(timeoutDrawing.current)
  }
  useEffect(() => {
    return () => {
      clearCurrent()
    }
  }, [])
  const [snackbar, setSnackbar] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackbar
  // msg变动时
  // useEffect(() => {
  //   updateSnackbar()
  // }, [msg])
  // 弹窗
  // const updateSnackbar: Function = () => {
  //   msg && setSnackbar({ ...snackbar, open: true })
  // }

  // 处理单项表单验证
  const inputWidget = (key: string, setVerify: any, verify: any, setForm: any, form: any) => {
    return <>
      <input
        onBlur={() => setVerify({ ...verify, [key]: { ...verify[key], fettle: !verify[key].fn(form[key], form, randCode.imgCode) } })}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={verify[key].placeholder}
        defaultValue={form[key]}
        onCopy={() => false}
      />
      <p className={verify[key].fettle ? 'errorReg' : 'errorRegNone'}>{verify[key].text}</p>
    </>
  }


  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={msg}
        key={vertical + horizontal}
      />
      {/* 登录 */}
      <div style={{ display: index === 0 ? 'block' : 'none' }} className='logoform'>
        <div className='zhanghao'>
          {
            Object.keys(loginForm).map((key) =>
              <div className='regphone' key={key}>
                {inputWidget(key, setVerifyLogin, verifyLogin, setLoginForm, loginForm)}
              </div>
            )
          }
        </div>
        <div className='ispassword'>
          <CheckboxLab /> <p className='nopassword'>忘记密码？</p>
        </div>
        <div className='passbtn'>
          <Button variant="contained" onClick={() => loginBtn()}>登录</Button>
        </div>
        <p className='logintext'>登录注册即同意《用户协议》</p>
      </div>
      {/* 注册 */}
      <div style={{ display: index === 1 ? 'block' : 'none' }}>
        {
          Object.keys(regForm).filter(item => item !== 'captchaKey').map((key) => {
            return key !== 'imgCode' ?
              <div className='regphone' key={key}>
                {inputWidget(key, setVerifyReg, verifyReg, setRegForm, regForm)}
              </div> :
              <div className='regphone regyanzhengma' key={key}>
                {inputWidget(key, setVerifyReg, verifyReg, setRegForm, regForm)}
                {isShowText ? <canvas onClick={() => randCodeBtn()} className='getImgCode' width="120" height="40" id="canvas" /> : <Button onClick={() => randCodeBtn()}>获取验证码</Button>}
              </div>
          })
        }
        <div className='regBtnt'>
          <Button onClick={() => regBtn()} variant="contained">注册</Button>
        </div>
        <p className='regsttext'>登录注册即同意《用户协议》</p>
      </div>
    </>
  )
}
// 记住密码
const CheckboxLab = () => {
  const [state, setState] = React.useState({
    checkedB: true,
  });
  const handleChange = (event: React.ChangeEvent<{}>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={state.checkedB}
          onChange={handleChange}
          name='checkedB'
          color='primary'
        />
      }
      label='记住密码'
    />
  )
}

// tab切换
const TabsBox = (index: number, activeIndex: Function) => {
  const [value, setValue] = React.useState(index);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className='tabsCtn'>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='登录' {...a11yProps(0)} onClick={() => activeIndex(0)} />
          <Tab label='注册' {...a11yProps(1)} onClick={() => activeIndex(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Login