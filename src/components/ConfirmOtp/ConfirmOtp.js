import React, { Component } from "react";
import logo from '../../Logo.png';
import axios from "axios";
import forge from "node-forge/lib/forge";


class ConfirmOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    };
    this.txnId = '';

  }
  handleOtpChange = (e) => {

    console.log(e.target.value);
    this.setState({ otp: e.target.value });
  }
  handleOtpSubmit = (e) => {
    e.preventDefault();
    var md = require('node-forge');
    var md = forge.md.sha256.create();
    md.update(this.state.otp);
    console.log(md.digest().toHex());


    // this.setState({
    //   otp:this.state.otp
    // })
    axios.post(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, { otp: md.digest().toHex(), txnId: localStorage.getItem("txnId") })
      .then(res => {
        
        console.log(res);
        this.setState({
          isDownloadView: true,
        })

        localStorage.setItem("AuthToken", res.data.token)
        window.location.href="/download"
      })
  }

  
 
  render() {
    return (
      <>
        <form onSubmit={this.handleOtpSubmit}>
          <img src={logo} alt="Logo" />
          <h2>Enter your OTP</h2>
          
          <label>
            <input
              type="number"
              value={this.state.otp}
              onChange={this.handleOtpChange}
              placeholder="Enter OTP Here"
            />
          </label>
          <br />
          <br />
          <button className='form-submit-button'>CONFIRM</button>
        </form>
      </>
    );

  }

}
export default ConfirmOTP;