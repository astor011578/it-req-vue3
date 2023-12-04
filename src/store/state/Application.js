/**
 * @description 綁定 Add new 表單裡的數值
 */
class Application {
  constructor() {
    this.coreTeam = {
      reqr: ['', ''],
      pg: ['', '']
    }
    this.benefit = {
      type: 'Efficiency',
      qualityIssue: '',
      savingTimes: {
        tester: 0,
        onlineStaff: 0,
        offlineStaff: 0
      }
    }
    this.reqTable = {
      reqName: '',
      stage: '',
      customer: '',
      device: '',
      tester: '',
      equipment: '',
      system: '',
      purpose: '',
      plant: ''
    }
    this.attachFiles = []
    this.type = 'Project'
    this.schedule = {
      turnOn: '',
      UAT1: '',
      UAT2: '',
      release: '',
      monitor: ''
    }
  }
}

export default Application