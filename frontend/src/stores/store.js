import { defineStore } from 'pinia'

export const useShipmentStore = defineStore('shipments', {
  state: () => ({
    shipments: []
  }),
  actions: {
    setShipments(shipments) {
      this.shipments = shipments
    }
  }
})
