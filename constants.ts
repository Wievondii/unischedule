import { Course, TimeSlot } from './types';

export const TIME_SLOTS: TimeSlot[] = [
  { section: 1, startTime: '08:00', endTime: '08:45' },
  { section: 2, startTime: '08:55', endTime: '09:40' },
  { section: 3, startTime: '10:00', endTime: '10:45' },
  { section: 4, startTime: '10:55', endTime: '11:40' },
  { section: 5, startTime: '13:30', endTime: '14:15' },
  { section: 6, startTime: '14:25', endTime: '15:10' },
  { section: 7, startTime: '15:20', endTime: '16:05' },
  { section: 8, startTime: '16:15', endTime: '17:00' },
  { section: 9, startTime: '18:00', endTime: '18:45' },
  { section: 10, startTime: '18:55', endTime: '19:40' },
  { section: 11, startTime: '19:50', endTime: '20:35' },
  { section: 12, startTime: '20:45', endTime: '21:30' },
  { section: 13, startTime: '21:40', endTime: '22:25' },
  { section: 14, startTime: '22:35', endTime: '23:20' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    name: '计算机科学导论',
    room: '301教室',
    teacher: '陈教授',
    day: 1,
    startSection: 1,
    duration: 2,
    color: 'bg-blue-100 text-blue-800 border-l-4 border-blue-400',
    weeks: '1-16'
  },
  {
    id: '2',
    name: '微观经济学',
    room: '405教室',
    teacher: '张老师',
    day: 2,
    startSection: 1,
    duration: 2,
    color: 'bg-orange-100 text-orange-800 border-l-4 border-orange-400',
    weeks: '1-16'
  },
  {
    id: '3',
    name: '数据结构与算法',
    room: '204机房',
    teacher: '戴教授',
    day: 2,
    startSection: 3,
    duration: 2,
    color: 'bg-green-100 text-green-800 border-l-4 border-green-400',
    weeks: '1-16'
  },
  {
    id: '4',
    name: '大学物理 II',
    room: '实验楼3',
    teacher: '李博士',
    day: 4,
    startSection: 3,
    duration: 2,
    color: 'bg-red-100 text-red-800 border-l-4 border-red-400',
    weeks: '1-16'
  },
  {
    id: '5',
    name: '设计原理',
    room: 'A栋画室',
    teacher: '王讲师',
    day: 1,
    startSection: 3,
    duration: 3,
    color: 'bg-pink-100 text-pink-800 border-l-4 border-pink-400',
    weeks: '1-8'
  },
  {
    id: '6',
    name: '高等数学 I',
    room: '110阶梯教室',
    teacher: '汤姆森',
    day: 3,
    startSection: 5,
    duration: 2,
    color: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400',
    weeks: '1-16'
  },
  {
    id: '7',
    name: '艺术史',
    room: 'B栋报告厅',
    teacher: '金教授',
    day: 2,
    startSection: 6,
    duration: 2,
    color: 'bg-purple-100 text-purple-800 border-l-4 border-purple-400',
    weeks: '9-16'
  },
  {
    id: '8',
    name: '创意写作',
    room: '212教室',
    teacher: '威廉姆斯',
    day: 4,
    startSection: 7,
    duration: 2,
    color: 'bg-teal-100 text-teal-800 border-l-4 border-teal-400',
    weeks: '1-16'
  },
  {
    id: '9',
    name: '形势与政策',
    room: '网络授课',
    teacher: '马老师',
    day: 5,
    startSection: 9,
    duration: 2,
    color: 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-400',
    weeks: '4-9'
  }
];

export const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
