import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from './components/Signin/SignIn';
import ConfirmOTP from './components/ConfirmOtp/ConfirmOtp';
import DownloadCertificate from './components/DownloadCertificate/DownloadCerticate';
function App() {
  
  return (
    <div className="content">   
    <Routes>
      <Route exact path= "/signIn" element={<SignIn /> }/>
      <Route exact path= "/confirm" element={<ConfirmOTP /> }/>
      <Route exact path= "/download" element={<DownloadCertificate /> }/>
    </Routes>
    </div >
  
  );
}

export default App;
