//vxe-table language
import vxeZhTw from 'vxe-table/lib/locale/lang/zh-TW'

const general = {
  /* sidebar item & route title */
  'Home': '首頁',
  'Control table': '控制表',
  'Data details': '需求內容',
  'New a request': '申請新需求',
  'Weekly summary': '每週報表',
  'Page views': '使用次數統計',
  'Review application': '表單簽閱',
  'Review new request': '簽閱新需求',
  'Edit IT-request': '編輯需求內容',
  /* placeholder & tips */
  'User ID (Test account: 999999)': '全球工號 (測試用帳號: 999999)',
  'Password (Test password: 999999)': '密碼 (測試用密碼: 999999)',
  'User ID or password is incorrect': '工號或密碼不正確',
  'Loading': '讀取中',
  'Now loading': '讀取中',
  'Please input': '請輸入',
  'Please select': '請選擇',
  'Select file': '選擇上傳檔案',
  'Select': '請選擇',
  'Pick a date': '請選擇日期',
  'Please fill in this field': '請填寫此欄位',
  'Invalid date value': '不接受此日期格式',
  'Keyword search': '依關鍵字搜尋',
  'Please register your account': '請登記你的使用者資料',
  'Please input user name': '請輸入使用者名字',
  'Please input manager name': '請輸入直屬主管名字',
  'Please input e-mail': '請輸入公司電子信箱',
  'Export as xlsx file': '匯出為 xlsx 檔案',
  'Total': '總共',
  'The latest': '最近',
  'records': '筆資料',
  'record': '筆資料',
  'Drop your files here, or': '請將檔案拖曳至此，或',
  'click to select files': '點選此處選擇檔案',
  'Total file size should be less than 10MB': '檔案總大小不得超過 10MB',
  'There is no file attached': '此需求沒有參考附件',
  'There is no comments': '沒有評論可顯示',
  'There is no reason': '沒有申請理由可顯示',
  'Please leave the reason for cancellation here': '請在此留下取消理由',
  'Review this application': '簽閱此申請',
  'Load all data': '讀取所有資料',
  'Download working instruction': '下載工作指引',
  /* field name & title */
  'User ID': '全球工號',
  'User name': '使用者名字',
  'Manager': '直屬主管',
  'E-mail': '公司信箱',
  'Register': '登記使用者資料',
  'Title': '標題',
  'Fill the actual benefit': '填寫實際改善效益',
  'Expect benefit': '預計改善效益',
  'Actual benefit': '實際改善效益',
  /* messages */
  'Permission denied': '沒有權限執行此操作',
  'Data not found': '查無資料',
  'Action cancelled': '取消操作',
  'Failed to edit user data': '修改使用者資料失敗',
  'Edit user data successfully': '修改使用者資料成功',
  'Login successfully': '登入成功',
  'Logout successfully': '登出成功',
  'Export successfully': '匯出表格成功',
  'Failed to export': '匯出表格失敗',
  'Please login again': '請重新登入',
  'Please select user': '請選擇使用者',
  'No files selected': '尚未選擇檔案',
  'Duplicate file': '此檔案已存在',
  'Continue?': '是否要繼續？',
  'This action cannot be undone': '此操作無法撤銷',
  'You have not completed the request table yet': '你尚未填妥需求單模板',
  "It doesn't allow to attach .EXE or .ISO or compressed files": '請勿上傳副檔名如 .EXE, .ISO 等壓縮檔案',
  'Are you sure to upload? This action cannot be undone': '是否確定上傳此檔案？此操作無法返回',
  'Please leave a reason for rejection or sending back this IT-request': '請在此處留下拒絕 / 退回需求單的理由',
  'Please leave a reason for rejection': '請在此處留下拒絕的理由',
  'OneTime request cannot be directly related to mass production, ': 'OneTime 類型必須為對量產無直接影響的需求，',
  'You chose the type OneTime': '你已選擇 OneTime 需求類型',
  'Upload to server successfully': '檔案上傳成功',
  'Failed to upload files': '檔案上傳失敗',
  'Review a IT-Request successfully': '審核 IT-Request 成功',
  'Failed to review a IT-Request': '審核 IT-Request 失敗',
  'Update the actual benefit successfully': '更改實際改善效益成功',
  'Failed to update the actual benefit': '更改實際改善效益失敗',
  'Reschedule successfully': '延期成功',
  'Failed to reschedule': '延期失敗',
  'Apply for cancellation successfully': '取消申請成功',
  'Failed to apply for cancellation': '取消申請失敗',
  'Edit a IT-Request successfully': '修改需求成功',
  'Failed to edit a IT-Request': '修改需求失敗',
  'Approve cancelling application successfully': '同意取消申請成功',
  'Reject cancelling application successfully': '拒絕取消申請成功',
  'Failed to approve cancelling application': '同意取消申請失敗',
  'Failed to reject cancelling application': '拒絕取消申請失敗',
  'Approve evidence successfully': '簽閱上傳證明成功',
  'Failed to approve evidence': '簽閱上傳證明失敗',
  'Reject evidence successfully': '拒絕上傳證明成功',
  'Failed to reject evidence': '拒絕上傳證明失敗',
  'Failed to get page views data': '取得使用次數資料失敗',
  'Are you sure to cancel this request? This action cannot be undone': '是否確定要取消此需求？此操作無法返回',
  'Are you sure to upload attached file again?': '是否確定要再次上傳參考附件？',
  'Are you sure to APPROVE this cancellation?': '是否確定要同意此需求的取消申請？',
  'Are you sure to REJECT this cancellation?': '是否確定要拒絕此需求的取消申請？',
  /* buttons */
  'Login': '登入',
  'Logout': '登出',
  'Submit': '送出',
  'Export': '匯出表格',
  'Upload to server': '上傳至 server',
  'OK': '確定',
  'Cancel': '取消',
  'Reject': '拒絕',
  'Return': '退回修改',
  'Approve': '核准',
  'Upload again': '再次上傳',
  'Review': '簽閱',
  /* 需求單欄位 */
  'IT #': '需求編號',
  'Request name': '需求名稱',
  'Stage': '站別',
  'Customer': '客戶',
  'Device': '產品',
  'Tester': '機台',
  'Equipment': '設備',
  'System': '系統',
  'Purpose': '需求目的',
  'Plant': '廠區',
  'Attached files': '參考附件',
  'Review date': '最後審核日期',
  'Issue date': '填單日期',
  'Requester': '需求者',
  'Lead time': '經過天數',
  'Lead time (day)': '經過天數',
  'Review duration': '審核天數',
  'Review duration (day)': '審核天數',
  'Status': '狀態',
  'Remark': '備註',
  'Type': '類型',
  'Benefit type': '效益類型',
  'Saving time': '節省時間',
  'Tester time': '機台時間',
  'Online staff time': '產線人員時間',
  'Offline staff time': '辦公人員時間',
  'Save online staff time': '節省產線人員時間',
  'Save offline staff time': '節省辦公人員時間',
  'Save staff time': '節省人員時間',
  'Save tester time': '節省機台時間',
  'Quality case': '品質改善件數',
  'Quality issue': '改善事件',
  'Benefit': '改善效益',
  'Expect': '預計',
  'Actual': '實際',
  'Request type': '需求類型',
  'Owner': '負責人',
  'Turn on date': '開始開發日期',
  'Actual date': '實際完成日期',
  'Expect date': '預計完成日期',
  /* error page */
  'Back to home': '返回首頁',
  'It will redirect to home page in 30 seconds automatically': '將在 30 秒後自動跳轉回首頁',
  'You might lack valid authentication credentials for the requested resource': '你並無權限造訪此資源',
  'It can not find the requested resource, you might type a wrong URL into your browser': '查無此資源，你造訪的網址可能有誤',
  'Server might be encountered an unexpected condition that prevented it from fulfilling the request': '伺服器遭遇錯誤，導致無法造訪此資源',
  'Server encountered an unexpected condition': '伺服器遭遇錯誤',
  /* 其他 */
  'Approved': '簽閱通過',
  'Reviewing': '等待簽閱中',
  'Rejected': '簽閱不通過',
  'Application date': '申請日期',
  'Applicant': '申請者',
  'Reason': '申請原因',
  'Rescheduling times': '延期次數',
  'Postpone to': '延期至',
  'Item has been closed': '此項目已完成',
  'Cancel this IT-request': '取消此需求',
  'Category': '分類',
  'Received date': '收件日期',
  'Recipient': '收件者',
  'Action': '操作欄位',
  'Review application for cancelling': '簽閱取消需求'
}

