import React from 'react';
import axiosInstance from '../axios/axiosInstance';
import { API_URLS } from '../constants/apiUrl';

const SearchScores = () => {
  const [sbd, setSbd] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await axiosInstance.get(API_URLS.STUDENT_SCORES(sbd));
      setResult(data);
    } catch (err) {
      setError('Không tìm thấy SBD hoặc có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Tìm kiếm điểm theo SBD</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nhập SBD..."
          value={sbd}
          onChange={e => setSbd(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
      {result && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <div><span className="font-semibold">SBD:</span> {result.sbd}</div>
          <div><span className="font-semibold">Toán:</span> {result.toan}</div>
          <div><span className="font-semibold">Ngữ văn:</span> {result.ngu_van}</div>
          <div><span className="font-semibold">Ngoại ngữ:</span> {result.ngoai_ngu}</div>
          <div><span className="font-semibold">Vật lí:</span> {result.vat_li}</div>
          <div><span className="font-semibold">Hóa học:</span> {result.hoa_hoc}</div>
          <div><span className="font-semibold">Sinh học:</span> {result.sinh_hoc}</div>
          <div><span className="font-semibold">Lịch sử:</span> {result.lich_su !== null ? result.lich_su : '-'}</div>
          <div><span className="font-semibold">Địa lí:</span> {result.dia_li !== null ? result.dia_li : '-'}</div>
          <div><span className="font-semibold">GDCD:</span> {result.gdcd !== null ? result.gdcd : '-'}</div>
          <div><span className="font-semibold">Mã ngoại ngữ:</span> {result.ma_ngoai_ngu}</div>
        </div>
      )}
    </div>
  );
};

export default SearchScores;
