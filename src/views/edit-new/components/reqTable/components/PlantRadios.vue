<template>
  <el-form-item :label="lang('Plant')">
    <el-row class="form-row-width">
      <el-col :span="12">
        <el-radio-group v-model="plant">
          <el-radio label="T1" size="small" class="pl-2">T1</el-radio>
          <el-radio label="T3" size="small">T3</el-radio>
          <el-radio label="T6" size="small">T6</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="12">
        <ValidateText
          :key-outer="'reqTable'"
          :key-inner="'plant'"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { ValidateText } from '@/components'
import { useNewStore } from '@/store/addNew'
const store = useNewStore()
const plant = ref('')   //綁定 el-radio 中的值
//取得 plant 初始值
onMounted(() => plant.value = store.getPlant)
//監聽 plant 數值的變化, 有改變就 set 回 store
watch(plant, (value) => store.setPlant(plant.value))
</script>