import useModal from "@/common/useModal";
import CustomizedButtons from "@/components/base/Button/Button";
import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { AccountCircle, LockOpen } from "@material-ui/icons";
import { Toast } from "antd-mobile";
import React, { useState } from "react";
import "./UserPage.scss";
const useStyle = makeStyles(() => ({
  root: {
    background: "white",
    width: "100%",
    marginTop: "0.27777778rem",
    "& div": {
      background: "white",
      "& input": {
        fontSize: "0.5rem",
      },
    },
    "& div:hover": {
      background: "white",
    },
    "& label": {
      fontSize: "0.44444444rem",
      color: "#ccc",
    },
  },
  icon: {
    fontSize: "0.55555556rem",
  },
}));

export default function UserPage() {
  const { showAlert } = useModal("取消登录", "你确定要取消登录吗");
  const [name, setName] = useState("pathyu");
  const [password, setPassword] = useState("123456");
  const [refresh,setRefresh] = useState(false);
  const classes = useStyle();

  async function handleExitLogin() {
    const res = await showAlert();
    if (res) {
      localStorage.removeItem("Dytoken");
      localStorage.removeItem("DYusername");
      localStorage.removeItem("DYavatar");
      setRefresh(true);
    }
  }
  async function handleClick() {
    if (!name || !password) {
      Toast.fail("用户名和账号不能为空");
      return;
    }
    Toast.loading("正在登录中");
    const response = await fetch("http://h5sm.com/uni/users/loginAndRegister", {
      method: "POST",
      mode: "cors",
      body: "username=" + name + "&password=" + password,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
    const data = await response.json();
    if (data.status === 1) {
      Toast.hide();
      Toast.success("登录成功");
      localStorage.setItem("Dytoken", data.msg.token);
      localStorage.setItem("DYusername", data.msg.username);
      localStorage.setItem("DYavatar", data.msg.avatar);
      setName("");
      setPassword("");
    } else {
      Toast.fail(data.msg);
    }
  }
  if (!localStorage.getItem("Dytoken")) {
    return (
      <div className="UserPage">
        <p>登录注册</p>

        <div className="form p-2">
          <form action="">
            <TextField
              value={name}
              className={classes.root}
              placeholder="请输入用户名"
              InputLabelProps={{ shrink: true }}
              onChange={(ev) => setName(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle className={classes.icon}></AccountCircle>
                  </InputAdornment>
                ),
              }}
              label="用户名"
              variant="outlined"
            ></TextField>
            <TextField
              value={password}
              className={classes.root}
              placeholder="请输入密码"
              InputLabelProps={{ shrink: true }}
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpen className={classes.icon}></LockOpen>
                  </InputAdornment>
                ),
              }}
              label="密码"
              variant="outlined"
            ></TextField>
          </form>
          <div className="flex justify-center">
            <CustomizedButtons
              onClick={handleClick}
              text="立即登录"
            ></CustomizedButtons>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="userHome">
      <h1>欢迎 {localStorage.getItem("DYusername")}访问此页面</h1>
      <div className="flex justify-center">
        <img src={localStorage.getItem("DYavatar")} alt="" />
      </div>
      <CustomizedButtons
        onClick={handleExitLogin}
        text="退出登录"
      ></CustomizedButtons>
    </div>
  );
}
