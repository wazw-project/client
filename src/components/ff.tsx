import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { Marker as MarkerUtil } from '../utils/marker';
import markerStore from '../store/markerStore';
import { useEffect } from 'react';
import Marker from './Marker';

type SupportedLocales = keyof typeof locales;
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
export default function Locales() {
    const [locale, setLocale] = React.useState<string>('');
    const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
    const [open, setOpen] = React.useState(false);

    const loading = open && options.length === 0;
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...markers]);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);
    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    const theme = useTheme();



    return (
        <Box sx={{ width: '100%' }}>
            <Autocomplete
                options={Object.keys(options)}
                // isOptionEqualToValue={(option: MarkerUtil, value) => option.name === value.name}
                getOptionLabel={option => option}
                loading={loading}
                style={{ width: 300 }}
                value={locale}
                disableClearable
                onChange={(event: any, newValue: string) => {
                    setLocale(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Locale" fullWidth />
                )}
            />
            <TablePagination
                count={2000}
                rowsPerPage={10}
                page={1}
                component="div"
                onPageChange={() => { }}
            />
        </Box>
    );
}

const markers = markerStore.markers
