import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'

const ITEMS_QUERY = gql`
  query ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Items extends Component {
  render () {
    return (
      <div>
        <p>Items</p>
        <Query query={ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error}</p>
            return (
              <Root>
                {data.items.map(item => <Item key={item.id} item={item} />)}
              </Root>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Items
export { ITEMS_QUERY }
