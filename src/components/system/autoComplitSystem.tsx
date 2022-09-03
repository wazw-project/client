import React, { useEffect, useState, useRef } from "react";
import { observer } from 'mobx-react';
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import systemStore from "../../store/systemStore";
import { System } from "../../utils/system";
import { useNavigate } from 'react-router-dom';


const AutoComplitSystem: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<readonly System[]>([]);
    const [select, setSelect] = useState<boolean>(false);

    const loading = open && options.length === 0;
    const inputNameSystem = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    const handleSelect = async () => {
        if (!select)
            setSelect(true)
        else {
            setSelect(false);
            const nameSystem = inputNameSystem.current?.value;
            await systemStore.SearchSystem(nameSystem);
            navigate(`/Map/${systemStore.currentSystem.urlName}/${systemStore.currentSystem._id}`)
        }
    }

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...systemStore.allSystems]);
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

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.objectName === value.objectName}
            getOptionLabel={(option) => option.objectName}
            onSelect={handleSelect}
            options={options}
            loading={loading}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label="to search system"
                    inputRef={inputNameSystem}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default observer(AutoComplitSystem);