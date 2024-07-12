<template>
  <div class="upload-container">
    <div>
      <input type="file" @change="handleFileUpload" accept=".xlsx,.xls,.csv" />
      <button class="btn upload-btn" @click="uploadExcel">Upload Excel</button>
      <p :class="{ message: true, success: isSuccess, fail: isFail }">{{ message }}</p>
    </div>
    <div>
      <button class="btn download-btn" @click="downloadSampleFile">Download Sample</button>
      <button class="btn refresh-btn" @click="getData">Refresh</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useShipmentStore } from '@/stores/store'
import { uploadExcelFile, getAllShipments } from '@/services/apiService'

const file = ref(null)
const shipmentStore = useShipmentStore()

let message = ref('')
let isSuccess = ref(false)
let isFail = ref(false)

const handleFileUpload = (e) => {
  file.value = e.target.files[0]
}

const uploadExcel = async () => {
  if (!file.value) return

  try {
    const response = await uploadExcelFile(file.value)
    if (response.status === 200) {
      console.log(response)
      isSuccess.value = true
      isFail.value = false
      message.value = 'File uploaded successfully, click Refresh to load data.'
    }
  } catch (error) {
    console.error('Upload error:', error)
    isSuccess.value = false
    isFail.value = true
    message.value = 'Failed to upload file.'
  }
}

const getData = async () => {
  try {
    const shipments = await getAllShipments()
    shipmentStore.setShipments(shipments)
  } catch (error) {
    console.error('Get error:', error)
    isFail.value = true
    message.value = 'Failed to fetch data.'
  }
}

const downloadSampleFile = () => {
  const demoFileUrl = 'plan_bulk_upload_same_order_same_shipment.xlsx'
  const link = document.createElement('a')
  link.href = demoFileUrl
  link.setAttribute('download', 'demo.xlsx')
  document.body.appendChild(link)
  link.click()
}

onMounted(getData)
</script>
