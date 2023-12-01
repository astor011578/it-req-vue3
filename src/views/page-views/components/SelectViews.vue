<template>
  <span>
    <strong class="mr-2">{{ lang('Switch status') }}:</strong>
    <el-select v-model="selected">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </span>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
const emits = defineEmits(['get-children'])
const props = defineProps({
  selected: {
    type: String,
    required: true,
    default: () => { return 'daily' }
  }
})
const selected = ref('daily')
const options = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]
watch(props, (newVal, oldVal) => selected.value = props.selected)
watch(selected, (newVal, oldVal) => emits('get-children', selected.value))
</script>