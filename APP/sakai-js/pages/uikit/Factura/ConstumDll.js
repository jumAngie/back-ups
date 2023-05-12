import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const CustomDropdown = ({ options, value, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemTemplate = (option) => {
    return (
      <div className="multiselect-item">
        <span>{option.label}</span>
        <button
          className="multiselect-item-close"
          onClick={() => {
            setDropdownOpen(false);
            onChange({
              originalEvent: null,
              value: value.filter((v) => v.value !== option.value),
            });
          }}
          style={{ display: dropdownOpen ? "block" : "none" }}
        >
          X
        </button>
      </div>
    );
  };

  const onToggle = (e) => {
    setDropdownOpen(e.value);
  };

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      optionLabel="label"
      filter
      itemTemplate={itemTemplate}
      onToggle={onToggle}
      showClear={false}
      placeholder="Select a Combo"
    />
  );
}

export default CustomDropdown;