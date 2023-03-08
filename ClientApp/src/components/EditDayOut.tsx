import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import { authHeader } from '../auth'

export function EditDayOut() {

  const params = useParams()
  const id = params.id

  useEffect(() => {
    async function fetchDayOut() {
      const response = await fetch(`/api/daysout/${id}`)

      if (response.ok) {
        const apiData = await response.json()

        setDayOut(apiData)
      }
    }

    fetchDayOut()
  }, [id])

  let navigate = useNavigate()

  const [isUploading, setIsUploading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const [dayOut, setDayOut] = useState({
    id: undefined,
    location: '',
    address: '',
    description: '',
    latitude: NaN,
    longitude: NaN,
    photoURL: ''
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  function handleStringFieldChange(event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value
    const fieldName = event.currentTarget.name

    const updatedDayOut = { ...dayOut, [fieldName]: value }

    setDayOut(updatedDayOut)
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch(`/api/daysout/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', Authorization: authHeader() },
      body: JSON.stringify(dayOut),
    })

    if (response.status === 401) {
      setErrorMessage('Not Authorized')
    } else {
      if (response.status === 400) {
        const json = await response.json()

        setErrorMessage(Object.values(json.errors).join(' '))
      } else {
        navigate('/')
      }
    }
  }

  async function onDropFile(acceptedFiles: File[]) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting some form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    try {
      setIsUploading(true)

      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          Authorization: authHeader(),
        },
        body: formData,
      })

      setIsUploading(false)

      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the restaurant,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setDayOut({ ...dayOut, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch (error) {
      // Catch any network errors and show the user we could not process their upload
      console.debug(error)
      setErrorMessage('Unable to upload image')
      setIsUploading(false)
    }
  }

  let dropZoneMessage = 'Drag a picture of the dayout here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  // If we don't have any restaurant ID, return an empty component
  if (!dayOut.id) {
    return <></>
  }

  return (
    <main className="page">
      <div className="newDay">
        <div className="pageHeader">
          <h1 className="text-center">Edit Day Out</h1>
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
                value={dayOut.location}
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
                value={dayOut.address}
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
                value={dayOut.description}
                onChange={handleStringFieldChange}
              ></textarea>
            </div>
          </div>
          <div className="form-input">
            <label className="label" htmlFor="picture">
              Picture
            </label>
            {
              dayOut.photoURL ? (
                <p>
                  <img alt="DayOut Photo" width={200} src={dayOut.photoURL} />
                </p>
              ) : null
            }
            <div className="file-drop-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {dropZoneMessage}
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
    </main>
  )
}