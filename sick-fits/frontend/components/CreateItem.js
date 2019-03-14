import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import Error from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }

  handleChange = event => {
    const { name, type, value } = event.target
    const newValue = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: newValue
    })
  }

  uploadFile = async event => {
    const { files } = event.target
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits')

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/trevoreyre/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await response.json()
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  handleSubmit = async (event, createItem) => {
    event.preventDefault()
    const response = await createItem()
    Router.push({
      pathname: '/item',
      query: { id: response.data.createItem.id }
    })
  }

  render () {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={event => { this.handleSubmit(event, createItem) }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label>
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Price
                <input
                  type="text"
                  id="price"
                  name="price"
                  type="number"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img src={this.state.image} alt="Upload preview" width="200" />
                )}
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem
export { CREATE_ITEM_MUTATION }
