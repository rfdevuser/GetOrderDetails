import { gql } from "@apollo/client";

const GET_ORDER = gql`
query getorder($id: ID){
    order(id:$id,idType:DATABASE_ID){
      customer{
        firstName
        lastName
        billing{
          email
          phone
        }
        shipping{
          address1
          address2
          postcode
          city
          state
        }
      }
      subtotal
      totalTax
      shippingTotal
      total
      lineItems{
        nodes{
          product{
            name
          }
          productId
          quantity
          subtotal
          subtotalTax
          
          
        }
        
      }
    }
  }`