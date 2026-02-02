import React from 'react';
import { FileText, Calendar, Database, RefreshCw, ChevronRight } from 'lucide-react';

const ImportPage: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="px-6 py-6 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-900">导入课程表</h1>
        <p className="text-gray-500 text-sm mt-1">支持多种格式快速生成课表</p>
      </div>

      <div className="p-4 space-y-4">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">从 .ics 导入</div>
                    <div className="text-xs text-gray-400">Apple 日历 / Outlook 格式</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>

            <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Database className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">从 .json 导入</div>
                    <div className="text-xs text-gray-400">标准数据结构文件</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>

             <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">从文本导入</div>
                    <div className="text-xs text-gray-400">智能识别课程文本信息</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <RefreshCw className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">同步教务系统</div>
                    <div className="text-xs text-gray-400">自动抓取最新课程</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
        </div>

        <div className="mt-8 text-center px-8">
            <p className="text-xs text-gray-400 leading-relaxed">
                请确保导入的文件格式正确。对于 .ics 文件，我们支持 RFC 5545 标准。如有问题请联系技术支持。
            </p>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;