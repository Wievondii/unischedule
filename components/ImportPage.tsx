import React, { useRef, useState } from 'react';
import { FileText, Calendar, Database, RefreshCw, ChevronRight, Upload, CheckCircle, XCircle } from 'lucide-react';
import { Course } from '../types';
import { parseICS } from '../utils/icsParser';
import { parseJSON } from '../utils/jsonParser';
import { parseText } from '../utils/textParser';

interface ImportPageProps {
  onImport: (courses: Course[]) => void;
}

const ImportPage: React.FC<ImportPageProps> = ({ onImport }) => {
  const icsInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleFileSelect = async (file: File, parser: (content: string) => Course[]) => {
    try {
      setImporting(true);
      setMessage(null);
      
      const content = await file.text();
      const courses = parser(content);
      
      if (courses.length === 0) {
        throw new Error('没有找到有效的课程数据');
      }
      
      onImport(courses);
      setMessage({ type: 'success', text: `成功导入 ${courses.length} 门课程！` });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Import error:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : '导入失败，请检查文件格式'
      });
    } finally {
      setImporting(false);
    }
  };

  const handleICSImport = () => {
    icsInputRef.current?.click();
  };

  const handleJSONImport = () => {
    jsonInputRef.current?.click();
  };

  const handleTextImport = () => {
    textInputRef.current?.click();
  };

  const onICSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, parseICS);
    }
    // Reset input
    e.target.value = '';
  };

  const onJSONChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, parseJSON);
    }
    // Reset input
    e.target.value = '';
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file, parseText);
    }
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Hidden file inputs */}
      <input
        ref={icsInputRef}
        type="file"
        accept=".ics"
        onChange={onICSChange}
        style={{ display: 'none' }}
      />
      <input
        ref={jsonInputRef}
        type="file"
        accept=".json"
        onChange={onJSONChange}
        style={{ display: 'none' }}
      />
      <input
        ref={textInputRef}
        type="file"
        accept=".txt"
        onChange={onTextChange}
        style={{ display: 'none' }}
      />

      <div className="px-6 py-6 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-900">导入课程表</h1>
        <p className="text-gray-500 text-sm mt-1">支持多种格式快速生成课表</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mx-4 mt-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div className="p-4 space-y-4">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={handleICSImport}
              disabled={importing}
              className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50 disabled:opacity-50"
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">从 .ics 导入</div>
                    <div className="text-xs text-gray-400">Apple 日历 / Outlook 格式</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>

            <button 
              onClick={handleJSONImport}
              disabled={importing}
              className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50 disabled:opacity-50"
            >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Database className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">从 .json 导入</div>
                    <div className="text-xs text-gray-400">标准数据结构文件</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>

             <button 
               onClick={handleTextImport}
               disabled={importing}
               className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
             >
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
             <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <RefreshCw className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">同步教务系统</div>
                    <div className="text-xs text-gray-400">自动抓取最新课程（暂未实现）</div>
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