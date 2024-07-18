import { useState } from 'react';

interface QuantityControlProps {
    initialQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ initialQuantity, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            onQuantityChange(newQuantity);
            return newQuantity;
        });
    };

    const decrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
            onQuantityChange(newQuantity);
            return newQuantity;
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                onClick={decrement}
            >
                -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                onClick={increment}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;
