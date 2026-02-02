import React from 'react';
import { Course, TimeSlot } from '../types';
import { TIME_SLOTS, DAYS } from '../constants';
import { CalendarDays, MapPin, Clock } from 'lucide-react';

interface DailyViewProps {
  courses: Course[];
  currentDate: Date; // For demo purposes, we might just assume current date logic
}

const DailyView: React.FC<DailyViewProps> = ({ courses }) => {
  // Mock: Assume today is Monday (day 1) for visualization if actual day is weekend
  const dayOfWeek = new Date().getDay() || 7; 
  const displayDay = dayOfWeek > 5 ? 1 : dayOfWeek; 
  
  const todaysCourses = courses.filter(c => c.day === displayDay);

  // Group by periods (Morning, Afternoon, Evening)
  const periods = [
    { name: '上午课程', range: [1, 4] },
    { name: '下午课程', range: [5, 8] },
    { name: '晚上课程', range: [9, 12] },
  ];

  // Helper to generate the schedule items for a specific period range
  const renderPeriodItems = (start: number, end: number) => {
    const items = [];
    let currentSection = start;

    while (currentSection <= end) {
      const course = todaysCourses.find(c => c.startSection === currentSection);
      const slot = TIME_SLOTS.find(s => s.section === currentSection);
      
      if (!slot) {
        currentSection++;
        continue;
      }

      if (course) {
        // Find end time
        const endSlot = TIME_SLOTS.find(s => s.section === course.startSection + course.duration - 1);
        
        items.push(
          <div key={course.id} className="flex mb-6 last:mb-0 group">
             <div className="w-16 flex flex-col text-sm text-gray-500 font-medium pt-1">
               <span>{slot.startTime}</span>
               <span className="text-gray-400 text-xs">{endSlot?.endTime}</span>
             </div>
             <div className="w-1 bg-blue-500 rounded-full mx-4 relative">
                <div className="absolute top-2 -left-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
             </div>
             <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
               <h3 className="font-bold text-gray-800 text-lg mb-1">{course.name}</h3>
               <div className="flex items-center gap-3 text-sm text-gray-500">
                 <div className="flex items-center gap-1">
                   <MapPin className="w-3 h-3" />
                   {course.room}
                 </div>
                 <div className="flex items-center gap-1">
                   <Clock className="w-3 h-3" />
                   第{course.startSection}-{course.startSection + course.duration - 1}节
                 </div>
               </div>
             </div>
          </div>
        );
        currentSection += course.duration;
      } else {
        // Free block Logic: 
        // Simplification: Just show one "Free" block if multiple slots are empty or per slot?
        // Image shows per major block start.
        // Let's just list the slot as "Free"
        items.push(
          <div key={`free-${currentSection}`} className="flex mb-6 last:mb-0 opacity-60">
             <div className="w-16 flex flex-col text-sm text-gray-400 pt-1">
               <span>{slot.startTime}</span>
               <span className="text-xs">{slot.endTime}</span>
             </div>
             <div className="w-1 bg-gray-200 rounded-full mx-4"></div>
             <div className="flex-1 py-1">
               <span className="text-gray-400 font-medium text-lg">空闲</span>
               <div className="text-xs text-gray-300">第{currentSection}节</div>
             </div>
          </div>
        );
        currentSection++;
      }
    }
    return items;
  };

  const todayDateStr = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="h-full bg-blue-500 flex flex-col">
       {/* Header */}
       <div className="px-6 py-8 text-white">
          <h1 className="text-3xl font-bold tracking-tight">今日日程</h1>
          <p className="mt-2 opacity-90 text-blue-100">{todayDateStr}</p>
       </div>

       {/* Content Sheet */}
       <div className="flex-1 bg-white rounded-t-[2.5rem] overflow-y-auto no-scrollbar px-6 pt-8 pb-20">
          {periods.map((period) => (
            <div key={period.name} className="mb-8">
              <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">{period.name}</h2>
              <div className="pl-2">
                {renderPeriodItems(period.range[0], period.range[1])}
              </div>
            </div>
          ))}
          
          {/* Empty state filler */}
          <div className="h-10"></div>
       </div>
    </div>
  );
};

export default DailyView;