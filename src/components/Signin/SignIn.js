import React, { Component } from "react";
import './SignIn.css'
import logo from '../../Logo.png';
import axios from "axios";
import forge from "node-forge/lib/forge";
import history from "../history";


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
    this.txnId = '';
    //this.initialState = this.state;

  }
  // handleFormValidation() {
  //   const phone  = this.state;
  //   let formErrors = {};    
  //   let formIsValid = true;   

  //   if (!this.state.phone) {    
  //     formIsValid = false;    
  //     formErrors["phoneNumberErr"] = "Phone number is required.";    
  // }    
  // else {    
  //     var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
  //     if (!mobPattern.test(this.state.phone)) {    
  //         formIsValid = false;    
  //         formErrors["phoneNumberErr"] = "Invalid phone number.";    
  //     }    
  //     this.setState({ formErrors: formErrors });    
  //     return formIsValid; 

  // }

  // }
  handleMobileChange = (e) => {
    console.log(e.target.value);
    this.setState({ phone: e.target.value });
  }

  // handleOtpChange = (e) => {

  //   console.log(e.target.value);
  //   this.setState({ otp: e.target.value });
  // }
  // handleBidChange = (e) => {

  //   console.log(e.target.value);
  //   this.setState({ bid: e.target.value });
  // }

  handleMobileSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.formErrors[0]);
    // if (this.handleFormValidation()) {    
    //     alert(`OTP has been successfully sent to ${this.state.phone}`)    
    //     this.setState(this.initialState)    
    // }    

    axios.post(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`, { mobile: this.state.phone })
      .then(res => {
        console.log(res);
        this.setState({
          isOtpView: true,
        })
        localStorage.setItem("txnId", res.data.txnId)
        window.location.href="/confirm"
        console.log(this.txnId);
      })

      

    // alert(`An OTP has been sent to ${this.state.phone}`);
  }
  // handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   var md = require('node-forge');
  //   var md = forge.md.sha256.create();
  //   md.update(this.state.otp);
  //   console.log(md.digest().toHex());


  //   // this.setState({
  //   //   otp:this.state.otp
  //   // })
  //   axios.post(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, { otp: md.digest().toHex(), txnId: localStorage.getItem("txnId") })
  //     .then(res => {
        
  //       console.log(res);
  //       this.setState({
  //         isDownloadView: true,
  //       })
  //       localStorage.setItem("AuthToken", res.data.token)
  //     })
  // }

  // handleBidSubmit = (e) => {
  //   e.preventDefault();
  //   axios({
  //     url: `https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${this.state.bid}`, //your url
  //     method: 'GET',
  //     responseType: 'blob',
  //     headers:{
  //       Authorization: "Bearer " + localStorage.getItem("AuthToken")
  //     } // important
  // }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'file.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // }
 
  render() {
    return (
      <>
        <form onSubmit={this.handleMobileSubmit}>
        <img src={logo} alt="Logo" />
          <h2>Enter your Phone Number</h2>
          <h5>An OTP will be sent to your mobile number for verification.</h5>
          <label>
            <input
              type="number"
              value={this.state.phone}
              onChange={this.handleMobileChange}
              placeholder="Your phone number Here"
            />
          </label>
          <br />
          <br />
          <button className='form-submit-button'>GET OTP</button>
        </form>
      </>
    );

  }

}
export default SignIn;