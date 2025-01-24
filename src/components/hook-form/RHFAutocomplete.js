import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFAutocomplete({ name, label, helperText, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          {...other}
          // Remove the `error` prop from Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error} // Pass error only to TextField
              helperText={error ? error.message : helperText}
            />
          )}
        />
      )}
    />
  );
}
