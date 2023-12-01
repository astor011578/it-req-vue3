/**
 * @description 產生今日日期字串 (格式: yyyy/mm/dd)
 * @returns { string } 日期字串 (yyyy/mm/dd)
 */
export const dateGenerator = () => {
  let dateObj = new Date()
  let year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1
  let date = dateObj.getDate()

  return [
    year,
    month < 10 ? `0${month}` : month,
    date < 10 ? `0${date}` : date
  ].join('/')
}

/**
 * @description 將日期物件轉為日期字串 (yyyy/mm/dd)
 * @param { any } dateVal
 * @returns { string }
 */
export const dateFormatter = (dateVal) => {
  switch (typeof dateVal) {
    case 'object': {
      if (dateVal !== null) {
        let yyyy = dateVal.getFullYear()
        let mm = dateVal.getMonth() + 1
        let dd = dateVal.getDate()

        return [yyyy, mm < 10 ? '0' + mm : mm, dd < 10 ? '0' + dd : dd].join('/')
      } else {
        return ''
      }
    }
    case 'string': {
      return dateVal !== '' ? dateVal : ''
    }
    default: {
      return ''
    }
  }
}

/**
 * @description 取得當前 timestamp
 */
export const getTimestamp = () => {
  return new Date().getTime()
}