<template>
  <div class="icons-list">
    <a-tooltip placement="top" v-if="props.visible_edit" title="Modificar Elemento">
      <a-icon type="edit" style="padding-right: 10px" @click="v_instance.onEditing(object)" theme="twoTone"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="props.visible_view" title="Mostrar Elemento">
      <a-icon type="eye" style="padding-right: 10px" theme="twoTone" twoToneColor="green"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="props.visible_delete" title="Borrar Elemento">
      <a-icon type="delete" style="padding-right: 10px" @click="showDeleteConfirm" theme="twoTone"
              twoToneColor="red"/>
    </a-tooltip>
  </div>
</template>
<script lang="ts" setup>
import {  ref } from 'vue';

interface props{
     visible_edit:boolean;
     visible_delete:boolean;
     visible_view:boolean;
};
let model=ref(Object);
const props = withDefaults(defineProps<props>(),{
    visibleEdit:true,
    visible_delete:true,
    visible_view:true,
    
})
</script>





<style scoped>
/*.delete_confirm*/

</style>


