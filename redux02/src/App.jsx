// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './component/Login';
import ProtectedLogin from './component/Protected-login';
import ProtectedVedio from './component/Protected-vedio';
import SignUp from './component/Signup';
import SignUpSec from './component/SignupSec';
import CallScreen from './component1/callScreen';
import Home from './component1/Home';
import VideoScreen from './component1/vedio-calling';
import { SocketProvider } from './Socket';

const App = () => {
  
  return (
   <SocketProvider>
  
     <Router>
      <Routes>
        <Route path="/" element={
            <ProtectedVedio>

                <Home />
            </ProtectedVedio>
            } />
         
             <Route path="/login" element={
                <ProtectedLogin>

   <Login/>
                </ProtectedLogin>
       
} />
        <Route path="/signup" element={<ProtectedLogin>
           <SignUp/>
        </ProtectedLogin>
           } />
        <Route path="/signupSec" element={<ProtectedLogin>
           <SignUpSec/>
        </ProtectedLogin>
           } />
        <Route path="/callScreen" element={
            <ProtectedVedio>

                <CallScreen/>
            </ProtectedVedio>
            } />
        <Route path="/vedio-conference" element={
            <ProtectedVedio>

           <VideoScreen/>  
            </ProtectedVedio>
         } />       
      </Routes>
     
    </Router>
    </SocketProvider>
  );
};

export default App;

