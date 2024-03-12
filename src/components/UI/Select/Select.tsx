import React, { ChangeEvent } from 'react';
import { Select as VKSelect } from '@vkontakte/vkui';
import { CustomSelectOptionInterface } from '../../../models/Group';

interface Props {
    options: CustomSelectOptionInterface[];
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
}

const Select: React.FC<Props> = ({ options, value, onChange, placeholder }) => {
    return (
        <VKSelect<CustomSelectOptionInterface>
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default Select;
