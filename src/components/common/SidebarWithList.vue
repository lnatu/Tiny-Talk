<template>
  <aside class="pb-sidebar bg-light-2">
    <slot name="common-sidebar-header"></slot>
    <slot name="common-sidebar-body-content"></slot>
  </aside>
</template>

<script>
export default {
  name: 'SidebarWithList'
};
</script>