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

interface DataType {
  key: string | number;
  name: string;
  age: number;
  address: string;
}

})
</script>





<style scoped>
/*.delete_confirm*/

</style>


