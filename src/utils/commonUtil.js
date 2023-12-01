export default {
  /**
   * 取得星期幾
   * @param { String } date 日期字串
   * @return { String } 星期幾
   */
  dayFormat(date) {
    switch (new Date(date).getDay()) {
      case 0:
        return '星期日'
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
    }
  },

  /**
   * 計算兩者時間差
   * @param { Date } startTime 起始日期 (yyyy-mm-dd)
   * @param { Date } endTime 結束日期 (yyyy-mm-dd)
   * @return { String } 幾年幾天 || 幾天幾小時 || 幾小時幾分
   */
  getDateDiff(startTime, endTime) {
    // 將格式從 yyyy-mm-dd 轉為 yyyy/mm/dd
    startTime = startTime.replace(/\-/g, '/')
    endTime = endTime.replace(/\-/g, '/')
    let sTime = new Date(startTime) // 起始時間
    let eTime = new Date(endTime) // 結束時間
    let timeOff = eTime - sTime // 相差時間差 (ms)

    // 單位
    let timeMinute = 1000 * 60
    let timeHour = 1000 * 3600
    let timeDay = 1000 * 3600 * 24
    let timeYear = 1000 * 3600 * 24 * 365

    if (timeOff / timeYear >= 1) {
      return parseInt(timeOff / timeYear) + '年' + parseInt((timeOff % timeYear) / timeDay) + '天'
    } else if (timeOff / timeDay >= 1) {
      return parseInt(timeOff / timeDay) + '天' + parseInt((timeOff % timeDay) / timeHour) + '小時'
    } else {
      return parseInt(timeOff / timeHour) + '小時' + parseInt((timeOff % timeHour) / timeMinute) + '分'
    }
  },

  /**
   * today 是今天的时间戳(new Date().getTime())
   * @param { Date } today 今日時間戳 (new Date().getTime())
   * @param { Number } day 幾天
   * @return { String } 最小起始日期
   */
  minStartDate(today, day) {
    const dayDiff = day * 24 * 60 * 60 * 1000 // 將 day 轉為時間戳
    const minStartTime = today - dayDiff // 計算今日與 dayDiff 兩者時間差
    // 利用 dateTimeFormatter 將兩者時間差轉為 yyyy-mm-dd 格式
    return this.dateTimeFormatter(minStartTime, 'yyyy-MM-dd')
  },
  /**
   * 獲取兩個日期的相差天數 (sDate1 - sDate2)
   * @param { Date } sDate1 被減的日期
   * @param { Date } sDate2 另一個日期
   * @returns { Number } 相差的天數
   */
  dateDiff(sDate1, sDate2) {
    let arrDate, objDate1, objDate2, iDays
    // 將 sDate1, sDate2 兩者格式轉為 yyyy/mm/dd
    arrDate = sDate1.split('-')
    objDate1 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
    arrDate = sDate2.split('-')
    objDate2 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
    // 將兩者相差毫秒數轉為天數
    iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24)
    return iDays
  },
  /**
   * 取得今天是禮拜幾
   * @returns { String } 星期幾
   */
  getWeek() {
    return '星期' + '日一二三四五六'.charAt(new Date().getDay())
    // this.showDate=this.$momentMini(new Date()).format('YYYY年MM月DD日，')+str
  },
  //** 表單驗證 **/
  /**
   * 是否為有效手機號碼
   * @param { String } str 手機號碼 (必須為字串)
   * @returns { Boolean }
   */
  mobilePhone(str) {
    const reg = /^09?[0-9]{8}$/
    // const reg = /^0?1[0-9]{10}$/
    return reg.test(str)
  },
  /**
   * 將一串數字字串轉為 nnnn nnnn .... nnnn 的格式 (每組為 4 個數字 + 1 個空格)
   * @param { String } num 連續數字字串
   * @returns { Boolean } nnnn nnnn .... nnnn 格式的數字字串
   */
  toSplitNumFor(num) {
    return num.replace(/(.{4})/g, '$1 ')
  },
  /**
   * 是否為有效銀行卡號
   * @param { String } str 銀行卡號
   * @returns { Boolean }
   */
  bankCardNo(str) {
    const reg = /^\d{15,20}$/
    return reg.test(str)
  },
  /**
   * 是否為有效電子信箱
   * @param { String } str 電子信箱
   * @returns { Boolean }
   */
  regEmail(str) {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(str)
  },
  /**
   * 是否為有效身分證字號
   * @param { String } str 身分證字號
   * @returns { Boolean }
   */
  idCardNumber(str) {
    const reg = /^[A-Za-z][12][0-9]{8}/
    // const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
  },
  /* 價格轉換*/
  // 乘
  mul(arg1, arg2) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m
    let resultVal
    const d = arguments[2]
    m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) * Number(r2.replace('.', ''))) / Math.pow(10, m)
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
  },
  // 除
  div: function (arg1, arg2) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m
    let resultVal
    const d = arguments[2] || 2
    m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) / Number(r2.replace('.', ''))) * Math.pow(10, m)
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
  },
  // 加
  add: function (arg1, arg2) {
    arg1 = arg1.toString()
    arg2 = arg2.toString()
    const arg1Arr = arg1.split('.')
    const arg2Arr = arg2.split('.')
    const d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
    const d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
    const maxLen = Math.max(d1.length, d2.length)
    const m = Math.pow(10, maxLen)
    const result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen))
    const d = arguments[2]
    return typeof d === 'number' ? Number(result.toFixed(d)) : result
  },
  // 減
  sub: function (arg1, arg2) {
    return this.add(arg1, -Number(arg2), arguments[2])
  },
  //** 陣列相關方法 **/
  /**
   * 删除数组中的指定元素 <<<<< 看不懂
   * @param {*} arr 数组的index下标
   * @param {*} arrItem 删除后的数组
   */
  deleteArrItem(arr, arrItem) {
    arr.splice(
      arr.findIndex((item) => item === arrItem),
      1
    )
  },
  /**
   * 移除重複元素 1
   * @param { Array } arr 欲操作的陣列
   * @returns { Array } 移除重複元素後的陣列
   */
  arrToRepeat(arr) {
    return arr.filter((ele, index, thisArr) => {
      return thisArr.indexOf(ele) === index
    })
  },
  /**
   * 移除重複元素 2
   * @param { Array } arr 欲操作的陣列
   * @returns { Array } 移除重複元素後的陣列
   */
  deRepeatArr(seriesArr) {
    return [...new Set(seriesArr)]
  },
  /**
   * 根据arrObj 删除arrObj2   根据arrObj objKey查找删除 <<<<< 看不懂
   * @param {*} arrObj 数组对象
   * @param {*} arrObj2 要被删除的对象
   * @param {*} objKey arrObj中对象的某一个key名称
   * @returns arrObj2删除过后的数组
   */
  byArrObjDeleteArrObj2(arrObj, arrObj2, objKey) {
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        arrObj2.splice(
          arrObj2.findIndex((item) => item[objKey] === value2),
          1
        )
      })
    return arrObj2
  },
  /**
   * 删除arrObj某一项 根据objKey中的key的值等于value的值 <<<<< 看不懂
   * @param {*} arrObj 数组对象
   * @param {*} objKey arrObj中对象的某一个key名称
   * @param {*} value
   * @returns arrObj删除过后的数组
   */
  deleteArrObjByKey(arrObj, objKey, value) {
    //foreach splice
    //for substring  slice 不改变原数组
    arrObj.splice(
      arrObj.findIndex((item) => item[objKey] === value),
      1
    )
    return arrObj
  },
  /**
   * 查找arrObj某一项 根据objKey中的值 <<<<< 看不懂
   * @param {*} arrObj 数组对象
   * @param {*} objKey arrObj中对象的某一个key名称
   * @param {*} value
   * @returns arrObj查找 过后的数组
   */
  findArrObjByKey(arrObj, objKey, value) {
    return arrObj[arrObj.findIndex((item) => item[objKey] == value)]
  },
  /**
   * 根据arrObj 筛选arrObj2   根据arrObj objKey值查找 <<<<< 看不懂
   * @param {*} arrObj 数组对象
   * @param {*} arrObj2 要被删除的对象
   * @param {*} objKey arrObj中对象的某一个key名称
   * @param {*} value
   * @returns arrObj2删除过后的数组
   */
  byArrObjFindArrObj2(arrObj, arrObj2, objKey, value) {
    let arrObj3 = []
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        let arrIndex = arrObj2.findIndex((item) => item[objKey] === value2)
        if (arrIndex !== -1) {
          arrObj3.push(arrObj2[arrIndex])
        }
      })
    return arrObj3
  }
}
