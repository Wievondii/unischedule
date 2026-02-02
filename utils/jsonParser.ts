import { Course } from '../types';

/**
 * Parse JSON file content into Course objects
 */
export function parseJSON(jsonContent: string): Course[] {
  try {
    const data = JSON.parse(jsonContent);
    
    // Check if it's already in the correct format
    if (Array.isArray(data)) {
      return validateCourses(data);
    }
    
    // Check if it has a courses property
    if (data.courses && Array.isArray(data.courses)) {
      return validateCourses(data.courses);
    }
    
    throw new Error('Invalid JSON format: expected an array of courses or an object with a courses property');
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error;
  }
}

/**
 * Validate and normalize course data
 */
function validateCourses(courses: any[]): Course[] {
  return courses.map((course, index) => {
    // Ensure all required fields exist
    if (!course.name || !course.room || !course.teacher) {
      throw new Error(`Invalid course at index ${index}: missing required fields`);
    }
    
    return {
      id: course.id || `json-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: course.name,
      room: course.room,
      teacher: course.teacher,
      day: Number(course.day) || 1,
      startSection: Number(course.startSection) || 1,
      duration: Number(course.duration) || 1,
      color: course.color || 'bg-blue-100 text-blue-800 border-l-4 border-blue-400',
      weeks: course.weeks || '1-16',
    };
  });
}

/**
 * Export courses to JSON format
 */
export function exportToJSON(courses: Course[]): string {
  return JSON.stringify(courses, null, 2);
}
