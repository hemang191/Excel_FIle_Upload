import axios from 'axios'

export async function uploadExcelFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('http://localhost:3000/excelHandler/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export async function getAllShipments() {
  try {
    const response = await axios.get('http://localhost:3000/excelHandler/upload')
    return response.data.file
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}
