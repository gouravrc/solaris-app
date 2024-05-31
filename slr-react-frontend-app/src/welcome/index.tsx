import React, { useEffect, useState } from "react";
import "./index.css";
import Slider from "./Slider";
import { Puff } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { userSignInService, userSignUpService } from "../utils/service";
import { setLocalStorage } from "../utils";

const WelcomeScreen = (props:any) => {
  const history = useHistory();
  const [type, setType] = useState<'login' | 'signup'>("login");
  const [radiotype, setRadioType] = useState("customer");
  const [username, setUsername] = useState<any>(undefined)
  const [pwd, setPwd] = useState<any>(undefined)
  const [cnfpwd, setConfPwd] = useState<any>(undefined)
  const [load, setLoad] = useState<boolean>(false)


  function onProceedClick() {
    setLoad(true)

    if(type === "signup"){
      if(pwd !== cnfpwd){
        alert("Password did not match")
        return
      }
      else{
        const obj = {
          username:username,
          pwd:btoa(pwd),
          role: radiotype
        }
        userSignUpService(obj,(res:any)=>{
          if(res.status === 200){
            setLoad(false)
            setLocalStorage("user",res.data)
            history.push("dashboard")
          }
          else{
            setLoad(false)
            alert("Error Occuured! Try Again")
          }
        })
      }
    }
    else{
      const obj = {
        username:username,
        pwd:btoa(pwd),
        role: radiotype
      }
      userSignInService(obj,(res:any)=>{
        console.log(res)
        if(res.status === 200){
          setLoad(false)
          setLocalStorage("user",res.data.data)
          history.push("dashboard")
        }
        else{
          setLoad(false)
          alert(res.response.data.message)
        }
      })

    }
  }

  return (
    <div className="container">
      <div className="bg-image" />
      <div className="float-login-div">
        <div className="div-1-logo">
          <label className="logo-title-login">SOLARIS</label>
          <label className="logo-title-minor-radio">UnisysHacKHive</label>
        </div>
        <div className="div-1">
          <div
            style={{
              width: "50%",
              height: "20%",
              position: "relative",
            }}
          >
            <Slider active={(e:any) => setType(e)} />
          </div>
        </div>
        <div style={{ height: 20 }} />

        <div className="div-1">
          <input 
          onChange={(e:any)=>setUsername(e.target.value)} 
          placeholder="Username" 
          className="div-1-input" 
          value={username}
          />
        </div>
        <div className="div-1">
          <input
            placeholder="Password"
            type="password"
            className={pwd && pwd.length > 0 && pwd.length <=7 ?  "div-1-input-error" : "div-1-input"}
            onChange={(e:any)=>setPwd(e.target.value)}
            value={pwd}
            minLength={8}
          />
        </div>
        {type === "signup" && (
          <div className="div-1">
            <input
              placeholder="Confirm Password"
              type="password"
              className={cnfpwd && cnfpwd.length > 0 && cnfpwd.length <=7 ?  "div-1-input-error" : "div-1-input"}
              onChange={(e:any)=>setConfPwd(e.target.value)}
              minLength={8}
              value={cnfpwd}

            />
          </div>
        )}
        <div className="div-1">
          <div className="radio-div">
            <input
              checked={radiotype === "customer"}
              className="radio-btn"
              type="radio"
              onChange={() => setRadioType("customer")}
            />
            <label className="logo-title-minor-radio">Customer</label>
          </div>
          <div className="radio-div">
            <input
              checked={radiotype === "officer"}
              className="radio-btn"
              type="radio"
              onChange={() => setRadioType("officer")}
            />
            <label className="logo-title-minor-radio">Loan Officer</label>
          </div>
        </div>
        <div
          style={{ flexDirection: "column", height: "auto" }}
          className="div-1"
        >
          <div onClick={()=>onProceedClick()} className="login-btn">
            {load ? <Puff
              visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />:
            <label className="login-txt">Proceed</label>}
          </div>
          <label className="frgt-pwd">Forgot Password? Click here to reset</label>
          <label className="frgt-pwd-minor">© SOLARIS All Rights Reserved 2024-25</label>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
