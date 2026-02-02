import React from 'react';
import { SettingsState } from '../types';
import { ChevronRight, Calendar, Moon, LayoutGrid, Clock } from 'lucide-react';

interface SettingsPageProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings }) => {
  
  const toggleSetting = (key: keyof SettingsState) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto no-scrollbar">
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 border-b">
        <h1 className="text-xl font-bold text-center w-full">课程表设置</h1>
      </div>

      <div className="p-4 space-y-6 pb-24">
        
        {/* Section 1: Basic */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-2">基本设置</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            <div className="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">开始上课时间</span>
                <span className="text-xs text-gray-400">2026/03/02</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">当前周数</span>
                <span className="text-xs text-gray-400">假期中</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>

            <div className="p-4 flex items-center justify-between active:bg-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">本学期总周数</span>
                <span className="text-xs text-gray-400">{settings.totalWeeks} 周</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Section 2: Display */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-2">显示设置</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Toggle Item */}
            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">是否显示周末</span>
                <span className="text-xs text-gray-400">如果周末有课程，可打开该设置</span>
              </div>
              <button 
                onClick={() => toggleSetting('showWeekends')}
                className={`w-12 h-7 rounded-full transition-colors relative ${settings.showWeekends ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform ${settings.showWeekends ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">是否显示非本周课程</span>
                <span className="text-xs text-gray-400">开启后单双周课程都可以看见</span>
              </div>
              <button 
                onClick={() => toggleSetting('showNonCurrentWeek')}
                className={`w-12 h-7 rounded-full transition-colors relative ${settings.showNonCurrentWeek ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform ${settings.showNonCurrentWeek ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

             <div className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">深色模式</span>
                <span className="text-xs text-gray-400">界面切换为深色风格</span>
              </div>
              <button 
                onClick={() => toggleSetting('darkMode')}
                className={`w-12 h-7 rounded-full transition-colors relative ${settings.darkMode ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform ${settings.darkMode ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

          </div>
        </div>

        {/* Section 3: Advanced */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-2">高级设置</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">课表节数设置</span>
                <span className="text-xs text-gray-400">自定义每天的课程节数</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
             <div className="p-4 flex items-center justify-between active:bg-gray-50">
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">设置每周起始日</span>
                <span className="text-xs text-gray-400">周日也可以作为一周的起始啦</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;