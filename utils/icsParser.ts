import { Course } from '../types';
import { TIME_SLOTS } from '../constants';

interface ICSEvent {
  uid: string;
  dtstart: string;
  dtend: string;
  summary: string;
  location: string;
  description: string;
  rrule?: string;
}

// Color palette for courses
const COLORS = [
  'bg-blue-100 text-blue-800 border-l-4 border-blue-400',
  'bg-green-100 text-green-800 border-l-4 border-green-400',
  'bg-orange-100 text-orange-800 border-l-4 border-orange-400',
  'bg-red-100 text-red-800 border-l-4 border-red-400',
  'bg-purple-100 text-purple-800 border-l-4 border-purple-400',
  'bg-pink-100 text-pink-800 border-l-4 border-pink-400',
  'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400',
  'bg-teal-100 text-teal-800 border-l-4 border-teal-400',
  'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-400',
];

/**
 * Parse an .ics file content into Course objects
 */
export function parseICS(icsContent: string): Course[] {
  const courses: Course[] = [];
  const events = extractEvents(icsContent);
  
  events.forEach((event, index) => {
    const course = convertEventToCourse(event, index);
    if (course) {
      courses.push(course);
    }
  });
  
  return courses;
}

/**
 * Extract VEVENT blocks from ICS content
 */
function extractEvents(icsContent: string): ICSEvent[] {
  const events: ICSEvent[] = [];
  const lines = icsContent.split(/\r?\n/);
  
  let inEvent = false;
  let currentEvent: Partial<ICSEvent> = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {};
    } else if (line === 'END:VEVENT' && inEvent) {
      if (currentEvent.uid && currentEvent.dtstart && currentEvent.summary) {
        events.push(currentEvent as ICSEvent);
      }
      inEvent = false;
    } else if (inEvent) {
      // Parse event properties
      if (line.startsWith('UID:')) {
        currentEvent.uid = line.substring(4);
      } else if (line.startsWith('DTSTART:')) {
        currentEvent.dtstart = line.substring(8);
      } else if (line.startsWith('DTEND:')) {
        currentEvent.dtend = line.substring(6);
      } else if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location = line.substring(9);
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
      } else if (line.startsWith('RRULE:')) {
        currentEvent.rrule = line.substring(6);
      }
    }
  }
  
  return events;
}

/**
 * Convert ICS event to Course object
 */
function convertEventToCourse(event: ICSEvent, index: number): Course | null {
  try {
    // Parse start time
    const startTime = parseICSDateTime(event.dtstart);
    const endTime = parseICSDateTime(event.dtend);
    
    // Get day of week (1 = Monday, 7 = Sunday)
    const dayOfWeek = startTime.getDay();
    const day = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert Sunday from 0 to 7
    
    // Find matching time slot based on start time
    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();
    const startSection = findTimeSection(startHour, startMinute);
    
    // Calculate duration in sections
    const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const duration = Math.ceil(durationMinutes / 45); // Approximate sections (45 min each)
    
    // Extract weeks from description
    const weeks = extractWeeks(event.description);
    
    // Extract teacher from description
    const teacher = extractTeacher(event.description) || '未知';
    
    // Get color from palette
    const color = COLORS[index % COLORS.length];
    
    return {
      id: event.uid || `course-${index}`,
      name: event.summary,
      room: event.location || '未指定',
      teacher: teacher,
      day: day,
      startSection: startSection,
      duration: duration,
      color: color,
      weeks: weeks,
    };
  } catch (error) {
    console.error('Error converting event to course:', error, event);
    return null;
  }
}

/**
 * Parse ICS datetime format (e.g., 20260323T080000)
 */
function parseICSDateTime(dateTimeStr: string): Date {
  // Format: YYYYMMDDTHHmmss
  const year = parseInt(dateTimeStr.substring(0, 4));
  const month = parseInt(dateTimeStr.substring(4, 6)) - 1; // Months are 0-indexed
  const day = parseInt(dateTimeStr.substring(6, 8));
  const hour = parseInt(dateTimeStr.substring(9, 11));
  const minute = parseInt(dateTimeStr.substring(11, 13));
  const second = parseInt(dateTimeStr.substring(13, 15));
  
  return new Date(year, month, day, hour, minute, second);
}

/**
 * Find the time section number based on hour and minute
 */
function findTimeSection(hour: number, minute: number): number {
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  // Find the closest matching time slot
  for (let i = 0; i < TIME_SLOTS.length; i++) {
    if (TIME_SLOTS[i].startTime === timeStr) {
      return TIME_SLOTS[i].section;
    }
  }
  
  // If no exact match, find the nearest section
  const totalMinutes = hour * 60 + minute;
  for (let i = 0; i < TIME_SLOTS.length; i++) {
    const [slotHour, slotMinute] = TIME_SLOTS[i].startTime.split(':').map(Number);
    const slotTotalMinutes = slotHour * 60 + slotMinute;
    if (slotTotalMinutes >= totalMinutes) {
      return TIME_SLOTS[i].section;
    }
  }
  
  return 1; // Default to first section
}

/**
 * Extract weeks information from description
 */
function extractWeeks(description: string): string {
  if (!description) return '1-16';
  
  // Look for patterns like "4-9周" or "13-14周"
  const weekMatch = description.match(/周数:\s*(\d+-\d+)周/);
  if (weekMatch) {
    return weekMatch[1];
  }
  
  // Look for patterns like "4-9" without 周
  const simpleMatch = description.match(/(\d+-\d+)/);
  if (simpleMatch) {
    return simpleMatch[1];
  }
  
  return '1-16'; // Default
}

/**
 * Extract teacher name from description
 */
function extractTeacher(description: string): string | null {
  if (!description) return null;
  
  // Look for pattern like "教师: 郑亮其他" or "教师: 刘振涛其他"
  const teacherMatch = description.match(/教师:\s*([^;]+)/);
  if (teacherMatch) {
    // Remove "其他" suffix if present
    return teacherMatch[1].replace(/其他$/, '').trim();
  }
  
  return null;
}
