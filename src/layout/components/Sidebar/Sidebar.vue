<template>
  <div id="Sidebar" class="reset-menu-style">
    <!-- logo -->
    <Logo :collapse="!isCollapse" />
    <!--router nav-->
    <el-menu
      class="el-menu-vertical"
      :default-active="activeMenu"
      :collapse="!isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
const appStore = useAppStore()
const settings = computed(() => { return appStore.settings })

const permissionStore = usePermissionStore()
const routes = computed(() => { return permissionStore.routes })
const isCollapse = computed(() => { return appStore.sidebar.opened })
const activeMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  //if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) return meta.activeMenu
  return path
})
</script>