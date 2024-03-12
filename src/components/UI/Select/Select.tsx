import React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CustomSelectOptionInterface } from '../../../models/Group';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    options: CustomSelectOptionInterface[];
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    label: string;
}

const Select: React.FC<Props> = ({ options, value, onChange, label }) => {
    return (
        <FormControl sx={{ width: '100%', marginTop: '20px' }}>
            <InputLabel
                sx={{
                    padding: '0 5px',
                    marginLeft: '5px',
                    zIndex: 1,
                    fontSize: '0.75rem'
                }}
            >
                {label}
            </InputLabel>
            <MuiSelect
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
