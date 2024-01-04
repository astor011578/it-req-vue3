import request from '@/utils/axiosReq'
import { getTimestamp } from '@/hooks/useDate'

export const getITReqSummary = () => {
  return request({
    method: 'get',
    url: `/summary/requests/${getTimestamp()}`
  })
}

export const getDailyBenefitSummary = () => {
  return request({
    method: 'get',
    url: `/summary/daily-benefits/${getTimestamp()}`
  })
}

export const getWeeklyBenefitSummary = () => {
  return request({
    method: 'get',
    url: `/summary/weekly-benefits/${getTimestamp()}`
  })
}
  