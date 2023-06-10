import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

toast.configure();
export default function ChangeAgentPassword(props) {
  const [Newpassword, setNewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [password, setpassword] = useState("");

  const ChangePassword = (e) => {
    e.preventDefault();
 
    //var strongRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    //var test = Newpassword.match(strongRegex);

    if (Newpassword === "" || confirmpassword === "" || password === "") {
      toast.warn("Password can not be Blank!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (Newpassword != confirmpassword) {
      toast.warn(" password is not matched!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (Newpassword === password) {
      toast.warn("Old password and new password is not same!", {
        position: toast.POSITION.TOP_CENTER,
      });
    /*} else if (!test) {
      toast.warn(
        "Password must have 8 to 15 alphanumeric without white space; cannot be the same as username/nickname; must contain at least 1 capital letter, small letter and numbers; and must not contain any special characters (!,@,#,etc..)",
        { position: toast.POSITION.TOP_CENTER }
      );*/
    } 
    else {
        var ssid = cookies.get('sid');
        if(!ssid) return;
      axios
        .post("http://65.0.111.203:3000/changeAgentPassword", {
          sid:ssid,
          agentId:props.agentStack[props.agentStack.length-1].userid,
          myPass: password,
          agentPass: Newpassword,
        })
        .then((result) => {
          if (result.status === 200) {
            toast.success("Password Changed Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            window.location.reload();
          }
          if (result.status === 206) {
            toast.warn("Your old password is wrong", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          
        })
        .catch((e) => {
          //setIsError(true);
        });
    }
  };

  console.log(props.agentStack[props.agentStack.length-1].userid);
  return (
    <React.Fragment>
      <div id="changePasswordModal" class="pop_bg" style={{ display: "block", top:0,right:0 }}>
        <div class="pop_box">
          <a class="close_pop" onClick={props.handleClosepassmodel}>
            close_pop
          </a>

          <h3>Change Password</h3>

          <dl class="form_list">
            <dt>New Password</dt>
            <dd>
              <input
                id="newPassword"
                type="password"
                value={Newpassword}
                onChange={(e) => {
                  setNewpassword(e.target.value);
                }}
                placeholder="Enter"
              />
              <span class="must">＊</span>
              <span id="newPasswordErrorText" class="error-text"></span>
            </dd>
            <dt>New Password Confirm</dt>
            <dd>
              <input
                id="newPasswordConfirm"
                type="password"
                value={confirmpassword}
                onChange={(e) => {
                  setconfirmpassword(e.target.value);
                }}
                placeholder="Enter"
              />
              <span class="must">＊</span>
              <span id="newPasswordConfirmErrorText" class="error-text"></span>
            </dd>
            <dt>Your Password</dt>
            <dd>
              <input
                id="changePassword"
                type="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="Enter"
              />
              <span class="must">＊</span>
            </dd>
            <dd>
              <a
                id="changePasswordBtn"
                 
                onClick={(e) => {
                  ChangePassword(e);
                }}
                class="btn-send"
              >
                Change
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </React.Fragment>
  );
}
