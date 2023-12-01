<template>
  <div>
    <el-alert
      type="info"
      :title="lang('Definition of benefit')"
      show-icon
      :closable="false"
    >
      <template #default>
        <ul class="mb-0">
          <li>
            <strong>Efficiency:</strong>
            <span>
              {{ lang('Saving the') }} 
              <u>{{ lang('tester time') }}</u> 
              {{ lang('or') }} 
              <u>{{ lang('human time') }}</u>.
            </span>
            <span class="ml-2 ce-red-color">
              ({{ lang('Must choose') }} 
              <u>{{ lang('at least one') }}</u> 
              {{ lang('saving time to fill in') }})
            </span>
          </li>
          <li>
            <strong>Quality:</strong>
            <span>
              {{ lang('Improving the situation about') }} 
              <u>{{ lang('program misuse') }}</u>, 
              <u>{{ lang('P/C misuse') }}</u>, 
              <u>{{ lang('input error') }}</u>, 
              <u>hold lots</u>, 
              <u>{{ lang('customer complaint') }}</u>, 
              {{ lang('etc') }}.
            </span>
            <span class="ml-2">
              ({{ lang('Fiiling in saving time optionally') }})
            </span>
          </li>
        </ul>
      </template>
    </el-alert>
  </div>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
</script>