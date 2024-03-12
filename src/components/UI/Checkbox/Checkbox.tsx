import React, { ChangeEvent } from 'react';
import { Checkbox as VKCheckbox } from '@vkontakte/vkui';

interface Props {
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
}

const Checkbox: React.FC<Props> = ({ checked, onChange, children }) => {
    return (
        <VKCheckbox checked={checked} onChange={onChange} style={{ width: 'fit-content' }}>
            {children}
        </VKCheckbox>
    );
};

export default Checkbox;
