import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { validator } from "@/utils/validator";

const TextInput = ({
  id,
  name,
  type,
  value,
  onChange,
  fieldCustomType,
  isValid,
  error,
}) => {

  return (
    <div className="space-y-2 w-full lg:max-w-sm items-center">
      <Label className="text-gray-600 font-semibold" htmlFor={name}>
        {name}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={name}
        name={name}
        onChange={onChange}
        value={value}
        required
        className={`${
          !isValid
            ? "ring-2 ring-red-600 border border:red-600"
            : "focus-visible:ring-2 focus-visible:ring-[#46B038]"
        }`}
        // onFocus={handleFocus}
        // onBlur={handleFocus}
        autoComplete="off"
        // autoSave="false"
        // autoFill={false}
      />
      {!isValid && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
