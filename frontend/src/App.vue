<template>
  <div id="app">
    <ExcelUploader @excelData="handleExcelUploaded" />
    <ShipmentTable :shipments="shipments" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExcelUploader from './components/ExcelUploader.vue'
import ShipmentTable from './components/ShipmentTable.vue'

const shipments = ref([])

const handleExcelUploaded = (data) => {
  shipments.value = data
}
</script>
