import request from '@/utils/axiosReq'

export const getRequests = (status) => {
  return request({
    method: 'get',
    url: `/requests?status=${status}`
  })
}

export const getRequest = (reqNo) => {
  return request({
    method: 'get',
    url: `/request/${reqNo}`,
    isParams: true
  })
}
