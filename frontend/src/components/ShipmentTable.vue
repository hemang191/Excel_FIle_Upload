<template>
  <div class="table-container">
    <table>
      <thead>
        <tr class="table-head">
          <th>Shipment Type</th>
          <th>Order Number</th>
          <th>Order Type</th>
          <th>Primary Mode</th>
          <th>Expected Delivery Date</th>
          <th>Incoterm</th>
          <th>Source Location</th>
          <th>Destination Location</th>
          <th>Cargo Type</th>
          <th>Material Code</th>
          <th>Quantity</th>
          <th>Quantity Unit</th>
          <th>Shipment Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shipment in shipments" :key="shipment._id">
          <td>{{ shipment.ShipmentType }}</td>
          <td>{{ shipment.OrderNumber }}</td>
          <td>{{ shipment.OrderType }}</td>
          <td>{{ shipment.PrimaryMode }}</td>
          <td>{{ formatDateTime(shipment.ExpectedDeliveryDate) }}</td>
          <td>{{ shipment.Incoterm }}</td>
          <td>{{ shipment.SourceReferenceID }}</td>
          <td>{{ shipment.DestinationRefernceID }}</td>
          <td>{{ shipment.CargoType }}</td>
          <td>{{ shipment.MaterialCode }}</td>
          <td>{{ shipment.Quantity }}</td>
          <td>{{ shipment.QuantityUnit }}</td>
          <td>{{ shipment.ShipmentNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useShipmentStore } from '@/stores/store'
import { computed } from 'vue'

const shipmentStore = useShipmentStore()

const shipments = computed(() => shipmentStore.shipments)

const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>
