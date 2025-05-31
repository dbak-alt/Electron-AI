import React from 'react';
import ChatWindow from './components/ChatWindow';
import './index.css'; // Tailwind CSS
import Sidebar from './components/SideBar';

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
