import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegionData } from 'lib/constants';

interface RegionBoxProps {
  region: RegionData;
  handleEditClick: (q: string, value: string) => void;
  handleDeleteClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RegionBox({
  region,
  handleEditClick,
  handleDeleteClick,
}: RegionBoxProps) {
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const onEditClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isEdit && inputRef.current) {
      const { q } = event.currentTarget.dataset;
      handleEditClick(q ?? '', inputRef.current.value);
    }
    setIsEdit((val) => !val);
  };

  const handleRegionClick = (q: string) => {
    if (!isEdit) {
      setSearchParams({ q });
    }
  };

  const wrapperStyle = `relative p-4 border border-orange-800 ${
    isEdit ? 'none' : 'cursor-pointer'
  }`;

  return (
    <div
      key={region.name}
      onClick={() => {
        handleRegionClick(region.q as string);
      }}
      className={wrapperStyle}
    >
      {isEdit ? (
        <input ref={inputRef} defaultValue={region.name} />
      ) : (
        <div>{region.name}</div>
      )}

      <div
        className="absolute top-0 left-0 cursor-pointer"
        onClick={onEditClick}
        data-q={region.q}
        data-name={region.name}
      >
        ✎
      </div>
      {!isEdit && (
        <div
          className="absolute top-0 right-0"
          onClick={handleDeleteClick}
          data-q={region.q}
          data-name={region.name}
        >
          X
        </div>
      )}
    </div>
  );
}
