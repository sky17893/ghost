import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import favi from '../../assets/medi_favi.png'
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const Mypage = ({ user, onClose, onLogout }) => {
  const modalRef = useRef()
  console.log(user)

  const handleLogout = () => {
    onLogout()
    onClose()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  if (!user) {
    return (
      <div ref={modalRef} className="absolute right-0 top-full w-60 bg-white rounded-lg p-4 z-60 webkit-z-60 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_-2px_6px_rgba(0,0,0,0.05)]">
        <div className="flex justify-end">
          <IoClose onClick={onClose} className="cursor-pointer text-xl text-gray-500 hover:text-black" />
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 my-1 flex justify-center items-center">
            <img src={favi} alt="" className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold mt-2">guest</h3>
        </div>
        
        <span className="mb-4 border-b-2 border-blue-200 w-3/5 block mx-auto"></span>

        <ul className="space-y-2">
        <Link to="/login" onClick={onClose}>
          <li className="p-1 hover:bg-blue-50 rounded flex items-center justify-between">
            로그인
            <LuLogIn />
          </li>
        </Link>
        </ul>
      </div>
    );
  }


  return (
    <div ref={modalRef} className="absolute right-0 top-full w-60 bg-white rounded-lg p-4 z-50 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_-2px_6px_rgba(0,0,0,0.05)]">
      <div className="flex justify-end">
        <IoClose onClick={onClose} className="cursor-pointer text-xl text-gray-500 hover:text-black" />
      </div>
      
      <div className="flex flex-col items-center mb-3">
        <div className="w-20 h-20 rounded-full bg-blue-100 my-1 flex justify-center items-center">
          <img src={favi} alt="" className="w-12 h-12" />
        </div>
        <h3 className="text-base font-bold mt-4">{user?.email}</h3>
      </div>
      
      <span className="mb-4 border-b-2 border-blue-200 w-3/5 block mx-auto"></span>

      <ul className="space-y-2">
        <Link to="/mymedi_list" onClick={onClose}>
          <li className="p-1 hover:bg-blue-50 rounded mb-1">
            약품 관리
          </li>
        </Link>
        <Link to="/newpage" onClick={onClose}>
          <li className="p-1 hover:bg-blue-50 rounded mb-1">
            열람 목록
          </li>
        </Link>
        <Link to="/memberinfo" onClick={onClose}>
          <li className="p-1 hover:bg-blue-50 rounded mb-1">
            비밀번호 변경
          </li>
        </Link>
        <Link onClick={handleLogout} to="/">
          <li className="p-1 hover:bg-blue-50 rounded flex items-center justify-between mb-1">
            로그아웃
            <LuLogOut />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Mypage;