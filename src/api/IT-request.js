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

export const newRequest = (data) => {
  return request({
    method: 'post',
    url: '/request/new',
    data
  })
}

export const reviewRequest = (reqNo, data) => {
  return request({
    method: 'patch',
    url: `/request/review/${reqNo}`,
    data
  })
}

export const editRequest = (reqNo, data) => {
  return request({
    method: 'patch',
    url: `/request/edit/${reqNo}`,
    data
  })
}

export const getPendings = (reviewerId, status) => {
  const basicUrl = `/requests/pendings/${reviewerId}`
  const url = status ? `${basicUrl}?status=${status}` : basicUrl
  return request({
    method: 'get',
    url
  })
}
