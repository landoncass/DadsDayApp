import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { authHeader } from '../auth'
import { APIError, DayOutType, UploadResponse } from '../types'
import { useDropzone } from 'react-dropzone'



async function submitNewDayOut(dayOutToCreate: DayOutType) {
  const response = await fetch('/api/daysout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify(dayOutToCreate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
export function NewDayOut() {
  let navigate = useNavigate()

  const [newDayOut, setNewDayOut] = useState<DayOutType>({
    id: undefined,
    location: '',
    address: '',
    description: '',
    latitude: NaN,
    longitude: NaN,
    photoUrl: '',
    reviews: [],
  })

  const [errorMessage, setErrorMessage] = useState('')

  const createNewDayOut = useMutation(submitNewDayOut, {
    onSuccess: function () {
      navigate('/')
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(''))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewDayOut.mutate(newDayOut)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedDayOut = { ...newDayOut, [fieldName]: value }

    setNewDayOut(updatedDayOut)
  }

  function onDropFile(acceptedFiles: File[]) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  async function uploadFile(fileToUpload: File) {
    // Create a formData object so we can send this
    // to the API that is expecting some form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
      },
      body: formData,
    })

    if (response.ok) {
      return response.json()
    } else {
      throw 'Unable to upload image!'
    }
  }

  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: function (apiResponse: UploadResponse) {
      const url = apiResponse.url

      setNewDayOut({ ...newDayOut, photoURL: url })
    },

    onError: function (error: string) {
      setErrorMessage(error)
    },
  })

  return (
    <div className="newDay">
      <div className="pageHeader">
        <h1 className="text-center">Add a Day Out</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        {errorMessage ? <p className='form-error'>{errorMessage}</p> : null}
        <div className="field" >
          <label className="label" htmlFor="location">
            What's the name of the place you went?
          </label>
          <div className="control is-expanded">
            <input
              className="input"
              required
              type="text"
              name="location"
              value={newDayOut.location}
              onChange={handleStringFieldChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="address">
            What's the address?
          </label>
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              name="address"
              value={newDayOut.address}
              onChange={handleStringFieldChange}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="description">
            How would you describe this place?
          </label>
          <div className="control is-expanded">
            <textarea
              className="input"
              name="description"
              value={newDayOut.description}
              onChange={handleStringFieldChange}
            ></textarea>
          </div>
        </div>
        <div className="form-input">
          <label className="label" htmlFor="picture">
            Picture
          </label>

          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive
                ? 'Drop the files here ...'
                : 'Drag a picture of the DayOut location here to upload!'}
            </div>
          </div>

        </div>
        <br></br>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" >Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>


  )
}
