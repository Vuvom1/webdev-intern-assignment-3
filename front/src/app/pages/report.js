import React from 'react';
import axiosInstance from '../axios/axiosInstance';
import { API_URLS } from '../constants/apiUrl';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const SCORE_LEVELS = [">=8", "6-8", "4-6", "<4"];
const SUBJECTS = [
  "toan", "ngu_van", "ngoai_ngu", "vat_li", "hoa_hoc", "sinh_hoc", "lich_su", "dia_li", "gdcd"
];
const SUBJECT_LABELS = {
  toan: "Toán",
  ngu_van: "Ngữ văn",
  ngoai_ngu: "Ngoại ngữ",
  vat_li: "Vật lí",
  hoa_hoc: "Hóa học",
  sinh_hoc: "Sinh học",
  lich_su: "Lịch sử",
  dia_li: "Địa lí",
  gdcd: "GDCD"
};

function transformData(data) {
  // Returns array of { level, toan, ngu_van, ... }
  return SCORE_LEVELS.map(level => {
    const row = { level };
    SUBJECTS.forEach(sub => {
      row[sub] = data[sub]?.[level] || 0;
    });
    return row;
  });
}

const Report = () => {
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [top10, setTop10] = React.useState([]);
  const [loadingTop10, setLoadingTop10] = React.useState(false);
  const [errorTop10, setErrorTop10] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    axiosInstance.get(API_URLS.REPORT_SCORE_LEVELS)
      .then(res => setChartData(transformData(res.data)))
      .catch(() => setError('Không thể tải dữ liệu báo cáo.'))
      .finally(() => setLoading(false));

    setLoadingTop10(true);
    axiosInstance.get(API_URLS.TOP10_GROUP_A)
      .then(res => setTop10(res.data))
      .catch(() => setErrorTop10('Không thể tải top 10 khối A.'))
      .finally(() => setLoadingTop10(false));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Báo cáo phân mức điểm các môn</h2>
      {loading && <div>Đang tải dữ liệu...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Legend />
            {SUBJECTS.map(sub => (
              <Bar key={sub} dataKey={sub} name={SUBJECT_LABELS[sub]} fill={getColor(sub)} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">Top 10 khối A</h2>
      {loadingTop10 && <div>Đang tải top 10...</div>}
      {errorTop10 && <div className="text-red-600">{errorTop10}</div>}
      {!loadingTop10 && !errorTop10 && top10.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-3 py-2 border">#</th>
                <th className="px-3 py-2 border">SBD</th>
                <th className="px-3 py-2 border">Toán</th>
                <th className="px-3 py-2 border">Lý</th>
                <th className="px-3 py-2 border">Hóa</th>
                <th className="px-3 py-2 border">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((item, idx) => (
                <tr key={item.sbd} className={
                  idx === 0 ? "bg-yellow-100" :
                  idx === 1 ? "bg-gray-200" :
                  idx === 2 ? "bg-orange-100" :
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }>
                  <td className="px-3 py-2 border text-center font-bold text-blue-700">{idx + 1}</td>
                  <td className="px-3 py-2 border font-mono text-blue-900">{item.sbd}</td>
                  <td className="px-3 py-2 border text-center font-bold text-gray-900">{item.toan}</td>
                  <td className="px-3 py-2 border text-center font-bold text-gray-900">{item.vat_li ?? item.ly}</td>
                  <td className="px-3 py-2 border text-center font-bold text-gray-900">{item.hoa_hoc ?? item.hoa}</td>
                  <td className="px-3 py-2 border text-center font-bold text-green-700">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

function getColor(sub) {
  // Assign a unique color for each subject
  const colors = [
    '#2563eb', '#f59e42', '#10b981', '#e11d48', '#6366f1', '#fbbf24', '#14b8a6', '#a21caf', '#f43f5e'
  ];
  return colors[SUBJECTS.indexOf(sub) % colors.length];
}

export default Report;
