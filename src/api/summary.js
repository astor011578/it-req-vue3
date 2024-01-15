import request from '@/utils/axiosReq'
import { getTimestamp } from '@/hooks/useDate'

export const getITReqSummary = () => {
  return request({
    method: 'get',
    url: `/summary/requests/${getTimestamp()}`
  })
}

export const getAllViews = () => {
  return request({
    method: 'get',
    url: `/summary/views/${getTimestamp()}`
  })
}

export const updateViews = (isIndex) => {
  return request({
    method: 'patch',
    url: `/summary/views?isIndex=${isIndex}`
  })
}
