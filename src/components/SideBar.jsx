import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-[30%] bg-[#1F1E1D] text-white flex flex-col border-r border-gray-700">
      <div className="h-[10%] flex items-center justify-start border-b border-gray-700 p-4">
        <h2 className="text-xl font-bold">Claude - MAC</h2>
      </div>
      <div className="h-[60%] flex-1 overflow-y-auto p-4 space-y-2">
        <button className="w-full text-left p-2 rounded hover:bg-[#343541] transition ">New Chat</button>
        <button className="w-full text-left p-2 rounded hover:bg-[#343541] transition ">History</button>
      </div>
      <div className="h-[30%] p-4 flex flex-col justify-end space-y-2  border-gray-700">
        <button className="w-full text-left p-2 rounded hover:bg-[#343541] transition bg-[#40414F]">Profile</button>
        <button className="w-full text-left p-2 rounded hover:bg-[#b87f6a] transition bg-[#CD7C5E]">Logout</button>
      </div>
    </div>
  );
}
