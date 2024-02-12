import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import '../layout/styles.css';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: '',
    role: 'USER' // Default role
  });

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8888/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8888/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <div className="background-container ">
      <div className="border1 ">
      <div className="text1">เข้าสู่ระบบ</div>
      <form className="form1" onSubmit={hdlSubmit}>
        <label className="label1">
          <div className="label">
            <span className="label-text">อีเมล :</span>
          </div>
          
          <input
            type="text"
            className="input1"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>

        <label className="label2">
          <div className="label">
            <span className="label-text">รหัสผ่าน :</span>
          </div>
          <input
            type="password"
            className="input2"
            name="password"
            value={input.password}
            onChange={hdlChange}
          /> 
        </label>

        <div className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text"></span>
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="USER"
                checked={input.role === 'USER'}
                onChange={hdlChange}
              />
              <span className="ml-2">User</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="ADMIN"
                checked={input.role === 'ADMIN'}
                onChange={hdlChange}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>

        <div className="button1">
          <button type="submit" className="">เข้าสู่ระบบ</button>
        </div>
        <div class="register-link">
       <a href="/register">สมัครใช้งาน</a>
       </div>
      </form>
      </div>
    </div>
  );
}
