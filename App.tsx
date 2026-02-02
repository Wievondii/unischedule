import React, { useState } from 'react';
import { Tab, ViewMode, SettingsState, Course } from './types';
import { MOCK_COURSES } from './constants';
import ScheduleGrid from './components/ScheduleGrid';
import DailyView from './components/DailyView';
import SettingsPage from './components/SettingsPage';
import ImportPage from './components/ImportPage';
import { Grid3X3, Calendar as CalendarIcon, Settings, Download, List } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SCHEDULE);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.WEEKLY);
  const [currentWeek, setCurrentWeek] = useState(1);
  
  const [settings, setSettings] = useState<SettingsState>({
    showWeekends: false,
    showNonCurrentWeek: true,
    darkMode: false,
    semesterStartDate: '2025-03-02',
    totalWeeks: 24
  });

  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.SCHEDULE:
        return viewMode === ViewMode.WEEKLY 
          ? <ScheduleGrid 
              courses={courses} 
              settings={settings} 
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
          : <DailyView 
              courses={courses}
              currentDate={new Date()}
            />;
      case Tab.IMPORT:
        return <ImportPage />;
      case Tab.SETTINGS:
        return <SettingsPage settings={settings} setSettings={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col ${settings.darkMode ? 'dark' : ''}`}>
      <div className="flex-1 overflow-hidden relative max-w-md mx-auto w-full bg-white shadow-2xl md:my-8 md:rounded-[3rem] md:h-[calc(100vh-4rem)] md:border-8 md:border-gray-900">
         
         {/* Top Mobile Status Bar Simulator (Only visible in desktop frame) */}
         <div className="hidden md:flex justify-between items-center px-8 pt-4 pb-2 bg-transparent absolute top-0 w-full z-50 pointer-events-none">
             <span className="font-semibold text-sm text-black">9:41</span>
             <div className="flex gap-1.5">
                 <div className="w-4 h-4 rounded-full border border-gray-900 opacity-20"></div>
                 <div className="w-4 h-4 rounded-full border border-gray-900 opacity-20"></div>
                 <div className="w-6 h-3 rounded-md border border-gray-900 flex items-center px-0.5">
                     <div className="w-full h-full bg-gray-900 rounded-[1px]"></div>
                 </div>
             </div>
         </div>
        
         {/* Main Content Area */}
         <div className="h-full flex flex-col pt-0 md:pt-10">
            {/* View Toggle (Only shown on Schedule Tab) */}
            {activeTab === Tab.SCHEDULE && (
              <div className="absolute bottom-20 right-6 z-30">
                <button 
                  onClick={() => setViewMode(viewMode === ViewMode.WEEKLY ? ViewMode.DAILY : ViewMode.WEEKLY)}
                  className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white hover:bg-blue-700 transition-transform active:scale-90"
                >
                  {viewMode === ViewMode.WEEKLY ? <List className="w-6 h-6" /> : <Grid3X3 className="w-6 h-6" />}
                </button>
              </div>
            )}

            <main className="flex-1 overflow-hidden">
               {renderContent()}
            </main>

            {/* Bottom Navigation */}
            <nav className="bg-white border-t border-gray-100 flex items-center justify-around pb-6 pt-3 px-2 md:rounded-b-[2.5rem]">
              <button 
                onClick={() => setActiveTab(Tab.SCHEDULE)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === Tab.SCHEDULE ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <CalendarIcon className={`w-6 h-6 ${activeTab === Tab.SCHEDULE ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-medium">课程表</span>
              </button>

              <button 
                onClick={() => setActiveTab(Tab.IMPORT)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === Tab.IMPORT ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Download className="w-6 h-6" />
                <span className="text-[10px] font-medium">导入</span>
              </button>

              <button 
                onClick={() => setActiveTab(Tab.SETTINGS)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === Tab.SETTINGS ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Settings className={`w-6 h-6 ${activeTab === Tab.SETTINGS ? 'animate-spin-slow' : ''}`} />
                <span className="text-[10px] font-medium">设置</span>
              </button>
            </nav>
         </div>
      </div>
    </div>
  );
}

export default App;