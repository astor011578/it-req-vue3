import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { hasProperty } from '@/hooks/useValidate'
import { lang } from '@/hooks/useCommon'
import settings from '@/settings'
import axiosReq from '@/utils/axiosReq'
const router = useRouter()

export const useITReqStore = defineStore('ITRequest', {
  state: () => {
    return {
      ITNo: '',
      programmerInfo: {},
      requesterInfo: {},
      isUploaded: {},
      step: '',
      basicInfo: {},
      benefit: {},
      cancellation: {},
      scope: {},
      turnOn: {},
      schedule: {},
      evidence: {}
    }
  },

  getters: {
    getITNo: (state) => { return state.ITNo },
    getSimpleStep: (state) => { return state.step },
    getFullStep: (state) => { return state.step === 'monitor' ? 'monitor 1 lot' : state.step },
    getPgInfo: (state) => { return state.programmerInfo },
    getReqrInfo: (state) => { return state.requesterInfo },
    getReqType: (state) => { return state.basicInfo.type },
    getReqStatus: (state) => { return state.basicInfo.status },
    getIsUploaded: (state) => { return state.isUploaded },
    getBasicInfo: (state) => { return state.basicInfo },
    getBenefit: (state) => { return state?.benefit },
    getCancellation: (state) => { return state?.cancellation },
    getScope: (state) => { return state.scope },
    getTurnOn: (state) => { return state.turnOn },
    getSchedule: (state) => { return state.schedule },
    getEvidence: (state) => { return state.evidence },
    getPermission: (state) => {
      const step = state.getSimpleStep
      const ITHighPermission = settings.highPermission
      const isUploaded = state.getIsUploaded
      const isPendingCancel = state.getCancellation?.result === 'Pending' ? true : false
      const username = useUserStore().username
      const isPg = state.programmerInfo.id === username ? true : false
      const isReqr = state.requesterInfo.id === username ? true : false
      let permissions = {}

      switch (state.basicInfo.status) {
        case 'Reviewing': {
          permissions.revNew = isPg ? true : false
          permissions.editNew = false
          break
        }
        case 'Returned': {
          permissions.revNew = false
          permissions.editNew = isReqr ? true : false
          break
        }
        default: {
          permissions.revNew = false
          permissions.editNew = false
          break
        }
      }

      if (ITHighPermission) {
        switch (isUploaded[step]) {
          case 0:
          case 3: {
            permissions.approve = false
            permissions.postpone = isPg || isReqr ? true : false
            permissions.cancel = !isPendingCancel && (isReqr || isPg) ? true : false
            if (step === 'UAT1') {
              permissions.evidence = isPg ? true : false
            } else {
              permissions.evidence = isReqr || isPg ? true : false
            }
            break
          }
          case 1: {
            permissions.evidence = false
            permissions.postpone = isPg || isReqr ? true : false
            permissions.cancel = !isPendingCancel && (isReqr || isPg) ? true : false
            if (step === 'UAT1') {
              permissions.approve = isReqr || isPg ? true : false
            } else {
              permissions.approve = isPg ? true : false
            }
            break
          }
          case 2: {
            permissions.approve = false
            permissions.evidence = false
            permissions.postpone = false
            permissions.cancel = false
            break
          }
        }
      } else {
        switch (isUploaded[step]) {
          case 0:
          case 3: {
            permissions.approve = false
            permissions.postpone = isPg || isReqr ? true : false
            permissions.cancel = isReqr ? true : false
            if (step === 'UAT1') {
              permissions.evidence = isPg ? true : false
            } else {
              permissions.evidence = isReqr ? true : false
            }
            break
          }
          case 1: {
            permissions.evidence = false
            permissions.postpone = isPg || isReqr ? true : false
            permissions.cancel = isReqr ? true : false
            if (step === 'UAT1') {
              permissions.approve = isReqr ? true : false
            } else {
              permissions.approve = isPg ? true : false
            }
            break
          }
          case 2: {
            permissions.approve = false
            permissions.evidence = false
            permissions.postpone = false
            permissions.cancel = false
            break
          }
        }
      }
      return permissions
    },
    getApplicant: (state) => {
      const username = useUserStore().username
      const isPg = state.programmerInfo.id === username ? true : false
      const isReqr = state.requesterInfo.id === username ? true : false
      const programmer = [state.programmerInfo.name, state.programmerInfo.id]
      const requester = [state.requesterInfo.name, state.requesterInfo.id]
      const applicant = isPg ? programmer : (isReqr ? requester : [])
      return applicant
    }
  },

  actions: {
    setITNo(ITNo) {
      this.ITNo = ITNo
    },
    async getITRequestInfo() {
      try {
        if (this.ITNo.length) {
          await axiosReq({
            method: 'get',
            url: `/request/${this.ITNo}`,
            isParams: true
          })
            .then((res) => {
              //for debugging
              // console.log(res.data)
              const {
                ITno, reqName, type, status, buyoffStatus, benefit, benefitType, reqr, reqrID, pg, pgID, issueDate, approveDate, approveComments,
                reviewDuration, turnOn, plant, stage, customer, device, tester, equipment, system, purpose, attachFiles, remark, leadTime, isUploaded
              } = res.data
              const { qualityIssue, offlineAct, onlineAct, testerAct, offlineExp, onlineExp, testerExp } = benefit

              //get values of programmer
              this.programmerInfo = { name: pg, id: pgID }
              //get values of requester
              this.requesterInfo = { name: reqr, id: reqrID }
              //get values of isUploaded
              this.isUploaded = isUploaded
              //get values in basicInfo
              this.basicInfo = { ITno, reqName, type, status, leadTime, pg, reqr, issueDate, remark, approveDate, approveComments, reviewDuration }
              //get values in benefit
              if (hasProperty(benefit)) {
                this.benefit = {
                  reqType: type,
                  qualityIssue, benefitType, offlineAct, onlineAct, testerAct, offlineExp, onlineExp, testerExp
                }
              }
              //get values in cancellation
              this.cancellation = res.data?.cancel
              //get values in scope
              this.scope = { plant, stage, customer, device, tester, equipment, system, purpose, attachFiles }
              //get values about schedule
              this.turnOn = { owner: pg, date: turnOn }
              this.schedule = {
                UAT1: scheduleHandler(res.data, 'UAT1', status),
                UAT2: scheduleHandler(res.data, 'UAT2', status),
                release: type === 'Project' ? scheduleHandler(res.data, 'release', status) : undefined,
                monitor: type === 'Project' ? scheduleHandler(res.data, 'monitor', status) : undefined
              }
              //get values about evidence
              this.evidence = {
                UAT1: res.data.UAT1.uploads,
                UAT2: res.data.UAT2.uploads,
                release: res.data.release?.uploads,
                monitor: res.data.monitor?.uploads
              }
              //get current proceeding step
              switch (buyoffStatus) {
                case 'Wait UAT1': this.step = 'UAT1'; break;
                case 'Wait UAT2': this.step = 'UAT2'; break;
                case 'Wait release': this.step = 'release'; break;
                case 'Wait monitor 1 lot': this.step = 'monitor'; break;
                default: this.step = status; break;
              }
            })
        } else {
          throw 'missingArgumentError'
        }
      } catch (err) {
        //如果是客製的 error message string
        const isCustomError = err.indexOf('status code ') === -1 ? true : false
        if (isCustomError) {
          switch (err) {
            case 'missingArgumentError': return console.error('請提供 IT no.')
            default: return console.error(err)
          }
        }

        //如果是此框架的原作者設計的 error message
        const errorCode = JSON.parse(err).msg.split('status code ')[1]
        switch (errorCode) {
          case '404': {
            console.error(`找不到 IT #${this.ITNo} 資料，請確認 IT # 是否正確輸入`)
            ElMessage.error(`IT #${this.ITNo} ${lang('data not found')}`)
            router.push('/404')
            return
          }
          default: return console.error(errorCode)
        }
      }
    }
  }
})

