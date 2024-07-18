import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            id
            name
            price
            image
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $price: Float!, $image: String!) {
        addProduct(name: $name, price: $price, image: $image) {
            id
            name
            price
            image
        }
    }
`;


export const ADD_TO_CART = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!) {
        addToCart(productId: $productId, quantity: $quantity) {
            id
            productId
            quantity
        }
    }
`;

export const GET_CART_ITEMS = gql`
    query {
        cart {
            id
            productId
            quantity
            product {
                id
                name
                price
                image
            }
        }
    }
`;

export const REMOVE_FROM_CART = gql`
    mutation RemoveFromCart($cartId: ID!) {
        removeFromCart(cartId: $cartId) {
            id
            productId
            quantity
        }
    }
`;
