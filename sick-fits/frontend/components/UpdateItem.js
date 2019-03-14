import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import Error from './ErrorMessage'

const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
    }
  }
`

class UpdateItem extends Component {
  state = {}

  handleChange = event => {
    const { name, type, value } = event.target
    const newValue = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: newValue
    })
  }

  handleSubmit = async (event, updateItem) => {
    event.preventDefault()
    const response = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    })
    Router.push({
      pathname: '/item',
      query: { id: response.data.updateItem.id }
    })
  }

  render () {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) { return <p>Loading...</p> }
          if (!data.item) { return <p>No item found</p>}
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={event => this.handleSubmit(event, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label>
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION }
