export const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('elearning-user'))?.token ?? JSON.parse(localStorage.getItem('elearning-user')).data
  console.log("JSON.parse(localStorage.getItem('elearning-user'))",JSON.parse(localStorage.getItem('elearning-user'))?.token)
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
    
    export const getMultiPartAuthHeader = () => {
      const token = JSON.parse(localStorage.getItem('elearning-user'))?.token ?? JSON.parse(localStorage.getItem('elearning-user')).data
      return {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    }
    
    export const getS3Credintials = () => ({
      accessKeyId: '',
      secretAccessKey: ''
    })
    