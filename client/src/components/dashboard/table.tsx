import React from 'react';

type TableProps = {
    children: React.ReactNode;
    titles: string[];
};

type TableRowProps = {
    children: React.ReactNode;
    className?: string;
};

type TableCellProps = {
    children: React.ReactNode;
    className?: string;
};

const Table: React.FC<TableProps> & {
    tr: React.FC<TableRowProps>;
    td: React.FC<TableCellProps>;
} = ({ children, titles }) => {
    return (
        <table className="table border-grayCustom">
            <thead>
                <tr>
                    {titles.map((title, index) => (
                        <th key={index}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
};

// Custom components tr and td
Table.tr = ({ children, className }: TableRowProps) => {
    return <tr className={className}>{children}</tr>;
};

Table.td = ({ children, className }: TableCellProps) => {
    return <td className={className}>{children}</td>;
};

export default Table;
