<template>
  <el-alert
    type="warning"
    :title="lang('Definition of request type')"
    show-icon
    :closable="false"
  >
    <template #default>
      <ul class="mb-0">
        <li>
          <strong>Project:</strong>
          <span>{{ lang('Directly related to mass production') }}</span>
        </li>
        <li>
          <strong>OneTime:</strong>
          <span>
            {{ lang('Case which is one-shot, urgent, and') }} 
            <span class="ce-red-color font-semibold">
              {{ lang('not directly related') }}
            </span>
            {{ lang('to mass production') }}
          </span>
        </li>
      </ul>
    </template>
  </el-alert>
</template>
<script setup>
import { lang } from '@/hooks/useCommon'
</script>