# UniSchedule Import Feature Documentation

## Overview
UniSchedule supports importing course schedules from multiple file formats: .ics (iCalendar), .json, and .txt (text).

## Supported Import Formats

### 1. ICS (iCalendar) Format

The app supports the RFC 5545 standard for iCalendar files, commonly used by Apple Calendar and Outlook.

**Example ICS Format:**
```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mi Calendar//EN

BEGIN:VEVENT
UID:course-1
DTSTART:20260323T080000
DTEND:20260323T094000
SUMMARY:窄带物联网通信技术
LOCATION:勤德楼-B401
DESCRIPTION:教师: 郑亮其他; 周数: 4-9周; 地点: 勤德楼-B401
RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20260427T094000
END:VEVENT

END:VCALENDAR
```

**Supported Fields:**
- `UID`: Unique identifier for the event
- `DTSTART`: Start date and time (format: YYYYMMDDTHHmmss)
- `DTEND`: End date and time
- `SUMMARY`: Course name
- `LOCATION`: Classroom/location
- `DESCRIPTION`: Additional information (teacher, weeks, etc.)
- `RRULE`: Recurrence rule (optional)

**Description Format:**
The parser extracts information from the description field using these patterns:
- Teacher: `教师: [Name]其他` or `教师: [Name]`
- Weeks: `周数: [X-Y]周` or `[X-Y]周`

### 2. JSON Format

Standard JSON format with an array of course objects.

**Example JSON Format:**
```json
[
  {
    "id": "course-1",
    "name": "窄带物联网通信技术",
    "room": "勤德楼-B401",
    "teacher": "郑亮",
    "day": 1,
    "startSection": 1,
    "duration": 2,
    "color": "bg-blue-100 text-blue-800 border-l-4 border-blue-400",
    "weeks": "4-9"
  }
]
```

**Field Descriptions:**
- `id`: Unique identifier (string)
- `name`: Course name (string)
- `room`: Classroom location (string)
- `teacher`: Teacher name (string)
- `day`: Day of week (1=Monday, 7=Sunday) (number)
- `startSection`: Starting time section (1-12) (number)
- `duration`: Number of sections (number)
- `color`: Tailwind CSS color classes (string)
- `weeks`: Week range (string, e.g., "1-16")

### 3. Text Format

Simple text format for course information.

**Supported Text Patterns:**

Pattern 1 (comma-separated):
```
计算机科学导论,陈教授,301教室,周一,1-2节,1-16周
微观经济学,张老师,405教室,周二,1-2节,1-16周
```

Pattern 2 (space-separated):
```
计算机科学导论 陈教授 301教室 周一 第1-2节 第1-16周
微观经济学 张老师 405教室 周二 第1-2节 第1-16周
```

**Field Order:**
1. Course name
2. Teacher name
3. Room/location
4. Day of week (周一-周日)
5. Section range (X-Y节)
6. Week range (X-Y周)

## Time Sections

The app uses 12 time sections per day:

| Section | Start Time | End Time |
|---------|------------|----------|
| 1       | 08:00      | 08:45    |
| 2       | 08:55      | 09:40    |
| 3       | 10:00      | 10:45    |
| 4       | 10:55      | 11:40    |
| 5       | 13:30      | 14:15    |
| 6       | 14:25      | 15:10    |
| 7       | 15:20      | 16:05    |
| 8       | 16:15      | 17:00    |
| 9       | 18:00      | 18:45    |
| 10      | 18:55      | 19:40    |
| 11      | 19:50      | 20:35    |
| 12      | 20:45      | 21:30    |

## How to Import

1. Click the "导入" (Import) tab in the bottom navigation
2. Choose your import method:
   - **从 .ics 导入**: For iCalendar files
   - **从 .json 导入**: For JSON files
   - **从文本导入**: For text files
3. Select your file
4. The app will parse and import the courses
5. You'll see a success message and be redirected to the schedule view

## Data Persistence

- Imported courses are automatically saved to browser localStorage
- Data persists between sessions
- Importing new courses replaces the existing schedule

## Error Handling

The app validates imported data and shows error messages for:
- Invalid file format
- Missing required fields
- Parsing errors
- Empty course lists

## Notes

- The "同步教务系统" (Sync with Educational System) feature is not yet implemented
- All times are treated as local time
- Week ranges should be in format "X-Y" (e.g., "1-16", "4-9")
- Color assignment is automatic for imported courses
