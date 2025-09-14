// Centralized API endpoint URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const API_URLS = {
	STUDENT_SCORES: (sbd) => `${API_BASE_URL}/score/${sbd}`,
	REPORT_SCORE_LEVELS: `${API_BASE_URL}/report/score-levels`,
	TOP10_GROUP_A: `${API_BASE_URL}/top10/group-a`,
	// Add more endpoints as needed
};
