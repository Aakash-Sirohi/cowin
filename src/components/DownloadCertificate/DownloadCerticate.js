import React, { Component } from "react";
import logo from '../../Logo.png';
import axios from "axios";
import forge from "node-forge/lib/forge";
import history from "../history";


class DownloadCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: '',
    };
    }
    handleBidChange = (e) => {
     console.log(e.target.value);
     this.setState({ bid: e.target.value });
   }
    handleBidSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${this.state.bid}`, //your url
      method: 'GET',
      responseType: 'blob',
      headers:{
        Authorization: "Bearer " + localStorage.getItem("AuthToken")
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    });
  }
 
  render() {
    return (
      <>
        <form onSubmit={this.handleBidSubmit}>
        <img src={logo} alt="Logo" />
        <h2>Enter your Benefieciary Id Number</h2>
          <h5>Enter Benefieciary ID linked to your Mobile Number</h5>
            <label>
              <input
                type="number"
                value={this.state.bid}
                onChange={this.handleBidChange}
                placeholder="Enter the Benefieciary ID"
              />
            </label>
            <br />
            <br />
            <button className='otp-submit-button'>Download Certificate</button>
          </form>
      </>
    );

  }

}
export default DownloadCertificate;