import React, { useMemo } from 'react';
import { Course, TimeSlot, SettingsState } from '../types';
import { TIME_SLOTS, DAYS } from '../constants';
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react';

interface ScheduleGridProps {
  courses: Course[];
  settings: SettingsState;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ courses, settings, currentWeek, setCurrentWeek }) => {
  // Determine displayed days based on settings
  const daysToShow = settings.showWeekends ? 7 : 5;
  const displayedDays = DAYS.slice(0, daysToShow);

  // Helper to find course at specific slot
  const getCourseAtSlot = (dayIndex: number, section: number) => {
    return courses.find(c => c.day === dayIndex + 1 && c.startSection === section);
  };

  // Helper to check if a slot is occupied by a multi-hour course started earlier
  const isSlotOccupied = (dayIndex: number, section: number) => {
    return courses.some(c => 
      c.day === dayIndex + 1 && 
      c.startSection < section && 
      c.startSection + c.duration > section
    );
  };

  const handlePrevWeek = () => {
    if (currentWeek > 1) setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    if (currentWeek < settings.totalWeeks) setCurrentWeek(currentWeek + 1);
  };

  // Mock Date Generator for the header
  const getDayDate = (dayIndex: number) => {
    // This is a mock date calculation relative to a fixed start
    const baseMonth = 3; // March
    const baseDay = 2;   // 2nd
    const offset = (currentWeek - 1) * 7 + dayIndex;
    const date = new Date(2025, baseMonth - 1, baseDay + offset);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Week Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-20">
        <button onClick={handlePrevWeek} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">第 {currentWeek} 周</h2>
          <span className="text-xs text-gray-500">2024-2025学年 春季学期</span>
        </div>
        <button onClick={handleNextWeek} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-[3rem_repeat(5,1fr)] sticky top-[60px] z-10 bg-gray-50 border-b">
         {/* Empty corner */}
         <div className="p-2 border-r bg-gray-50 flex flex-col justify-center items-center text-xs text-gray-400">
             <span>{new Date().getMonth() + 1}月</span>
         </div>
         {displayedDays.map((day, index) => (
             <div key={day} className="flex flex-col items-center justify-center py-2 text-center border-r last:border-r-0">
                 <span className="text-sm font-medium text-gray-700">{day}</span>
                 <span className="text-xs text-gray-500">{getDayDate(index)}</span>
             </div>
         ))}
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-[3rem_repeat(5,1fr)] relative">
          {TIME_SLOTS.map((slot, rowIndex) => (
            <React.Fragment key={slot.section}>
              {/* Time Column */}
              <div className="flex flex-col items-center justify-center border-b border-r py-1 h-20 text-xs text-gray-500 bg-gray-50">
                <span className="font-bold">{slot.section}</span>
                <span className="scale-90">{slot.startTime}</span>
                <span className="scale-90">{slot.endTime}</span>
              </div>

              {/* Course Columns */}
              {displayedDays.map((_, dayIndex) => {
                const course = getCourseAtSlot(dayIndex, slot.section);
                const occupied = isSlotOccupied(dayIndex, slot.section);

                if (occupied) return null; // Render nothing if occupied by a spanning cell

                if (course) {
                  return (
                    <div 
                        key={`${dayIndex}-${slot.section}`} 
                        className="p-1 border-r border-b relative"
                        style={{ gridRow: `span ${course.duration}` }}
                    >
                      <div className={`w-full h-full rounded-lg p-2 flex flex-col justify-between overflow-hidden shadow-sm ${course.color} transition-transform active:scale-95`}>
                        <div>
                            <div className="font-bold text-xs leading-tight mb-1 line-clamp-2">{course.name}</div>
                            <div className="text-[10px] opacity-90 flex items-center gap-1">
                                <span>@{course.room}</span>
                            </div>
                        </div>
                        <div className="text-[10px] opacity-80 mt-1">
                            {course.teacher}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Empty Slot
                return (
                  <div key={`${dayIndex}-${slot.section}`} className="border-b border-r bg-white" />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;