import React from 'react';

// Table component
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  className?: string;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className = '', children, ...props }) => {
  return (
    <table className={`w-full ${className}`} {...props}>
      {children}
    </table>
  );
};

// Table Header
interface TableHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ className = '', children }) => {
  return (
    <thead className={`${className}`}>
      {children}
    </thead>
  );
};

// Table Body
interface TableBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ className = '', children }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

// Table Row
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ className = '', children, ...props }) => {
  return (
    <tr className={`hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </tr>
  );
};

// Table Head cell
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ className = '', children, ...props }) => {
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

// Table Cell
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ className = '', children, ...props }) => {
  return (
    <td className={`px-6 py-4 text-sm ${className}`} {...props}>
      {children}
    </td>
  );
};