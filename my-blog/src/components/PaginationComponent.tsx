import React from "react";
import { Pagination } from "@patternfly/react-core";
import { PaginationComponentProps } from "../interfaces/PaginationComponentType";

const PaginationComponent:React.FC<PaginationComponentProps> = ({ itemCount, perPage, page, onPageChange }) => {
  return (
    <Pagination
      itemCount={itemCount}
      perPage={perPage}
      page={page}
      onSetPage={(e, pageNumber) => onPageChange(pageNumber)}
    />
  );
};

export default PaginationComponent;