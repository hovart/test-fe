import { useMutation } from '@apollo/client';
import {GET_CART_ITEMS, REMOVE_FROM_CART} from "@/graphql/product";

export const useRemoveFromCart = () => {
    const [removeFromCart, { data, loading, error }] = useMutation(REMOVE_FROM_CART, {
        update(cache, { data: { removeFromCart } }) {
            try {
                const existingCart: any = cache.readQuery({ query: GET_CART_ITEMS });
                console.log('Existing cart:', existingCart);

                if (existingCart && existingCart.cart) {
                    const newCart = existingCart.cart.filter((item: any) => item.id !== removeFromCart.id);
                    cache.writeQuery({
                        query: GET_CART_ITEMS,
                        data: { cart: newCart },
                    });
                } else {
                    console.warn('No existing cart found or cart is empty');
                }
            } catch (e) {
                console.error('Error reading cache:', e);
            }
        },
    });

    const handleRemoveFromCart = async (cartId: number) => {
        try {
            await removeFromCart({ variables: { cartId } });
        } catch (err) {
            console.error('Error removing item from cart:', err);
        }
    };

    return { handleRemoveFromCart, data, loading, error };
};
