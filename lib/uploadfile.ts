type UploadFileResponse = {
  error?: string
  imageURL?: string
  blurpfp?: string
}

export async function uploadFile(file: File, isPfp?: boolean): Promise<UploadFileResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ucyb6vrx')

  const upload = await fetch('https://api.cloudinary.com/v1_1/harihari/image/upload', {
    method: 'POST',
    body: formData,
  })
  const uploadResponse = await upload.json()
  if (!uploadResponse.secure_url) return { error: uploadResponse.error.message }

  const imageURL = uploadResponse.secure_url

  if (!isPfp) return { imageURL: imageURL }

  const createblurpfp = await fetch('/api/images/createblurpfp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageurl: imageURL }),
  })

  const { blurpfp } = await createblurpfp.json()

  return { imageURL: imageURL, blurpfp: blurpfp }
}
