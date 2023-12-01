<template>
  <span class="mr-3">
    <!-- Review new request button -->
    <el-tooltip
      :content="lang(props.tip)"
      placement="bottom"
      effect="dark"
    >
      <el-button
        :icon="props.icon"
        plain
        circle
        type="success"
        :disabled="!permission"
        @click="toRevNew"
      />
    </el-tooltip>
  </span>
</template>

<script setup>
import { lang } from '@/hooks/useCommon'
import { useITReqStore } from '@/store/ITRequest'
const props = defineProps({
  icon: { type: Object, required: true },
  tip: { type: String, required: true }
})
const store = ref({})
const permission = ref(false)
const router = useRouter()
const ITno = useRoute().params.ITno
const toRevNew = () => router.push({ path: `/review/new/${ITno}`, replace: true })
onMounted(() => store.value = useITReqStore())
watch(store, async (val) => permission.value = await store.value.getPermission.revNew)
</script>
<style lang="scss" scoped>
a {
  display: inline-flex;
  width: 290px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#actual-benefit-list {
  list-style-type: none;
  padding-left: 0;
}
</style>
