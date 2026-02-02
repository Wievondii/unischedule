import { Course } from '../types';

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
 * Parse text content into Course objects
 * Supports various text formats for course information
 */
export function parseText(textContent: string): Course[] {
  const courses: Course[] = [];
  
  // Try to parse line by line
  const lines = textContent.split(/\r?\n/).filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Try different patterns
    const course = parseCourseLine(line, i);
    if (course) {
      courses.push(course);
    }
  }
  
  return courses;
}

/**
 * Parse a single line of course text
 */
function parseCourseLine(line: string, index: number): Course | null {
  try {
    // Pattern 1: Course name, teacher, room, day, time
    // Example: 计算机科学导论,陈教授,301教室,周一,1-2节,1-16周
    const pattern1 = /^(.+?)[,，](.+?)[,，](.+?)[,，](周[一二三四五六日])[,，](\d+-\d+)节[,，](\d+-\d+)周?$/;
    const match1 = line.match(pattern1);
    if (match1) {
      const [, name, teacher, room, dayStr, sections, weeks] = match1;
      const day = parseDayString(dayStr);
      const [startSection, endSection] = sections.split('-').map(Number);
      const duration = endSection - startSection + 1;
      
      return {
        id: `course-${Date.now()}-${index}`,
        name: name.trim(),
        teacher: teacher.trim(),
        room: room.trim(),
        day,
        startSection,
        duration,
        color: COLORS[index % COLORS.length],
        weeks: weeks.trim(),
      };
    }
    
    // Pattern 2: More flexible format
    // Example: 计算机科学导论 陈教授 301教室 周一 第1-2节 第1-16周
    const pattern2 = /^(.+?)\s+(.+?)\s+(.+?)\s+(周[一二三四五六日])\s+(?:第)?(\d+-\d+)节\s+(?:第)?(\d+-\d+)周?$/;
    const match2 = line.match(pattern2);
    if (match2) {
      const [, name, teacher, room, dayStr, sections, weeks] = match2;
      const day = parseDayString(dayStr);
      const [startSection, endSection] = sections.split('-').map(Number);
      const duration = endSection - startSection + 1;
      
      return {
        id: `course-${Date.now()}-${index}`,
        name: name.trim(),
        teacher: teacher.trim(),
        room: room.trim(),
        day,
        startSection,
        duration,
        color: COLORS[index % COLORS.length],
        weeks: weeks.trim(),
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing course line:', error, line);
    return null;
  }
}

/**
 * Convert day string to day number
 */
function parseDayString(dayStr: string): number {
  const dayMap: { [key: string]: number } = {
    '周一': 1,
    '周二': 2,
    '周三': 3,
    '周四': 4,
    '周五': 5,
    '周六': 6,
    '周日': 7,
  };
  
  return dayMap[dayStr] || 1;
}