/**
 * @description modify values in each stages of schedule
 * @param { object } resource resource data
 * @param { string } stage name of stage in schedule
 * @param { string } status status of this request
 * @return { object } output Object, modified values of each stage
 */
const scheduleHandler = (resource, stage, status) => {
  let _resource
  let output = {
    title: '',
    owner: '',
    state: '',
    act: '',
    exp: {
      old: [],
      new: ''
    },
    KPI: {},
    preKPI: {}
  }

  switch (stage) {
    case 'UAT1': {
      _resource = resource.UAT1
      output.title = 'Test-IT buyoff (UAT1)'
      break
    }
    case 'UAT2': {
      _resource = resource.UAT2
      output.title = 'User buyoff (UAT2)'
      break
    }
    case 'release': {
      output.title = 'Release'
      _resource = resource.release
      break
    }
    case 'monitor': {
      output.title = 'Monitor 1 lot'
      _resource = resource.monitor
      break
    }
  }
  output.owner = _resource.preKPI.length ? `${_resource.preKPI[0]}, ${_resource.KPI[0]}` : _resource.KPI[0]

  if (_resource.act === '') {
    if (status === 'Cancel') {
      output.state = 'Cancel'
    } else {
      if (_resource.uploads.upload_reply[1] === 'Pending') {
        output.state = 'Reviewing'
      } else if (_resource.uploads.upload_reply[1] === 'Rejected') {
        output.state = 'Rejected'
      } else {
        output.state = 'Proceeding'
      }
    }
  } else {
    output.state = 'Done'
  }

  output.act = _resource.act

  switch (_resource.exp.length > 1) {
    case true: {
      for (let i = 0; i < _resource.exp.length; i++) {
        if (i < _resource.exp.length - 1) {
          output.exp.old.push(_resource.exp[i])
        } else {
          output.exp.new = _resource.exp[i]
        }
      }
      break
    }
    case false: {
      output.exp.new = _resource.exp[0]
      break
    }
  }

  output.KPI = Object.assign({}, _resource.KPI)
  output.preKPI = Object.assign({}, _resource.preKPI)

  return output
}