export default {
  login: {
    ...general
  },
  tables: {
    'Switch status': '切換顯示表格',
    'Search': '搜尋',
    'Rescheduling (times)': '延期次數',
    ...general
  },
  addNew: {
    'Must choose at least one saving time to fill in': '必須選擇至少一項節省時間進行填寫',
    'Fiiling in saving time optionally': '節省時間可選填',
    'Must select which issue will be improved': '必須選擇一項品質改善事件',
    'Define core team member': '填寫人員資訊',
    'Requester name': '需求者名字',
    'IT name': 'IT 名字',
    'Benefit of this IT-Request': '填寫改善效益',
    'Definition of benefit': '改善效益的定義',
    'Saving the': '可以節省',
    'tester time': '機台時間',
    'or': '或',
    'human time': '人員時間',
    'Must choose': '必須選擇',
    'at least one': '至少一項',
    'saving time to fill in': '節省時間進行填寫',
    'Improving the situation about': '能夠改善有關',
    'program misuse': '程式誤用',
    'Program misuse': '程式誤用',
    'P/C misuse': 'P/C 誤用',
    'input error': '輸入錯誤',
    'Input error': '輸入錯誤',
    'customer complaint': '客訴',
    'Customer complaint': '客訴',
    'etc': '等情形',
    'Fill the request table': '填寫需求內容',
    'How to fill out this form?': '填寫需求內容的方式',
    'You can download': '你可以選擇下載',
    'template file': '需求單模板',
    ', then upload it after you complete it': '，將其填畢後再進行上傳',
    'Without uploading the template, you can complete these fields then submit it': '或者直接在此頁面填寫以下欄位',
    'Upload excel': '上傳模板',
    'New a IT-Request successfully': '新增需求成功',
    'Failed to new a IT-Request': '新增需求失敗',
    ...general
  },
  detail: {
    /* top buttons' tips */
    'Approve evidence': '簽閱上傳證明',
    'Reject evidence': '拒絕上傳證明',
    'Upload evidence': '上傳證明',
    'Reschedule': '延期',
    'Cancel this IT-Request': '取消此需求',
    'Approve this IT-Request': '簽閱此需求',
    'Edit this IT-Request': '修改此需求內容',
    'Basic Info': '基本資訊',
    'Review comments': '退件 / 拒絕原因',
    'Scope': '影響範圍',
    'Schedule': '需求時程',
    'Rejected,': '已被退回',
    're-uploading': '等待重新上傳',
    'Rescheduling': '延期次數',
    'Delay': '逾期次數',
    'Evidence': '上傳證明',
    'Rejection message': '退回理由',
    'Last update date': '最後更新日期',
    'Last review date': '最後審核日期',
    'Pending approval': '等待簽閱中',
    'Not uploaded yet': '暫無檔案被上傳',
    'Rejected, re-uploading': '已被退回，等待重新上傳',
    'Cancellation': '取消申請資訊',
    'Upload date': '上傳日期',

    ...general
  },
  reviewNew: {
    'Core team member': '人員資訊',
    'Request table': '需求內容',
    'Fill the schedule': '填寫需求時程',
    'Definition of request type': '需求類型的定義',
    'Directly related to mass production': '對量產有直接影響的需求',
    'Case which is one-shot, urgent, and': '一次性的、較為緊急的，且對量產',
    'not directly related': '無直接影響',
    'to mass production': '的需求',
    "UAT1 date should not be earlier than start coding date": 'UAT1 日期不可早於 start coding date',
    "UAT2 date should not be earlier than UAT1 date": 'UAT2 日期不可早於 UAT1 日期',
    "Release date should not be earlier than UAT2 date": 'Release 日期不可早於 UAT2 日期',
    "Monitor 1 lot date should not be earlier than release date": 'Monitor 1 lot 日期不可早於 release 日期',
    ...general
  },
  editNew: {
    'Uploaded files': '上傳附件',
    ...general
  },
  pageViews: {
    'Daily views report': '每日使用次數情形',
    'Weekly views report': '每週使用次數情形',
    'Monthly views report': '每月使用次數情形',
    'Annual views report': '每年使用次數情形',
    'Year': '年份',
    'Month': '月份',
    'Week': '週次',
    'Date': '日期',
    'Total views': '使用次數',
    'Sum': '總數',
    'Average': '平均',
    ...general
  },
  weeklySummary: {
    'weekly report': '週報',
    'Benefit weekly report': '改善效益週報',
    ...general
  },
  ...general,
  ...vxeZhTw
}
