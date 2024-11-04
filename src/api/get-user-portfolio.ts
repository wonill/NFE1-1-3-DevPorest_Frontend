import ky from 'ky';
import { PortfolioApiResType } from '../types/api-types/PortfolioType.ts';

const apiUrl = import.meta.env.VITE_SERVER_URL;


export const getUserPortfolio = async (userId: string) => {
    try {
        const response = await ky.get(`${apiUrl}/portfolios/user/${userId}`, {credentials: 'include'});
        const result: PortfolioApiResType = await response.json();
        return result;
    } catch (error) {
        console.log('유저 포트폴리오 불러오던 중 에러 발생', error);
        throw error;
    }
        

}

export const getLikePortfolio = async (userId: string) => {
    try {
        const response = await ky.get(`${apiUrl}/portfolios/like/${userId}`, {credentials: 'include'});
        const result: PortfolioApiResType = await response.json();
        return result;
    } catch(error) {
        console.log('유저가 좋아요 누른 포트폴리오 불러오던 중 에러 발생', error);
        throw error;

    }
}
